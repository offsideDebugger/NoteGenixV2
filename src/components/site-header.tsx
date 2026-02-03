import Image from "next/image";
import Link from "next/link";
import { Github, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/selectng.png"
            alt="NoteGenix"
            width={34}
            height={34}
            priority
          />
          <span className="text-base font-semibold tracking-tight">NoteGenix</span>
        </Link>

        <div className="hidden sm:block" />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="hidden sm:inline-flex"
            aria-label="GitHub"
            title="GitHub"
          >
            <a
              href="https://github.com/offsideDebugger/NoteGenixV2"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-4" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" className="sm:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>NoteGenix</SheetTitle>
                <SheetDescription>Browse notes by year and semester.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                <a
                  href="https://github.com/offsideDebugger/NoteGenixV2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-accent"
                >
                  <Github className="size-4" /> GitHub
                </a>
                <a
                  href="https://x.com/offsidedebugger"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-accent"
                >
                  <span className="inline-flex size-4 items-center justify-center font-semibold">X</span>
                  @offsidedebugger
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
