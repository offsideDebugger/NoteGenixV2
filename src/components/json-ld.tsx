import { getSiteUrl } from "@/lib/site-url";

interface BreadcrumbItem {
  href: string;
  label: string;
}

export function WebsiteJsonLd() {
  const siteUrl = getSiteUrl();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NoteGenix",
    url: siteUrl,
    description: "Find, preview, and share course notes by year and semester.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/home`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function EducationalOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "NoteGenix",
    url: siteUrl,
    description: "A platform for browsing and sharing course notes organized by year and semester.",
    sameAs: [
      "https://github.com/offsideDebugger/NoteGenixV2",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
