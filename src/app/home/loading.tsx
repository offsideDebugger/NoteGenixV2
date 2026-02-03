import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-10">
      {/* Hero section skeleton */}
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-12 w-80 sm:h-14" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-11 w-32" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="rounded-2xl p-5">
              <Skeleton className="h-5 w-20" />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
            </Card>
            <Card className="rounded-2xl p-5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="mt-2 h-10 w-full" />
            </Card>
          </div>
        </div>
      </section>

      {/* Year cards section skeleton */}
      <section className="space-y-3">
        <div>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="mt-1 h-4 w-32" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-3xl p-8">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="mt-2 h-4 w-40" />
              <div className="mt-6 flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
