import { notFound } from "next/navigation";

import { notesCatalog } from "@/lib/notes/catalog";
import {
  getSemester,
  getSubject,
  getYear,
  listSemesterSlugs,
  listSubjectSlugs,
  listYearSlugs,
} from "@/lib/notes/query";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NotesTable } from "@/components/notes-table";

export function generateStaticParams() {
  return listYearSlugs(notesCatalog).flatMap((year) =>
    listSemesterSlugs(notesCatalog, year).flatMap((semester) =>
      listSubjectSlugs(notesCatalog, year, semester).map((subject) => ({
        year,
        semester,
        subject,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; semester: string; subject: string }>;
}) {
  const { year: yearSlug, semester: semesterSlug, subject: subjectSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  const semester = getSemester(notesCatalog, yearSlug, semesterSlug);
  const subject = getSubject(notesCatalog, yearSlug, semesterSlug, subjectSlug);
  if (!year || !semester || !subject) return {};
  return { title: `${subject.title} - ${semester.title}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; semester: string; subject: string }>;
}) {
  const { year: yearSlug, semester: semesterSlug, subject: subjectSlug } = await params;
  const year = getYear(notesCatalog, yearSlug);
  const semester = getSemester(notesCatalog, yearSlug, semesterSlug);
  const subject = getSubject(notesCatalog, yearSlug, semesterSlug, subjectSlug);

  if (!year || !semester || !subject) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { href: "/home", label: "Browse" },
          { href: `/notes/${year.slug}`, label: year.title },
          { href: `/notes/${year.slug}/${semester.slug}`, label: semester.title },
          { href: `/notes/${year.slug}/${semester.slug}/${subject.slug}`, label: subject.title },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{subject.title}</h1>
        <p className="text-sm text-muted-foreground">
          {subject.notes.length} {subject.notes.length === 1 ? "file" : "files"}
        </p>
      </div>

      <NotesTable notes={subject.notes} />
    </div>
  );
}
