import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from 'next-auth'

type CartItem = {
  productId: string
  categoryId: string
  name: string
  originalPrice: number
  quantity: number
  imageUrl: string
}

type CartState = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (_id: string) => void
  clearCart: (session: Session | null) => Promise<void>
  increaseQuantity: (_id: string) => void
  decreaseQuantity: (_id: string) => void
  loadCart: (session: Session | null) => Promise<void>
  saveCart: (session: Session | null) => Promise<void>
  mergeGuestCart: (session: Session) => Promise<void>
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existingItem = get().items.find((i) => i.productId === item.productId)
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
      },

      removeFromCart: (_id) => {
        set({ items: get().items.filter((item) => item.productId !== _id) })
      },

      clearCart: async (session) => {
        set({ items: [] })
        if (session) {
          const res = await fetch('/api/cart', { method: 'DELETE' })
          if (!res.ok) {
            console.error('Failed to clear backend cart')
          }
        }
      },

      increaseQuantity: (_id) => {
        set({
          items: get().items.map((item) =>
            item.productId === _id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })
      },

      decreaseQuantity: (_id) => {
        set({
          items: get()
            .items.map((item) =>
              item.productId === _id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })
      },

      loadCart: async (session) => {
        // For guests, persist middleware already restores from localStorage
        if (!session) return

        const res = await fetch('/api/cart')
        if (res.ok) {
          const items = await res.json()
          set({ items }) // ✅ Replace instead of add
        }
      },

      saveCart: async (session) => {
        if (!session) return
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: get().items }),
        })
        if (!res.ok) console.error('Failed to save cart')
      },

      mergeGuestCart: async (session) => {
        if (!session) return

        const guestItems = get().items
        const res = await fetch('/api/cart')
        const userItems: CartItem[] = res.ok ? await res.json() : []

        if (guestItems.length === 0) {
          // No guest items → just replace with user cart
          set({ items: userItems })
          return
        }

        // Merge guest cart into user cart
        const merged: CartItem[] = [...userItems]
        guestItems.forEach((guestItem) => {
          const existing = merged.find((i) => i.productId === guestItem.productId)
          if (existing) {
            existing.quantity += guestItem.quantity
          } else {
            merged.push(guestItem)
          }
        })

        set({ items: merged })

        // Save merged cart to backend
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: merged }),
        })

        // Prevent future merges → clear local guest cart
        localStorage.removeItem('cart-storage')
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
