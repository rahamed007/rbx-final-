"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Medal as MedalIcon, ImageOff } from "lucide-react";
import TiltCard from "./TiltCard";
import { cn, formatDate } from "@/lib/utils";

export type MedalCardData = {
  id: number;
  title: string;
  tier: string;
  category: string;
  eventName: string;
  organizer: string | null;
  venue: string | null;
  awardedOn: string | null;
  placement: number | null;
  narrative: string | null;
  blader: { name: string; slug: string } | null;
  photos: { id: number; url: string; kind: string }[];
};

const tierStyles: Record<string, { ring: string; text: string; bar: string; label: string }> = {
  gold: { ring: "border-gold/50", text: "text-gold", bar: "from-gold to-amber-500", label: "Gold" },
  silver: { ring: "border-silver/50", text: "text-silver", bar: "from-silver to-zinc-400", label: "Silver" },
  bronze: { ring: "border-amber-700/50", text: "text-amber-600", bar: "from-amber-700 to-amber-500", label: "Bronze" },
  special: { ring: "border-crimson/50", text: "text-crimson", bar: "from-crimson to-crimson-bright", label: "Special" },
};

export default function MedalCard({
  medal,
  index = 0,
  onOpen,
}: {
  medal: MedalCardData;
  index?: number;
  onOpen: (medal: MedalCardData) => void;
}) {
  const style = tierStyles[medal.tier] || tierStyles.gold;
  const hasPhoto = medal.photos.length > 0;
  const cover = medal.photos[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="h-full" intensity={9}>
        <button
          onClick={() => onOpen(medal)}
          className={cn(
            "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-rbx-charcoal text-left transition-colors hover:border-crimson/60",
            style.ring,
          )}
        >
          <div className={cn("h-1 w-full bg-gradient-to-r", style.bar)} />
          <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-gradient-to-br from-rbx-steel/40 to-rbx-black">
            {hasPhoto ? (
              <>
                <Image src={cover!} alt={medal.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-rbx-charcoal via-transparent to-transparent" />
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-zinc-600">
                <MedalIcon className={cn("h-16 w-16 opacity-30", style.text)} />
                <span className="flex items-center gap-1.5 rounded-full border border-rbx-line px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <ImageOff className="h-3 w-3" /> Photo Pending
                </span>
              </div>
            )}
            <span
              className={cn(
                "absolute right-3 top-3 rounded-full border bg-black/50 px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] backdrop-blur",
                style.ring,
                style.text,
              )}
            >
              {style.label}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
              {medal.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{medal.eventName}</p>
            <div className="mt-3 flex items-center justify-between border-t border-rbx-steel pt-3 text-xs text-zinc-500">
              <span className="font-display font-semibold uppercase tracking-widest text-crimson">
                {medal.blader?.name ?? "Team"}
              </span>
              <span>{formatDate(medal.awardedOn)}</span>
            </div>
          </div>
        </button>
      </TiltCard>
    </motion.div>
  );
}
