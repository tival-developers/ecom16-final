
'use client'

import { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type Review = {
  _id: string
  product: string
  user: string
  rating: number
  feedback: string
  status: 'approved' | 'pending' | 'rejected'
  createdAt: string
}


export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>([])

  // Load reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews')
        const data = await res.json()
        setReviews(data.reviews)
      } catch (err) {
        toast.error('Failed to load reviews')
      }
    }
    fetchReviews()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
        setReviews(prev => prev.filter(r => r._id !== id))
      toast.success('Review deleted')
    } catch (err) {
      toast.error('Could not delete review')
    }
  }

  const handleStatusChange = async (id: string, status: Review['status']) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      const updated = await res.json()
      setReviews(reviews.map((r) => (r._id === id ? updated.review : r)))
      toast.success(`Review ${status}`)
    } catch (err) {
      toast.error('Could not update review')
    }
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">Manage Product Reviews</h2>
      <div className="overflow-x-auto border rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.product}</TableCell>
                <TableCell>{review.user}</TableCell>
                <TableCell>{'⭐'.repeat(review.rating)}</TableCell>
                <TableCell className="max-w-xs">
                  <Textarea className="text-sm" value={review.feedback} readOnly />
                </TableCell>
                <TableCell>
                  <Badge variant={
                    review.status === 'approved' ? 'success' :
                    review.status === 'rejected' ? 'destructive' : 'outline'
                  }>
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(review._id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStatusChange(review._id, 'rejected')}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {reviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
