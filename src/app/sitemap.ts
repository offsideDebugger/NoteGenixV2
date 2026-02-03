import type { MetadataRoute } from "next";

import { notesCatalog } from "@/lib/notes/catalog";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();
  
  const urls: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/home`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  for (const year of notesCatalog.years) {
    urls.push({
      url: `${base}/notes/${year.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const semester of year.semesters) {
      urls.push({
        url: `${base}/notes/${year.slug}/${semester.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      });

      for (const subject of semester.subjects) {
        urls.push({
          url: `${base}/notes/${year.slug}/${semester.slug}/${subject.slug}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return urls;
}
