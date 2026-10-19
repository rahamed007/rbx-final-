"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D holographic tilt card with a cursor-tracking light sheen that sweeps
 * across the metallic border as the pointer moves.
 */
export default function TiltCard({
  children,
  className,
  intensity = 12,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const spring = { stiffness: 160, damping: 16, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), rgba(239,68,68,0.14) 40%, transparent 62%)`;
  const opacity = useSpring(useTransform(hover, [0, 1], [0, 1]), spring);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function handleEnter() {
    hover.set(1);
  }
  function handleLeave() {
    hover.set(0);
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="tilt-scene" onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("tilt-inner relative", className)}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg, opacity }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          />
        )}
      </motion.div>
    </div>
  );
}
