'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'sonner'

interface Props {
  productId: string
}

export default function ReviewButton({ productId }: Props) {
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<{ name: string } | null>(null)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [canReview, setCanReview] = useState(false)
  const [loadingFetch, setLoadingFetch] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // Fetch product details and eligibility in one go
  useEffect(() => {
    const fetchData = async () => {
      setLoadingFetch(true)
      try {
        const [eligibilityRes, productRes] = await Promise.all([
          fetch(`/api/reviews/check/${productId}`),
          fetch(`/api/products/${productId}`),
          
        ])
        //console.log(eligibilityRes)
       // console.log(productRes)

        if (!eligibilityRes.ok || !productRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const eligibilityData = await eligibilityRes.json()
        setCanReview(eligibilityData.canReview)

        const productData = await productRes.json()
        setSelectedProduct({ name: productData.name })

        // Optional: if user already left a review and editing is allowed
        if (eligibilityData.existingReview) {
          setRating(eligibilityData.existingReview.rating)
          setFeedback(eligibilityData.existingReview.feedback)
        }
      } catch (err) {
        console.error(err)
        toast('Error', { description: 'Failed to load review info.' })
      } finally {
        setLoadingFetch(false)
      }
    }

    fetchData()
  }, [productId])

  // If user can't review, don't render the button
  if (!canReview || loadingFetch) return null

  const handleSubmit = async () => {
    setLoadingSubmit(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, feedback }),
      })

      if (!res.ok) throw new Error('Failed to submit review')

      toast('Thank you!', { description: 'Your review has been submitted.' })

      setOpen(false)
      setRating(0)
      setFeedback('')
    } catch (err) {
      console.error(err)
      toast('Error', { description: 'Something went wrong. Please try again.' })
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
      >
        Rate Product
      </Button>

      {/* Rating Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-yellow-600">
              Rate {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Star Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                aria-label={`${value} star`}
                tabIndex={0}
                key={value}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(value)}
                onKeyDown={(e) => e.key === 'Enter' && setRating(value)}
                className={clsx(
                  'w-6 h-6 cursor-pointer transition-colors',
                  (hover || rating) >= value
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>

          {/* Feedback Textarea */}
          <Textarea
            placeholder={`Write feedback for ${selectedProduct?.name}...`}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-4"
          />

          {/* Actions */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={loadingSubmit || rating === 0 || !feedback.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {loadingSubmit ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
