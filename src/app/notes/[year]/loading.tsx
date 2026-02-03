import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-14" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Semester cards skeleton */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="rounded-3xl p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-7 w-16 rounded-full" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
