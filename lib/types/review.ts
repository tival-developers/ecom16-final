export interface ReviewItem {
  productId: string
  name: string
}
export type ReviewType = {
  _id: string
  customer: {
    name: string
    email: string
  }
  feedback: string
  rating: string
}
