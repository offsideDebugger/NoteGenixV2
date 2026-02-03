import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border bg-card">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 size-96 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.85_0_0),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,oklch(0.35_0_0),transparent_65%)]" />
          <div className="absolute -right-28 -bottom-28 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.9_0_0),transparent_65%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,oklch(0.28_0_0),transparent_65%)]" />
        </div>

        <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/new.png"
                alt="NoteGenix"
                width={56}
                height={56}
                priority
                className="rounded-full"
              />
              <p className="text-base font-semibold tracking-tight">NoteGenix</p>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-flex size-1.5 rounded-full bg-foreground/70" />
              Notes, organized by year/semester
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              A clean way to find and preview course notes.
            </h1>
            <p className="max-w-prose text-pretty text-base text-muted-foreground sm:text-lg">
              Browse subjects, open Google Drive previews instantly, and share links that make sense.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/home"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Browse Notes <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://github.com/offsideDebugger/NoteGenixV2"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2")}
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden rounded-2xl">
              <div className="border-b bg-card px-5 pb-4 pt-3">
                <p className="text-base font-semibold leading-tight sm:text-lg">Quick Preview</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  Open files without leaving the site
                </p>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-semibold">Year → Semester</p>
                  <p className="mt-1 text-xs text-muted-foreground">Navigation stays predictable</p>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-semibold">Subjects</p>
                  <p className="mt-1 text-xs text-muted-foreground">Find exactly what you need</p>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-semibold">Drive Preview</p>
                  <p className="mt-1 text-xs text-muted-foreground">Fast and mobile-friendly</p>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-semibold">Shareable URLs</p>
                  <p className="mt-1 text-xs text-muted-foreground">Link straight to a subject</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-2xl p-6">
          <p className="text-sm font-semibold">Follow</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Updates and quick links on X.
          </p>
          <div className="mt-4">
            <a
              href="https://x.com/offsidedebugger"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              @offsidedebugger
            </a>
          </div>
        </Card>
        <Card className="rounded-2xl p-6">
          <p className="text-sm font-semibold">Contribute</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Report issues or add missing notes on GitHub.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/offsideDebugger/NoteGenixV2"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              View repository
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
