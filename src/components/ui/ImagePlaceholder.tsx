import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type AspectRatio = "video" | "square" | "portrait" | "wide";

const aspectClasses: Record<AspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function ImagePlaceholder({
  label,
  aspect = "video",
  className,
}: {
  label: string;
  aspect?: AspectRatio;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface text-center",
        aspectClasses[aspect],
        className,
      )}
    >
      <ImageIcon size={28} className="text-muted" aria-hidden="true" />
      <p className="px-4 text-xs text-muted">{label}</p>
    </div>
  );
}
