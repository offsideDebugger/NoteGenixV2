import type { NotesCatalog, SemesterCatalog, SubjectCatalog, YearCatalog } from "@/types/notes";

export function getYear(catalog: NotesCatalog, yearSlug: string): YearCatalog | undefined {
  return catalog.years.find((y) => y.slug === yearSlug);
}

export function getSemester(
  catalog: NotesCatalog,
  yearSlug: string,
  semesterSlug: string
): SemesterCatalog | undefined {
  const year = getYear(catalog, yearSlug);
  return year?.semesters.find((s) => s.slug === semesterSlug);
}

export function getSubject(
  catalog: NotesCatalog,
  yearSlug: string,
  semesterSlug: string,
  subjectSlug: string
): SubjectCatalog | undefined {
  const semester = getSemester(catalog, yearSlug, semesterSlug);
  return semester?.subjects.find((s) => s.slug === subjectSlug);
}

export function listYearSlugs(catalog: NotesCatalog): string[] {
  return catalog.years.map((y) => y.slug);
}

export function listSemesterSlugs(catalog: NotesCatalog, yearSlug: string): string[] {
  const year = getYear(catalog, yearSlug);
  return year ? year.semesters.map((s) => s.slug) : [];
}

export function listSubjectSlugs(
  catalog: NotesCatalog,
  yearSlug: string,
  semesterSlug: string
): string[] {
  const sem = getSemester(catalog, yearSlug, semesterSlug);
  return sem ? sem.subjects.map((s) => s.slug) : [];
}
