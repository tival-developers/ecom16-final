"use client"

import ProductCardSkeleton from "@/components/cards/product-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
  return (
    <main className="min-h-screen">
     {/* 🔹 Large Promo Banner */}
     <section className="max-w-7xl mx-auto px-4 pb-10 pt-2">
        <Skeleton className="h-40 md:h-56 w-full rounded-2xl" />
      </section>

      {/* 🔹 Features Skeleton */}
      <section className="max-w-7xl mx-auto px-4 mt-6 md:mt-8">
        <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border"
            >
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Section Loader */}
      {[
        "Recently Added",
        "Our Bestselling Products",
        "Featured Deals",
        "Trending This Week",
      ].map((_, idx) => (
        <section key={idx} className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-7">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-24 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      ))}

      {/* 🔹 Promo Mini Banners */}
      <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </section>

      {/* 🔹 Flashsale Skeleton */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Skeleton className="h-6 w-48 mb-7" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* 🔹 Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </section>

      {/* 🔹 Large Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <Skeleton className="h-40 md:h-56 w-full rounded-2xl" />
      </section>
    </main>
  )
}