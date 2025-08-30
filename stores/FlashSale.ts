import { toast } from 'sonner'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FlashSaleItem {
  _id: string
  productId: string
  name: string
  originalPrice: number
  price: number
  imageUrls: string
  endAt: Date
  startAt: Date
  discountPercent: number
  createdBy?: string
}

interface FlashSaleState {
  items: FlashSaleItem[]
  history: FlashSaleItem[]
  maxItems: number
  fetchFlashSaleItems: () => Promise<void>
  addFlashSaleItem: (item: Omit<FlashSaleItem, '_id'>) => Promise<void>
  deleteFlashSaleItem: (id: string) => Promise<void>
  decreasePriceByPercentage: (percent: number) => void
  checkExpiredSales: () => void
}

export const useFlashSaleStore = create<FlashSaleState>()(
  devtools((set, get) => ({
    items: [],
    history: [],
    maxItems: 10,

    fetchFlashSaleItems: async () => {
      try {
        const res = await fetch('/api/flashsale')
        if (!res.ok) throw new Error('Failed to fetch flash sale items')
        const data: FlashSaleItem[] = await res.json()
        set({ items: data })
      } catch (error) {
        console.error('fetchFlashSaleItems error:', error)
      }
    },

    addFlashSaleItem: async (item) => {
      const currentItems = get().items
      const max = get().maxItems
      if (currentItems.length >= max) {
        toast.error(`Cannot add more than ${max} items to the Flash Sale.`)
        throw new Error(`Cannot add more than ${max} flash sale items`)
      }

      try {
        const res = await fetch('/api/flashsale', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to add flash sale item')
        }
        const newItem: FlashSaleItem = await res.json()
        set((state) => ({ items: [...state.items, newItem] }))
      } catch (error) {
        console.error('addFlashSaleItem error:', error)
        throw error
      }
    },

    deleteFlashSaleItem: async (id) => {
      try {
        const res = await fetch(`/api/flashsale/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('Failed to delete flash sale item')
        const item = get().items.find((i) => i._id === id)
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
          history: item ? [...state.history, item] : state.history,
        }))
      } catch (error) {
        console.error('deleteFlashSaleItem error:', error)
        throw error
      }
    },

    decreasePriceByPercentage: (percent) => {
      if (percent <= 0 || percent > 100) return
      const updatedItems = get().items.map((item) => {
        const discountAmount = (item.originalPrice * percent) / 100
        const newPrice = Math.max(0, item.price - discountAmount)
        return { ...item, price: Number(newPrice.toFixed(2)) }
      })
      set({ items: updatedItems })
    },

    checkExpiredSales: () => {
      const now = new Date()
      const { items, history } = get()
      const [expired, active] = items.reduce<
        [FlashSaleItem[], FlashSaleItem[]]
      >(
        ([expired, active], item) =>
          new Date(item.endAt) < now
            ? [[...expired, item], active]
            : [expired, [...active, item]],
        [[], []]
      )
      if (expired.length > 0) {
        set({ items: active, history: [...history, ...expired] })
      }
    },
  }))
)
