import { ArrowRight, BookOpen, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";

import { notesCatalog } from "@/lib/notes/catalog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { YearCards } from "@/components/motion/year-cards";

export const metadata = {
  title: "Browse",
};

export default function Page() {
  const years = notesCatalog.years;
  const yearCards = years.map((year) => ({
    slug: year.slug,
    title: year.title,
    semesterCount: year.semesters.length,
    subjectCount: year.semesters.reduce((sum, s) => sum + s.subjects.length, 0),
  }));

  const totalSubjects = years.reduce(
    (sum, y) => sum + y.semesters.reduce((s2, sem) => s2 + sem.subjects.length, 0),
    0
  );
  const totalNotes = years.reduce(
    (sum, y) =>
      sum +
      y.semesters.reduce(
        (s2, sem) => s2 + sem.subjects.reduce((s3, subj) => s3 + subj.notes.length, 0),
        0
      ),
    0
  );

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 size-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.9_0_0),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,oklch(0.3_0_0),transparent_65%)]" />
          <div className="absolute -right-28 -bottom-28 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.95_0_0),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,oklch(0.24_0_0),transparent_65%)]" />
        </div>

        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5" />
              Fast preview. Clean URLs.
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Browse notes by year.
            </h1>
            <p className="max-w-prose text-pretty text-base text-muted-foreground sm:text-lg">
              Pick your year, then drill down to semester → subject.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/offsideDebugger/NoteGenix" target="_blank" rel="noreferrer">
                  View GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Layers3 className="size-5" />
                <p className="text-sm font-semibold">Catalog</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-background/40 p-3">
                  <p className="text-xs text-muted-foreground">Subjects</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{totalSubjects}</p>
                </div>
                <div className="rounded-xl border bg-background/40 p-3">
                  <p className="text-xs text-muted-foreground">Files</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{totalNotes}</p>
                </div>
              </div>
            </Card>
            <Card className="rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <BookOpen className="size-5" />
                <p className="text-sm font-semibold">Tip</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the in-page preview, and open in a new tab when you want full screen.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Choose a year</h2>
            <p className="mt-1 text-sm text-muted-foreground">Big cards, fewer clicks.</p>
          </div>
        </div>

        <YearCards years={yearCards} />
      </section>
    </div>
  );
}
