"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Bey-Dash route transitions: every navigation snaps the incoming page in
 * with a high-velocity ease while crimson neon streak lines flash past.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: EASE }}
        className="min-h-screen"
      >
        {children}
      </motion.div>

      {/* Xtreme Dash streak overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-crimson/10 via-transparent to-transparent" />
        {[18, 42, 66, 84].map((top, i) => (
          <motion.div
            key={top}
            className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-crimson-bright to-transparent"
            style={{ top: `${top}%` }}
            initial={{ x: "-100%", opacity: 0.9 }}
            animate={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </motion.div>
    </>
  );
}
