"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import RbxMark from "./RbxMark";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/players", label: "Bladers" },
  { href: "/medals", label: "Medal Vault" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/combos", label: "Combos" },
  { href: "/hall-of-fame", label: "Hall of Fame" },
  { href: "/join", label: "Join" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] border-b transition-all duration-300",
        scrolled
          ? "glass border-rbx-steel/70 py-2"
          : "border-white/5 bg-rbx-black/85 py-3 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 md:px-8">
        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="RBX Bangladesh home">
          <span className="relative">
            <span className="absolute inset-0 rounded-full bg-crimson/40 blur-md opacity-0 transition group-hover:opacity-100" />
            <RbxMark className="relative h-9 w-9 drop-shadow-[0_0_8px_rgba(220,38,38,0.45)]" />
          </span>
          <span className="font-display text-lg font-bold uppercase leading-none tracking-[0.18em] text-white">
            RBX<span className="text-crimson">.</span>BD
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
                  active ? "text-white" : "text-zinc-400 hover:text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-crimson transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <Link
            href="/admin"
            title="Admin portal"
            aria-label="Admin portal"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rbx-steel text-zinc-400 transition hover:border-crimson hover:text-crimson"
          >
            <LayoutDashboard className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rbx-steel text-white transition hover:border-crimson lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rbx-steel/60 bg-rbx-black/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-[0.16em]",
                    pathname === item.href ? "bg-crimson/15 text-crimson" : "text-zinc-300",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
