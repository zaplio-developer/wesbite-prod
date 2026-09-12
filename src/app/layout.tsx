import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { robotsDefault } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.eyebrow}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: robotsDefault,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.eyebrow}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.eyebrow}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <JsonLd data={organizationSchema()} />
          <JsonLd data={websiteSchema()} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
