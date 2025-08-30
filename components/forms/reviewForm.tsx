// components/ReviewForm.tsx
"use client";

import { useState } from "react";

import { toast } from "sonner";
import { StarRating } from "../rating";

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ productId, rating, comment }),
    });

    if (res.ok) toast.success("Review submitted!");
    else toast.error("Error submitting review");
  };

  return (
    <div className="space-y-2">
      <StarRating rating={rating} onRate={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write a comment..."
      />
      <button onClick={submitReview} className="px-4 py-2 bg-primary text-white rounded">
        Submit
      </button>
    </div>
  );
}
