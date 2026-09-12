import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { siteConfig } from "@/config/site";

function normalizePhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || normalizePhoneForWhatsApp(siteConfig.contact.phone);

const railButtonClasses =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-transform hover:scale-105 hover:bg-surface-hover";

export function StickyContactRail() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <ScrollToTopButton />

      <a
        href={`mailto:${siteConfig.contact.email}`}
        aria-label="Email us"
        className={railButtonClasses}
      >
        <Mail size={18} aria-hidden="true" />
      </a>

      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
        aria-label="Call us"
        className={railButtonClasses}
      >
        <Phone size={18} aria-hidden="true" />
      </a>

      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
        >
          <WhatsAppIcon size={22} />
        </a>
      )}
    </div>
  );
}
