"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComboItem = {
  id: number;
  name: string;
  blade: string;
  ratchet: string;
  bit: string;
  archetype: string;
  description: string | null;
  blader: { name: string; slug: string } | null;
};

const ARCHETYPES = ["all", "attack", "defense", "stamina", "balance"];
const PARTS = [
  { key: "all", label: "All Parts" },
  { key: "blade", label: "Blade" },
  { key: "ratchet", label: "Ratchet" },
  { key: "bit", label: "Bit" },
];

const archetypeAccent: Record<string, string> = {
  attack: "text-crimson border-crimson/50",
  defense: "text-sky-400 border-sky-400/50",
  stamina: "text-emerald-400 border-emerald-400/50",
  balance: "text-gold border-gold/50",
};

function matches(combo: ComboItem, part: string, q: string) {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  if (part === "all") {
    return [combo.name, combo.blade, combo.ratchet, combo.bit].some((v) => v.toLowerCase().includes(needle));
  }
  return combo[part as "blade" | "ratchet" | "bit"].toLowerCase().includes(needle);
}

export default function ComboDirectory({ combos }: { combos: ComboItem[] }) {
  const [archetype, setArchetype] = useState("all");
  const [part, setPart] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => combos.filter((c) => (archetype === "all" || c.archetype === archetype) && matches(c, part, q)),
    [combos, archetype, part, q],
  );

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="space-y-4 rounded-2xl border border-rbx-steel bg-rbx-charcoal/60 p-5 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Archetype
          </span>
          {ARCHETYPES.map((a) => (
            <button
              key={a}
              onClick={() => setArchetype(a)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] transition",
                archetype === a
                  ? "border-crimson bg-crimson/15 text-crimson neon-glow"
                  : "border-rbx-line text-zinc-400 hover:border-zinc-500 hover:text-white",
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search parts, e.g. Shark Scale, 3-60, Rush…"
              className="w-full rounded-xl border border-rbx-line bg-rbx-black/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-crimson"
            />
          </div>
          <div className="flex gap-1 rounded-xl border border-rbx-line bg-rbx-black/60 p-1">
            {PARTS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPart(p.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-widest transition",
                  part === p.key ? "bg-crimson text-white" : "text-zinc-400 hover:text-white",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="font-display text-xs uppercase tracking-widest text-zinc-600">
        {filtered.length} combo{filtered.length !== 1 && "s"} found
      </p>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.article
              key={c.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-rbx-steel bg-rbx-charcoal p-6 transition-colors hover:border-crimson/60"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-crimson/10 blur-2xl transition group-hover:bg-crimson/20" />
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em]",
                    archetypeAccent[c.archetype] || "border-rbx-line text-zinc-400",
                  )}
                >
                  {c.archetype}
                </span>
                <Disc3 className="h-5 w-5 text-zinc-700 transition group-hover:rotate-180 group-hover:text-crimson" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-white">{c.name}</h3>

              <div className="mt-5 space-y-2">
                <PartBar label="Blade" value={c.blade} />
                <PartBar label="Ratchet" value={c.ratchet} />
                <PartBar label="Bit" value={c.bit} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-rbx-steel pt-4 text-xs">
                {c.blader ? (
                  <Link href={`/players/${c.blader.slug}`} className="font-display uppercase tracking-widest text-crimson hover:underline">
                    {c.blader.name}
                  </Link>
                ) : (
                  <span className="text-zinc-600">Team build</span>
                )}
              </div>
              {c.description && <p className="mt-3 text-xs leading-relaxed text-zinc-500">{c.description}</p>}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-rbx-line py-20 text-zinc-500">
          <Disc3 className="h-10 w-10" />
          <p className="font-display uppercase tracking-[0.2em]">No combos match your search.</p>
        </div>
      )}
    </div>
  );
}

function PartBar({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 font-display text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </span>
      <div className="flex-1 rounded-lg border border-rbx-line bg-rbx-black/50 px-3 py-2">
        <span className="font-display text-sm font-semibold text-zinc-200">{value}</span>
      </div>
    </div>
  );
}
