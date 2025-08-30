
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from 'next-auth'

type FavItem = {
  _id: string // This should uniquely identify the product, e.g. MongoDB _id
  name: string
  originalPrice: number
  description: string
  quantity: number
  imageUrl: string
}

type FavState = {
  items: FavItem[]
  addToFav: (item: FavItem) => void
  removeFromFav: (_id: string) => void
  clearFav: (session: Session | null) => Promise<void>;
  loadFav: (session: Session | null) => Promise<void>
  saveFav: (session: Session | null) => Promise<void>
  mergeGuestFav: (session: Session) => Promise<void>
}

export const useFavStore = create<FavState>()(
  persist(
    (set, get) => ({
      items: [],

      addToFav: (item) => {
        const existingItem = get().items.find((i) => i._id === item._id)
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
      },

      removeFromFav: (_id) => {
        set({ items: get().items.filter((item) => item._id !== _id) })
      },

      clearFav: async (session) => {
        set({ items: [] })
        
        if (session) {
          const res = await fetch('/api/favorite', { method: 'DELETE' })
          if (!res.ok) {
            console.error('Failed to clear backend favorites')
          }
        }
      },

      loadFav: async (session) => {
        if (!session) return

        const res = await fetch('/api/favorite')
        if (res.ok) {
          const items = await res.json()
          set({ items })
        }
      },

      saveFav: async (session) => {
        if (!session) return

        const res = await fetch('/api/favorite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: get().items }),
        })
        if (res.ok) console.log('Fav saved to account')
        else console.log('Failed to save cart')
      },
      mergeGuestFav: async (session) => {
        if (!session) return

        const guestItems = get().items
        const res = await fetch('/api/favorite')
        const userItems: FavItem[] = res.ok ? await res.json() : []

        const merged: FavItem[] = [...userItems]

        guestItems.forEach((guestItem) => {
          const existing = merged.find((i) => i._id === guestItem._id)
          if (existing) {
            existing.quantity += guestItem.quantity
            
          } else {
            merged.push(guestItem)
          }
        })

        set({ items: merged })

        await fetch('/api/favorite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: merged }),
        })

        localStorage.removeItem('fav-storage')
        console.log('Guest fav merged with account')
        //toast.success('Guest cart merged with account')
      },
    }),
    {
      name: 'fav-storage',
    }
  )
)
