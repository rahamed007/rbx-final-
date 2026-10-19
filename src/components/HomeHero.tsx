"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Flame } from "lucide-react";
import Button from "./Button";
import RevealText from "./RevealText";

/** Cinematic home hero: kinetic headline + orbiting 3D Beyblade asset. */
export default function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-rbx-black via-rbx-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-rbx-black via-transparent to-rbx-black/60" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.4em] text-crimson"
          >
            <Flame className="h-4 w-4" /> Royal Bengal X · Est. 2025 · Dhaka
          </motion.p>

          <h1 className="mt-5 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-white md:text-8xl">
            <RevealText text="SPIN WITH" />
            <br />
            <RevealText text="POWER." delay={0.15} />
            <br />
            <span className="neon-text text-crimson">
              <RevealText text="BATTLE WITH HONOR." delay={0.3} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            Bangladesh&apos;s elite competitive Beyblade X team. Forged in the stadium,
            driven by Xtreme Dash physics, and united by honor. This is where legends spin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="/players">Meet the Bladers</Button>
            <Button href="/medals" variant="outline">
              Explore Medal Vault
            </Button>
          </motion.div>
        </div>

        {/* 3D orbiting Beyblade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-crimson/25 blur-3xl" />

          {/* orbital rings */}
          <div className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-crimson/30" />
          <div className="absolute inset-6 animate-spin-slow rounded-full border border-rbx-line" />
          <div className="absolute inset-14 animate-spin-slower rounded-full border-2 border-dashed border-gold/30" />

          {/* central spinning beyblade */}
          <motion.div
            className="absolute inset-[22%] animate-spin-slow rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/images/hero.webp"
              alt="Spinning Beyblade X"
              fill
              sizes="(max-width:1024px) 0px, 30vw"
              className="rounded-full object-cover drop-shadow-[0_0_40px_rgba(220,38,38,0.7)]"
            />
          </motion.div>

          {/* orbiting nodes */}
          <div className="absolute inset-0 animate-spin-slow">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-crimson neon-glow" />
          </div>
          <div className="absolute inset-0 animate-spin-slower" style={{ animationDirection: "reverse" }}>
            <span className="absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-zinc-500"
      >
        <span className="font-display text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
