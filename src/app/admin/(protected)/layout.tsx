import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "../login/actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Every admin page needs a live DB/session at request time; never prerender them.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/posts" className="font-semibold text-foreground">
              Zaplio Admin
            </Link>
            <Link href="/admin/posts" className="text-muted hover:text-foreground">
              Posts
            </Link>
            <Link href="/admin/leads" className="text-muted hover:text-foreground">
              Leads
            </Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-muted hover:text-foreground">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
