"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = { id: number; title: string; imageUrl: string; category: string };

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] transition",
              active === c
                ? "border-crimson bg-crimson/15 text-crimson neon-glow"
                : "border-rbx-line text-zinc-400 hover:border-zinc-500 hover:text-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-rbx-steel"
              onClick={() => setLightbox(item)}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-display text-sm font-bold uppercase text-white">{item.title}</span>
                <Maximize2 className="h-4 w-4 text-crimson opacity-0 transition group-hover:opacity-100" />
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-black/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-rbx-line text-white transition hover:border-crimson hover:text-crimson"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-rbx-line"
            >
              <div className="relative aspect-[16/10]">
                <Image src={lightbox.imageUrl} alt={lightbox.title} fill sizes="80vw" className="object-cover" />
              </div>
              <div className="flex items-center justify-between bg-rbx-charcoal px-5 py-4">
                <span className="font-display text-lg font-bold uppercase text-white">{lightbox.title}</span>
                <span className="font-display text-xs uppercase tracking-[0.2em] text-crimson">{lightbox.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
