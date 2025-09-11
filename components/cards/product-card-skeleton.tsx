"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductCardSkeleton() {
  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 flex flex-col items-center">
        <Skeleton className="w-24 h-24 rounded mb-3" />
        <Skeleton className="h-4 w-20 mb-1" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-full mt-3 rounded-lg" />
      </CardContent>
    </Card>
  )
}