import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { notesCatalog } from "@/lib/notes/catalog";
import { getYear, listYearSlugs } from "@/lib/notes/query";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return listYearSlugs(notesCatalog).map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  if (!year) return {};
  return { title: year.title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  if (!year) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Browse" },
          { href: `/notes/${year.slug}`, label: year.title },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{year.title}</h1>
        <p className="text-sm text-muted-foreground">Pick a semester.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {year.semesters.map((sem) => {
          const previewSubjects = sem.subjects.slice(0, 8);

          return (
            <Link
              key={sem.slug}
              href={`/notes/${year.slug}/${sem.slug}`}
              className="group rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="relative h-full overflow-hidden rounded-3xl p-8 transition-shadow hover:shadow-sm">
                <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(700px_320px_at_20%_10%,oklch(0.97_0_0),transparent_60%)] dark:bg-[radial-gradient(700px_320px_at_20%_10%,oklch(0.23_0_0),transparent_60%)]" />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold tracking-tight group-hover:underline">
                      {sem.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sem.subjects.length} {sem.subjects.length === 1 ? "subject" : "subjects"}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors group-hover:bg-secondary/80">
                    View <ArrowRight className="size-4" />
                  </div>
                </div>

                {previewSubjects.length > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {previewSubjects.map((subj) => (
                      <span
                        key={subj.slug}
                        className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {subj.title}
                      </span>
                    ))}
                    {sem.subjects.length > previewSubjects.length ? (
                      <span className="rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                        +{sem.subjects.length - previewSubjects.length} more
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-muted-foreground">Subjects will show up here once added.</p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
