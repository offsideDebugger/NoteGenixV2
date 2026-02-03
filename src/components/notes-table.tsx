"use client";

import * as React from "react";
import { ExternalLink, FileText, Presentation } from "lucide-react";

import type { NoteFile } from "@/types/notes";
import { getDrivePreviewUrl } from "@/lib/notes/drive";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContentDraggable,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function typeIcon(type: NoteFile["type"]) {
  if (type === "slides") return <Presentation className="size-4" />;
  if (type === "doc") return <FileText className="size-4" />;
  return <FileText className="size-4" />;
}

export function NotesTable({
  notes,
}: {
  notes: NoteFile[];
}) {
  const [selected, setSelected] = React.useState<NoteFile | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContentDraggable className="max-w-4xl p-0">
          <div
            data-drag-handle
            className="cursor-move border-b px-4 py-3 touch-none select-none"
          >
            <DialogHeader className="gap-0">
              <DialogTitle className="text-base">
                {selected ? selected.title : "Preview"}
              </DialogTitle>
            </DialogHeader>
          </div>
          <div className="aspect-[16/10] w-full">
            {selected ? (
              <iframe
                title={selected.title}
                src={getDrivePreviewUrl(selected.fileId, selected.type)}
                className="h-full w-full"
                allow="autoplay"
              />
            ) : null}
          </div>
        </DialogContentDraggable>

        {/* Mobile (no horizontal scroll) */}
        <div className="divide-y md:hidden">
          {notes.map((note) => {
            const preview = getDrivePreviewUrl(note.fileId, note.type);

            return (
              <div key={`${note.fileId}-${note.title}`} className="px-5 py-4">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-muted-foreground">{typeIcon(note.type)}</span>
                  <p className="min-w-0 font-medium leading-snug">{note.title}</p>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => setSelected(note)}
                    >
                      Preview
                    </Button>
                  </DialogTrigger>

                  <a
                    href={preview}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(buttonVariants({ size: "sm" }), "w-full justify-center gap-2")}
                  >
                    <ExternalLink className="size-4" /> Open
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-12 pl-5 pr-3">Title</TableHead>
                <TableHead className="h-12 pl-3 pr-5 text-right">Open</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => {
                const preview = getDrivePreviewUrl(note.fileId, note.type);
                return (
                  <TableRow key={`${note.fileId}-${note.title}`}>
                    <TableCell className="py-3 pl-5 pr-3 font-medium whitespace-normal">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 text-muted-foreground">{typeIcon(note.type)}</span>
                        <span className="min-w-0 leading-snug">{note.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 pl-3 pr-5 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            className="gap-2"
                            onClick={() => setSelected(note)}
                          >
                            Preview
                          </Button>
                        </DialogTrigger>

                        <a
                          href={preview}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(buttonVariants({ size: "sm" }), "inline-flex gap-2")}
                        >
                          <ExternalLink className="size-4" /> Open
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Dialog>
    </div>
  );
}
