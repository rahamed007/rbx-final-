"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Calendar, MapPin, Building2, ImageOff } from "lucide-react";
import type { MedalCardData } from "./MedalCard";
import { formatDate } from "@/lib/utils";

const KIND_LABEL: Record<string, string> = {
  front: "Front",
  back: "Back",
  certificate: "Certificate",
};

export default function MedalModal({ medal, onClose }: { medal: MedalCardData; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-rbx-line bg-rbx-charcoal neon-glow"
        data-lenis-prevent
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-rbx-line bg-black/60 text-zinc-300 transition hover:border-crimson hover:text-crimson"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative min-h-[260px] bg-gradient-to-br from-rbx-steel/40 to-rbx-black p-4">
            {medal.photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {medal.photos.map((p) => (
                  <div
                    key={p.id}
                    className="relative aspect-square overflow-hidden rounded-lg border border-rbx-line bg-black/40"
                  >
                    <Image src={p.url} alt={`${medal.title} ${p.kind}`} fill sizes="200px" className="object-cover" />
                    <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 font-display text-[0.55rem] uppercase tracking-widest text-zinc-300">
                      {KIND_LABEL[p.kind] || p.kind}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-600">
                <ImageOff className="h-14 w-14" />
                <p className="font-display text-xs uppercase tracking-[0.25em]">Physical Photo Pending</p>
                <p className="max-w-[16rem] text-center text-xs text-zinc-600">
                  High-resolution medal photography has not been uploaded yet.
                </p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-crimson">
              {medal.tier} · {medal.category}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-white">
              {medal.title}
            </h3>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-crimson" />
                <dt className="sr-only">Date</dt>
                <dd className="text-zinc-300">{formatDate(medal.awardedOn)}</dd>
              </div>
              {medal.organizer && (
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-crimson" />
                  <dt className="sr-only">Organizer</dt>
                  <dd className="text-zinc-300">{medal.organizer}</dd>
                </div>
              )}
              {medal.venue && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-crimson" />
                  <dt className="sr-only">Venue</dt>
                  <dd className="text-zinc-300">{medal.venue}</dd>
                </div>
              )}
            </dl>

            {medal.narrative && (
              <p className="mt-5 border-l-2 border-crimson pl-4 text-sm italic leading-relaxed text-zinc-400">
                “{medal.narrative}”
              </p>
            )}

            {medal.blader && (
              <div className="mt-6 border-t border-rbx-steel pt-4 text-xs uppercase tracking-widest text-zinc-500">
                Earned by <span className="text-white">{medal.blader.name}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
