import type { NextConfig } from "next";

import { notesCatalog } from "./src/lib/notes/catalog";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    const redirects: {
      source: string;
      destination: string;
      permanent: boolean;
    }[] = [
      { source: "/HTML/home.html", destination: "/home", permanent: true },
    ];

    for (const year of notesCatalog.years) {
      if (year.legacyPath) {
        redirects.push({
          source: year.legacyPath,
          destination: `/notes/${year.slug}`,
          permanent: true,
        });
      }
      for (const sem of year.semesters) {
        if (sem.legacyPath) {
          redirects.push({
            source: sem.legacyPath,
            destination: `/notes/${year.slug}/${sem.slug}`,
            permanent: true,
          });
        }
        for (const subject of sem.subjects) {
          if (subject.legacyPath) {
            redirects.push({
              source: subject.legacyPath,
              destination: `/notes/${year.slug}/${sem.slug}/${subject.slug}`,
              permanent: true,
            });
          }
        }
      }
    }

    return redirects;
  },
};

export default nextConfig;
