"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Kinetic typography — reveals text word-by-word with a masked slide-up.
 * Perfect for hero headlines and section titles.
 */
export default function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.28em]", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.72, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
