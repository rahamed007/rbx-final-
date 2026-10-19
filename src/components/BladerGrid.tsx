"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import BladerCard, { type BladerCardData } from "./BladerCard";
import { cn } from "@/lib/utils";

const ROLES = ["all", "captain", "core", "reserve"];
const PLAYSTYLES = ["all", "attack", "defense", "stamina", "balance"];

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-display text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] transition",
            value === opt
              ? "border-crimson bg-crimson/15 text-crimson neon-glow"
              : "border-rbx-line text-zinc-400 hover:border-zinc-500 hover:text-white",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function BladerGrid({ bladers }: { bladers: BladerCardData[] }) {
  const [role, setRole] = useState("all");
  const [playstyle, setPlaystyle] = useState("all");

  const filtered = useMemo(
    () =>
      bladers.filter(
        (b) => (role === "all" || b.role === role) && (playstyle === "all" || b.playstyle === playstyle),
      ),
    [bladers, role, playstyle],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-rbx-steel bg-rbx-charcoal/60 p-4 backdrop-blur sm:flex-row sm:items-center sm:gap-8">
        <FilterRow label="Role" options={ROLES} value={role} onChange={setRole} />
        <FilterRow label="Playstyle" options={PLAYSTYLES} value={playstyle} onChange={setPlaystyle} />
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((b, i) => (
            <BladerCard key={b.id} blader={b} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-rbx-line py-20 text-zinc-500">
          <Users className="h-10 w-10" />
          <p className="font-display uppercase tracking-[0.2em]">No bladers match this filter.</p>
        </div>
      )}
    </div>
  );
}
