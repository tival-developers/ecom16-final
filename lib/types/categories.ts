export interface CategoryType {
  _id: string
  name: string
  slug: string
  imageUrl: string
  variations: string[]
}

export type CategoryWithProducts = {
  category: {
    _id: string
    name: string
    slug: string
    imageUrl: string
    variations: string[]
  }
  products: {
    _id: string
    name: string
    imageUrls: string[]
    description: string
    brand: string
    category: string
    serialNumber: string
    originalPrice: number
    stock: number
  }[]
}
