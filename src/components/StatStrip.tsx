"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Trophy, Medal as MedalIcon, Crown, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export type Stats = {
  totalBladers: number;
  totalMedals: number;
  gold: number;
  silver: number;
  bronze: number;
  victories: number;
  podiums: number;
};

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const dur = 1500;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return val;
}

function StatItem({
  value,
  label,
  icon: Icon,
  accent,
  active,
}: {
  value: number;
  label: string;
  icon: typeof Trophy;
  accent: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="group relative flex flex-col items-center gap-2 px-4 py-6 text-center">
      <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-125", accent)} />
      <span className="font-display text-4xl font-bold tabular-nums text-white md:text-5xl neon-text">
        {n}
      </span>
      <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

export default function StatStrip({ stats }: { stats: Stats }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const items = [
    { value: stats.totalBladers, label: "Active Bladers", icon: Flame, accent: "text-crimson" },
    { value: stats.totalMedals, label: "Physical Medals", icon: MedalIcon, accent: "text-gold" },
    { value: stats.gold, label: "Gold", icon: Trophy, accent: "text-gold" },
    { value: stats.silver, label: "Silver", icon: Trophy, accent: "text-silver" },
    { value: stats.bronze, label: "Bronze", icon: Trophy, accent: "text-amber-600" },
    { value: stats.victories, label: "Tournament Wins", icon: Crown, accent: "text-crimson" },
  ];

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-rbx-steel bg-rbx-charcoal carbon">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px dash-track opacity-50" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-rbx-steel/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
        {items.map((it) => (
          <StatItem key={it.label} {...it} active={inView} />
        ))}
      </div>
    </div>
  );
}
