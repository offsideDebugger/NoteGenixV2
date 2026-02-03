"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from "framer-motion";

import { Card } from "@/components/ui/card";

type YearCard = {
  slug: string;
  title: string;
  semesterCount: number;
  subjectCount: number;
};

export function YearCards({ years }: { years: YearCard[] }) {
  const reduceMotion = useReducedMotion();

  const container: Variants | undefined = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
          },
        },
      };

  const item: Variants | undefined = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.2, 0.9, 0.2, 1] as const,
          },
        },
      };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
      >
        {years.map((year, idx) => (
          <m.div key={year.slug} variants={item}>
            <Link
              href={`/notes/${year.slug}`}
              className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <m.div
                className="h-full"
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              >
                <Card className="relative h-full overflow-hidden rounded-3xl p-7 transition-shadow will-change-transform hover:shadow-sm">
                  <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_20%,oklch(0.96_0_0),transparent_60%)] dark:bg-[radial-gradient(600px_300px_at_20%_20%,oklch(0.25_0_0),transparent_60%)]" />
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold tracking-tight group-hover:underline">
                        {year.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {year.semesterCount} {year.semesterCount === 1 ? "semester" : "semesters"} ·{" "}
                        {year.subjectCount} {year.subjectCount === 1 ? "subject" : "subjects"}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-background/60 text-sm font-semibold tracking-tight">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors group-hover:bg-secondary/80">
                      View <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">
                      Open year
                    </p>
                  </div>
                </Card>
              </m.div>
            </Link>
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}
