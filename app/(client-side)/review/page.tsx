// import { ReviewSummary } from "@/components/cards/reviewCard"
import ReviewForm from "@/components/forms/reviewForm"
import connectToDatabase from '@/lib/db/dbConnection'
import { Review } from "@/lib/db/models/review"





export default async function ProductPage({ params }: { params: { id: string } }) {
  await connectToDatabase
  const reviews = await Review.find({ productId: params.id }).lean()

  const totalReviews = reviews.length
  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r: any) => r.rating === stars).length
    return { stars, percent: Math.round((count / totalReviews) * 100) }
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <ReviewSummary
        totalReviews={totalReviews}
        averageRating={averageRating}
        ratingDistribution={ratingDistribution}
        reviews={reviews}
      />
      <ReviewForm productId={params.id} user={user}/>
    </div>
  )
}
