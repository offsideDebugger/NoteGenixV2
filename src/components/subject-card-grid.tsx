import Link from "next/link";

import type { SubjectCatalog } from "@/types/notes";
import { Card } from "@/components/ui/card";

export function SubjectCardGrid({
  subjects,
  getHref,
}: {
  subjects: SubjectCatalog[];
  getHref: (subject: SubjectCatalog) => string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {subjects.map((subject) => (
        subject.notes.length === 0 ? (
          <Card
            key={subject.slug}
            className="h-full cursor-not-allowed rounded-2xl p-6 opacity-80"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold leading-snug tracking-tight">
                {subject.title}
              </p>
              <span className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                Coming soon
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">No files yet</p>
          </Card>
        ) : (
          <Link key={subject.slug} href={getHref(subject)} className="group">
            <Card className="h-full rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-base font-semibold leading-snug tracking-tight group-hover:underline">
                {subject.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {subject.notes.length} {subject.notes.length === 1 ? "file" : "files"}
              </p>
            </Card>
          </Link>
        )
      ))}
    </div>
  );
}
