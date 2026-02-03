"use client";

import * as React from "react";
import { ExternalLink, FileText, Presentation } from "lucide-react";

import type { NoteFile } from "@/types/notes";
import { getDrivePreviewUrl } from "@/lib/notes/drive";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
        <DialogContent className="max-w-4xl p-0">
          <div className="border-b p-4">
            <DialogHeader>
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
        </DialogContent>

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
                <TableCell className="py-3 pl-5 pr-3 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{typeIcon(note.type)}</span>
                    <span>{note.title}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 pl-3 pr-5 text-right">
                  <div className="flex justify-end gap-2">
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
      </Dialog>
    </div>
  );
}
