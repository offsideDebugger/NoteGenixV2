import type { MetadataRoute } from "next";

import { notesCatalog } from "@/lib/notes/catalog";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const urls: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/home`, changeFrequency: "weekly", priority: 0.8 },
  ];

  for (const year of notesCatalog.years) {
    urls.push({
      url: `${base}/notes/${year.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const semester of year.semesters) {
      urls.push({
        url: `${base}/notes/${year.slug}/${semester.slug}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });

      for (const subject of semester.subjects) {
        urls.push({
          url: `${base}/notes/${year.slug}/${semester.slug}/${subject.slug}`,
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return urls;
}
