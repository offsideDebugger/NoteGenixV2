import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-14" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-20" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-24" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Notes table skeleton */}
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="hidden md:block">
          {/* Table header */}
          <div className="flex border-b px-5 py-3">
            <Skeleton className="h-4 w-12" />
            <div className="ml-auto">
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
          {/* Table rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center border-b px-5 py-4 last:border-b-0">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view */}
        <div className="divide-y md:hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start gap-2">
                <Skeleton className="mt-0.5 size-4" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
