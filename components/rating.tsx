// components/StarRating.tsx
import { cn } from "@/lib/db/essentials/utils";
import { Star } from "lucide-react";


export function StarRating({ rating, onRate }: { rating: number; onRate?: (i: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "w-5 h-5 cursor-pointer",
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
          onClick={() => onRate?.(i)}
        />
      ))}
    </div>
  );
}
