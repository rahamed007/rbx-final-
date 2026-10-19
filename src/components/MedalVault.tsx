"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MedalCard, { type MedalCardData } from "./MedalCard";
import MedalModal from "./MedalModal";
import { cn } from "@/lib/utils";

const TIERS = ["all", "gold", "silver", "bronze", "special"];

export default function MedalVault({ medals }: { medals: MedalCardData[] }) {
  const [tier, setTier] = useState("all");
  const [selected, setSelected] = useState<MedalCardData | null>(null);

  const filtered = useMemo(
    () => (tier === "all" ? medals : medals.filter((m) => m.tier === tier)),
    [medals, tier],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-rbx-steel bg-rbx-charcoal/60 p-4 backdrop-blur">
        <span className="mr-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
          Tier
        </span>
        {TIERS.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] transition",
              tier === t
                ? "border-crimson bg-crimson/15 text-crimson neon-glow"
                : "border-rbx-line text-zinc-400 hover:border-zinc-500 hover:text-white",
            )}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto font-display text-xs uppercase tracking-widest text-zinc-600">
          {filtered.length} medals
        </span>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <MedalCard key={m.id} medal={m} index={i} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <MedalModal medal={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
