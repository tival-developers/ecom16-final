export type ProductType = {
  _id: string
  name: string
  imageUrls: string[]
  description: string
  brand: string
  category: string
  serialNumber: string
  newPrice: number
  originalPrice: number
  stock: number
  isTrending: boolean
  isFeatured: boolean
}

export type CategoryData = {
  variations: string[]
}

export type UploadedImage = {
  url: string
  public_id: string
}


export type CreateProductResult =
  | {
      success: true
      redirectUrl: string
    }
  | {
      success: false
      error?: string
      fieldErrors?: Record<string, string[]>
    }
