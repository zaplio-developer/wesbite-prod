import Link from "next/link";
import { footerNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-lg font-semibold text-foreground">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{siteConfig.description}</p>
          </div>
          {footerNav.map((group) => (
            <div key={group.href}>
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.items?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
