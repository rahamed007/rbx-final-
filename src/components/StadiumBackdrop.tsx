"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Fixed atmospheric backdrop: vertical-parallax stadium rails, metallic
 * texture wash and neon glow blooms that drift as the page scrolls.
 */
export default function StadiumBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const railY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.75, 0.4]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* parallax stadium rails */}
      <motion.div style={{ y: railY }} className="absolute inset-x-0 -top-10 h-[130vh]">
        <div className="rail absolute inset-x-0 top-[18vh] h-px opacity-30" />
        <div className="rail absolute inset-x-0 top-[46vh] h-px opacity-20" />
        <div className="rail absolute inset-x-0 top-[74vh] h-px opacity-15" />
        {/* diagonal rails */}
        <div className="absolute -left-20 top-0 h-[160vh] w-px origin-top rotate-12 bg-gradient-to-b from-transparent via-rbx-line/40 to-transparent" />
        <div className="absolute -right-10 top-0 h-[160vh] w-px origin-top -rotate-12 bg-gradient-to-b from-transparent via-rbx-line/40 to-transparent" />
      </motion.div>

      {/* neon blooms */}
      <motion.div style={{ y: glowY, opacity: glowOpacity }} className="absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-crimson/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40vh] w-[40vw] rounded-full bg-crimson/10 blur-[120px]" />
      </motion.div>

      {/* metallic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,12,0.85)_100%)]" />
    </div>
  );
}
