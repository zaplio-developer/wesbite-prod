"use client";

import Link from "next/link";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {mainNav.map((item) =>
            item.items ? (
              <DropdownMenu.Root key={item.href}>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-surface-hover hover:text-foreground data-[state=open]:bg-surface-hover data-[state=open]:text-foreground"
                  >
                    {item.label}
                    <ChevronDown size={14} aria-hidden="true" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    sideOffset={8}
                    className="z-50 w-64 rounded-lg border border-border bg-surface p-2 shadow-xl"
                  >
                    {item.items.map((sub) => (
                      <DropdownMenu.Item key={sub.href} asChild>
                        <Link
                          href={sub.href}
                          className="block rounded-md px-3 py-2 text-sm text-foreground/80 outline-none hover:bg-surface-hover hover:text-foreground data-[highlighted]:bg-surface-hover data-[highlighted]:text-foreground"
                        >
                          {sub.label}
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-foreground/90 hover:bg-surface-hover hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <LinkButton href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </LinkButton>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
                aria-label="Open navigation menu"
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-background p-6">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold text-foreground">
                    {siteConfig.name}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close navigation menu"
                      className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
                    >
                      <X size={20} aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="mt-6 flex flex-col gap-1">
                  {mainNav.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-foreground"
                        onClick={() => setMobileOpen(false)}
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
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <LinkButton href={siteConfig.primaryCta.href} className="mt-4 w-full">
                    {siteConfig.primaryCta.label}
                  </LinkButton>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
