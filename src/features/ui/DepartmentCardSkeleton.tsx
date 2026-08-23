/**
 * Skeleton placeholder shown while a department card's hero image loads.
 * Uses the existing `animate-shimmer` animation from `index.css`.
 */
export default function DepartmentCardSkeleton() {
  return (
    <div className="flex flex-col bg-bg-card rounded-2xl border border-violet-200 overflow-hidden h-full">
      {/* Image placeholder */}
      <div className="relative h-36 overflow-hidden bg-violet-100">
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Body placeholder */}
      <div className="flex flex-col flex-1 p-5">
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-violet-100 animate-shimmer shrink-0" />
          <div className="h-4 w-28 bg-violet-100 rounded-md animate-shimmer" />
        </div>

        {/* Tagline */}
        <div className="space-y-1.5 mb-3">
          <div className="h-3 w-full bg-violet-50 rounded animate-shimmer" />
          <div className="h-3 w-3/4 bg-violet-50 rounded animate-shimmer" />
        </div>

        {/* Branch badges */}
        <div className="flex gap-1.5 mt-auto">
          <div className="h-5 w-14 bg-violet-50 rounded-full animate-shimmer" />
          <div className="h-5 w-16 bg-violet-50 rounded-full animate-shimmer" />
          <div className="h-5 w-12 bg-violet-50 rounded-full animate-shimmer" />
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-violet-100 flex items-center justify-between">
          <div className="h-3 w-16 bg-violet-50 rounded animate-shimmer" />
          <div className="h-3 w-16 bg-violet-50 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
