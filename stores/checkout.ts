import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type chekoutProduct = {
  productId: string
  categoryId: string
  name: string
  originalPrice: number
  quantity: number
  imageUrl: string
  
}
type CheckoutState = {
  items: chekoutProduct[]
  addToCheckout: (item: chekoutProduct) => void
  removeFromCheckout: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCheckout: (item) => {
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

      removeFromCheckout: (id) => {
        set({ items: get().items.filter((item) => item.productId !== id) })
      },

     

      increaseQuantity: (id) => {
        set({
          items: get().items.map((item) =>
            item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })
      },

      decreaseQuantity: (id) => {
        set({
          items: get()
            .items.map((item) =>
              item.productId === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })
      },
    }),
    {
      name: 'checkout-storage', // This will use localStorage!
    }
  )
)
