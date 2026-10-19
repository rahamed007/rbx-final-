"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import { cn } from "@/lib/utils";

export type BladerCardData = {
  id: number;
  slug: string;
  name: string;
  role: string;
  playstyle: string;
  experience: string | null;
  avatarUrl: string | null;
  signatureCombo: string | null;
  gold: number;
  silver: number;
  bronze: number;
};

const roleStyles: Record<string, string> = {
  captain: "border-gold/60 text-gold",
  core: "border-crimson/60 text-crimson",
  reserve: "border-rbx-line text-zinc-400",
};

export default function BladerCard({ blader, index = 0 }: { blader: BladerCardData; index?: number }) {
  const medals = blader.gold + blader.silver + blader.bronze;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="h-full" intensity={10}>
        <Link
          href={`/players/${blader.slug}`}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rbx-steel bg-rbx-charcoal transition-colors hover:border-crimson/60"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={blader.avatarUrl || "/images/emblem.webp"}
              alt={blader.name}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rbx-charcoal via-rbx-charcoal/20 to-transparent" />
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full border bg-black/50 px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] backdrop-blur",
                roleStyles[blader.role] || roleStyles.core,
              )}
            >
              {blader.role}
            </span>
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-rbx-line bg-black/50 px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-widest text-white backdrop-blur">
              <span className="text-gold">{blader.gold}G</span>
              <span className="text-zinc-600">/</span>
              <span className="text-silver">{blader.silver}S</span>
              <span className="text-zinc-600">/</span>
              <span className="text-amber-600">{blader.bronze}B</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
                {blader.name}
              </h3>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-zinc-600 transition group-hover:text-crimson" />
            </div>
            <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              {blader.playstyle} · {blader.experience || "—"}
            </p>
            {blader.signatureCombo && (
              <p className="mt-3 line-clamp-1 text-sm text-zinc-400">
                <span className="text-zinc-600">Signature:</span> {blader.signatureCombo}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-rbx-steel pt-3 text-xs text-zinc-500">
              <span>{medals} medals earned</span>
              <span className="font-display uppercase tracking-widest text-crimson opacity-0 transition group-hover:opacity-100">
                View profile →
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
