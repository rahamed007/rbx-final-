import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-display text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 clip-slant";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson px-6 py-3.5 text-white neon-glow hover:bg-crimson-bright hover:shadow-[0_0_28px_rgba(239,68,68,0.55)]",
  outline:
    "border border-rbx-line px-6 py-3.5 text-white hover:border-crimson hover:text-crimson hover:shadow-[0_0_20px_rgba(220,38,38,0.35)]",
  ghost: "px-4 py-3 text-zinc-300 hover:text-white",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(base, variants[variant], disabled && "pointer-events-none opacity-50", className);

  const sheen = (
    <span className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {sheen}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {sheen}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
