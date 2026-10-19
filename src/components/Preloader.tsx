"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import RbxMark from "./RbxMark";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TAGLINE = "SPIN WITH POWER. BATTLE WITH HONOR.";
const STORAGE_KEY = "rbx-intro-seen";
const HOLD_MS = 2200;
const EXIT_MS = 400;

/**
 * Cinematic opening preloader: pulsing emblem + staggered tagline reveal,
 * then a high-energy snap into the site.
 *
 * Safety: it is skipped instantly for returning visitors (sessionStorage) and
 * has a hard failsafe timeout, so it can never block the site.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setPhase("done");
    } catch {
      setPhase("done");
    }
  }, []);

  useEffect(() => {
    if (phase !== "in") return;
    const hold = window.setTimeout(() => setPhase("out"), HOLD_MS);
    const finish = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      setPhase("done");
    }, HOLD_MS + EXIT_MS);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(finish);
    };
  }, [phase]);

  // Hard failsafe: never let the splash outlive 4s.
  useEffect(() => {
    const failsafe = window.setTimeout(() => setPhase("done"), 4000);
    return () => window.clearTimeout(failsafe);
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-rbx-black"
      initial={{ opacity: 1 }}
      animate={
        phase === "out"
          ? { opacity: 0, scale: 1.08, filter: "blur(6px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-crimson/25 blur-[90px]" />
        <div className="dash-track absolute inset-x-0 top-1/2 h-px opacity-40" />
      </div>

      <div className="relative flex flex-col items-center px-6">
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-crimson/40 blur-2xl" />
          <RbxMark className="relative h-24 w-24 animate-spin-slower drop-shadow-[0_0_25px_rgba(220,38,38,0.7)] md:h-32 md:w-32" />
        </motion.div>

        <h2 className="mt-8 text-center font-display text-xl font-bold uppercase tracking-[0.3em] text-white neon-text md:text-3xl">
          {TAGLINE.split(" ").map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {"\u00A0"}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          className="mt-6 h-0.5 w-40 origin-left bg-gradient-to-r from-crimson to-transparent"
        />
      </div>
    </motion.div>
  );
}
