import { Skeleton } from '@/components/ui/skeleton'

export default function OverviewSkeleton() {
  return (
    <div className='w-full h-[350px] flex items-end gap-2 px-2'>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton
          key={i}
          className='flex-1'
          style={{
            height: `${Math.random() * (300 - 80) + 80}px`, // random bar heights
          }}
        />
      ))}
    </div>
  )
}
