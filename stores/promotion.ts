import { toast } from 'sonner'
import {create} from 'zustand'
import { devtools } from 'zustand/middleware'

interface PromoItem {
  _id: string
  productId: string
  name: string
  originalPrice: number
  newPrice: number
  imageUrls: string
  discountPercent: number
  discountAmount: number
  
}

interface PromoState {
  items: PromoItem[]
  fetchPromoItems: () => Promise<void>
  addPromoItem: (item: Omit<PromoItem, '_id'>) => Promise<void>
  deletePromoItem: (id: string) => Promise<void>
  decreasePriceByPercentage: (percent: number) => void
  maxItems: number
}

export const usePromoStore = create<PromoState>()(
  devtools((set, get) => ({
    items: [],
    maxItems: 10,

    fetchPromoItems: async () => {
      try {
        const res = await fetch('/api/promo')
        if (!res.ok) throw new Error('Failed to fetch promo items')
        const data: PromoItem[] = await res.json()
        set({ items: data })
       
      } catch (error) {
        console.error('fetchPromoItems error:', error)
      }
    },

    addPromoItem: async (item) => {
      const currentItems = get().items
      const max = get().maxItems
      if (currentItems.length >= max) {
        toast.error(`Cannot add more than ${max} items to the promo list.`)

        throw new Error(`Cannot add more than ${max} promo items`)
      }
      
      try {
        const res = await fetch('/api/promo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to add promo item')
        }
        const newItem: PromoItem = await res.json()
        set((state) => ({ items: [...state.items, newItem] }))
      } catch (error) {
        console.error('addPromoItem error:', error)
        throw error
      }
    },

    deletePromoItem: async (id) => {
      try {
        const res = await fetch(`/api/promo/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('Failed to delete promo item')
        set((state) => ({ items: state.items.filter((item) => item._id !== id) }))
      } catch (error) {
        console.error('deletePromoItem error:', error)
        throw error
      }
    },

    // decreasePriceByPercentage: (percent) => {
    //   if (percent <= 0 || percent > 100) return
    //   const currentItems = get().items
    //   const updatedItems = currentItems.map((item) => {
    //     const discountAmount = (item.originalPrice * percent) / 100
    //     let newPrice = item.price - discountAmount
    //     if (newPrice < 0) newPrice = 0
    //     return { ...item, price: Number(newPrice.toFixed(2)) }
    //   })
    //   set({ items: updatedItems })
    // },
    decreasePriceByPercentage: (percent) => {
      if (percent <= 0 || percent > 100) return
      const currentItems = get().items
      const updatedItems = currentItems.map((item) => {
        const discountAmount = (item.originalPrice * percent) / 100
        let newPrice = item.originalPrice - discountAmount
        if (newPrice < 0) newPrice = 0
        return {
          ...item,
          discountAmount,
          discountPercent: percent,
          newPrice: Number(newPrice.toFixed(2)),
        }
      })
      set({ items: updatedItems })
    },
    
  }))
)
