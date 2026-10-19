"use client";

import { cn } from "@/lib/utils";

/** Infinite horizontal ticker used for hype strips and team slogans. */
export default function Marquee({
  items,
  className,
  speed = 26,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden border-y border-rbx-steel bg-rbx-charcoal py-4", className)}>
      <div
        className="flex w-max shrink-0 items-center gap-10 whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {item}
            <span className="text-crimson">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
