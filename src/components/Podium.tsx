"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export type PodiumEntry = {
  placement: number;
  blader: { name: string; slug: string; avatarUrl: string | null } | null;
};

const HEIGHTS: Record<number, string> = { 1: "h-40 md:h-56", 2: "h-28 md:h-40", 3: "h-20 md:h-32" };
const ORDER = [2, 1, 3]; // left, center, right
const MEDAL: Record<number, string> = { 1: "text-gold", 2: "text-silver", 3: "text-amber-600" };
const RING: Record<number, string> = {
  1: "border-gold shadow-[0_0_40px_rgba(231,181,59,0.4)]",
  2: "border-silver",
  3: "border-amber-700",
};

/** Animated podium with bracket-style connecting rails. */
export default function Podium({ results }: { results: PodiumEntry[] }) {
  const byPlacement = new Map(results.map((r) => [r.placement, r]));

  return (
    <div className="relative">
      {/* bracket rails */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-rbx-line to-transparent md:block" />
      <div className="grid grid-cols-3 items-end gap-3 md:gap-6">
        {ORDER.map((placement) => {
          const entry = byPlacement.get(placement);
          const blader = entry?.blader ?? null;
          return (
            <motion.div
              key={placement}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: placement * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              {placement === 1 && <Crown className="mb-2 h-7 w-7 text-gold" />}
              {blader ? (
                <Link href={`/players/${blader.slug}`} className="group flex flex-col items-center">
                  <div
                    className={cn(
                      "relative h-20 w-20 overflow-hidden rounded-full border-2 bg-rbx-charcoal transition group-hover:scale-105 md:h-28 md:w-28",
                      RING[placement],
                    )}
                  >
                    <Image
                      src={blader.avatarUrl || "/images/emblem.webp"}
                      alt={blader.name}
                      fill
                      sizes="112px"
                      className="object-cover object-top"
                    />
                  </div>
                  <span className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-white md:text-base">
                    {blader.name}
                  </span>
                </Link>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-rbx-line bg-rbx-charcoal text-zinc-600 md:h-28 md:w-28">
                  —
                </div>
              )}
              <span className={cn("mt-1 font-display text-xs font-bold uppercase tracking-[0.2em]", MEDAL[placement])}>
                {placement === 1 ? "Champion" : placement === 2 ? "Runner-up" : "3rd Place"}
              </span>
              <div
                className={cn(
                  "mt-4 flex w-full max-w-[140px] items-start justify-center rounded-t-lg border border-b-0 border-rbx-line bg-gradient-to-b from-rbx-steel/60 to-rbx-charcoal pt-3",
                  HEIGHTS[placement],
                )}
              >
                <span className={cn("font-display text-4xl font-bold md:text-6xl", MEDAL[placement])}>
                  {placement}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
