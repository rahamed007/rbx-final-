"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal scroll section: the panel sticks to the viewport while
 * vertical scrolling drives a horizontal translate of the inner track.
 */
export default function HorizontalRail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const dist = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      setDistance(dist);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const railProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{ height: distance ? `calc(100vh + ${distance}px)` : "100vh" }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-10 px-6 md:px-12">
          <div className="h-0.5 w-full max-w-md overflow-hidden rounded-full bg-rbx-steel">
            <motion.div style={{ width: railProgress }} className="h-full bg-crimson" />
          </div>
          <p className="mt-2 font-display text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
            Scroll to advance
          </p>
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={cn("flex w-max items-center gap-6 px-6 md:gap-8 md:px-12", className)}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
