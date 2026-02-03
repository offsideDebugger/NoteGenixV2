export type NoteFileType = "pdf" | "slides" | "doc";

export type DriveFileType = NoteFileType;

export type NoteFile = {
  title: string;
  fileId: string;
  type: DriveFileType;
};

export type SubjectCatalog = {
  slug: string;
  title: string;
  notes: NoteFile[];
  legacyPath?: string;
};

export type SemesterCatalog = {
  slug: string;
  title: string;
  subjects: SubjectCatalog[];
  legacyPath?: string;
};

export type YearCatalog = {
  slug: string;
  title: string;
  semesters: SemesterCatalog[];
  legacyPath?: string;
};

export type NotesCatalog = {
  years: YearCatalog[];
};
