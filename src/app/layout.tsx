import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site-url";

const fontSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "NoteGenix",
    template: "%s | NoteGenix",
  },
  description: "Find, preview, and share course notes by year and semester.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-dvh">
            <div className="pointer-events-none fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,oklch(0.97_0_0),transparent),radial-gradient(900px_500px_at_80%_20%,oklch(0.92_0_0),transparent)] dark:bg-[radial-gradient(1200px_600px_at_20%_0%,oklch(0.2_0_0),transparent),radial-gradient(900px_500px_at_80%_20%,oklch(0.25_0_0),transparent)]" />
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,oklch(0.92_0_0)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0_0)_1px,transparent_1px)] [background-size:32px_32px] dark:[background-image:linear-gradient(to_right,oklch(1_0_0/0.07)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.07)_1px,transparent_1px)]" />
            </div>

            <SiteHeader />
            <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
