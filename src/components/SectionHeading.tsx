import type { ReactNode } from "react";
import RevealText from "./RevealText";
import { cn } from "@/lib/utils";

/** Section heading with an eyebrow, kinetic title, and optional subtitle. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <div
          className={cn(
            "mb-3 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.35em] text-crimson",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-crimson" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
        <RevealText text={title} />
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-zinc-400",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
