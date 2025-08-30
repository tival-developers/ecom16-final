import Skeleton from 'react-loading-skeleton'

export default function ProductSkeletonCard() {
  return (
    <div className="border rounded-lg p-4 space-y-4 animate-pulse">
      <Skeleton height={180} />
      <Skeleton height={20} width="60%" />
      <Skeleton count={2} />
      <div className="flex justify-between items-center">
        <Skeleton width={80} height={30} />
        <Skeleton width={100} height={36} />
      </div>
    </div>
  )
}
