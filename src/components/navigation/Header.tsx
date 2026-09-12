"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-surface-hover hover:text-foreground"
              >
                {item.label}
              </Link>
              {item.items && (
                <div className="invisible absolute left-0 top-full w-64 rounded-lg border border-border bg-surface p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-surface-hover hover:text-foreground"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.items && (
                <div className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block rounded-md px-3 py-1.5 text-sm text-muted hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <LinkButton href={siteConfig.primaryCta.href} className="mt-3 w-full">
            {siteConfig.primaryCta.label}
          </LinkButton>
        </Container>
      </div>
    </header>
  );
}
