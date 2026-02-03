import type { DriveFileType } from "@/types/notes";

export function getDrivePreviewUrl(fileId: string, type: DriveFileType): string {
  if (type === "doc") return `https://docs.google.com/document/d/${fileId}/preview`;
  if (type === "slides") return `https://docs.google.com/presentation/d/${fileId}/preview`;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
