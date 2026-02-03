import { notFound } from "next/navigation";

import { notesCatalog } from "@/lib/notes/catalog";
import { getSemester, getYear, listSemesterSlugs, listYearSlugs } from "@/lib/notes/query";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SubjectCardGrid } from "@/components/subject-card-grid";

export function generateStaticParams() {
  return listYearSlugs(notesCatalog).flatMap((year) =>
    listSemesterSlugs(notesCatalog, year).map((semester) => ({ year, semester }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; semester: string }>;
}) {
  const { year: yearSlug, semester: semesterSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  const sem = getSemester(notesCatalog, yearSlug, semesterSlug);
  if (!year || !sem) return {};
  return { title: `${year.title} - ${sem.title}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; semester: string }>;
}) {
  const { year: yearSlug, semester: semesterSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  const semester = getSemester(notesCatalog, yearSlug, semesterSlug);
  if (!year || !semester) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Browse" },
          { href: `/notes/${year.slug}`, label: year.title },
          { href: `/notes/${year.slug}/${semester.slug}`, label: semester.title },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{semester.title}</h1>
        <p className="text-sm text-muted-foreground">Choose a subject.</p>
      </div>

      {semester.subjects.length === 0 ? (
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Notes for this semester haven&apos;t been added yet.
          </p>
        </div>
      ) : (
        <SubjectCardGrid
          subjects={semester.subjects}
          getHref={(subject) => `/notes/${year.slug}/${semester.slug}/${subject.slug}`}
        />
      )}
    </div>
  );
}
