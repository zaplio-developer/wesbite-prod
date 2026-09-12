"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
