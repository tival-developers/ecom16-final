// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from 'next-auth'

type CartItem = {
  productId: string
  categoryId: string
  name: string
  originalPrice: number
  newPrice?: number
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

const mergeItems = (a: CartItem[], b: CartItem[]): CartItem[] => {
  const map = new Map<string, CartItem>()
  ;[...a, ...b].forEach((it) => {
    const existing = map.get(it.productId)
    if (existing) {
      existing.quantity = (existing.quantity || 0) + (it.quantity || 0)
    } else {
      // clone to avoid mutating input
      map.set(it.productId, { ...it })
    }
  })
  return Array.from(map.values())
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId)
        if (existing) {
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
        set({ items: get().items.filter((it) => it.productId !== _id) })
      },

      clearCart: async (session) => {
        set({ items: [] })
        try {
          if (session) {
            const res = await fetch('/api/cart', { method: 'DELETE' })
            if (!res.ok) console.error('Failed to clear backend cart')
          }
        } catch (err) {
          console.error('clearCart error', err)
        }
        // clear merge guard so future logins can merge again
        try {
          localStorage.removeItem('cart-merged')
        } catch {}
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
        // guests: persist restores automatically
        if (!session) return
        try {
          console.log('[cart] loadCart: fetching server cart')
          const res = await fetch('/api/cart')
          if (res.ok) {
            const userItems = await res.json()
            // Replace state (do not append)
            set({ items: userItems })
            console.log('[cart] loaded from backend', userItems)
          }
        } catch (err) {
          console.error('loadCart error', err)
        }
      },

      saveCart: async (session) => {
        if (!session) return
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: get().items }),
          })
          if (!res.ok) console.error('Failed to save cart')
        } catch (err) {
          console.error('saveCart error', err)
        }
      },

      mergeGuestCart: async (session) => {
        if (!session) return

        // Idempotency guard: skip if we've already merged this session
        try {
          if (localStorage.getItem('cart-merged') === '1') {
            console.log('[cart] mergeGuestCart: already merged, skipping')
            return
          }
        } catch {}

        console.log('[cart] mergeGuestCart: start')

        try {
          const guestItems = get().items || []
          let userItems: CartItem[] = []

          try {
            const res = await fetch('/api/cart')
            if (res.ok) userItems = await res.json()
          } catch (err) {
            console.error('mergeGuestCart: failed to fetch user cart', err)
          }

          const merged = mergeItems(userItems, guestItems)

          // Replace state with merged result (single source of truth)
          set({ items: merged })
          console.log('[cart] merged result', merged)

          // Save merged cart to backend
          try {
            const res = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: merged }),
            })
            if (!res.ok) console.error('mergeGuestCart: failed to save merged cart')
          } catch (err) {
            console.error('mergeGuestCart: save error', err)
          }

          // Mark as merged so repeated calls are skipped
          try {
            localStorage.setItem('cart-merged', '1')
            // optionally: remove guest key if you want a clean guest cart for new sessions
            // localStorage.removeItem('cart-storage')
          } catch (err) {
            console.error('mergeGuestCart: failed to mark as merged', err)
            // non-fatal
          }
        } catch (err) {
          console.error('mergeGuestCart error', err)
        }
      },
    }),
    {
      name: 'cart-storage',
      // optional hook to help debug rehydration timing:
      onRehydrateStorage: () => () => {
        console.log('[cart] rehydration complete')
      },
    }
  )
)
