import Link from "next/link";
import { Camera, MessageCircle, MonitorPlay, Send } from "lucide-react";
import RbxMark from "./RbxMark";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/players", label: "Our Bladers" },
      { href: "/medals", label: "Medal Vault" },
      { href: "/tournaments", label: "Tournaments" },
      { href: "/combos", label: "Combo Directory" },
    ],
  },
  {
    title: "Team",
    links: [
      { href: "/hall-of-fame", label: "Hall of Fame" },
      { href: "/gallery", label: "Media Gallery" },
      { href: "/about", label: "About RBX" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Compete",
    links: [
      { href: "/join", label: "Recruitment Desk" },
      { href: "/tournaments", label: "Upcoming Events" },
      { href: "/admin", label: "Admin Portal" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-rbx-steel bg-rbx-charcoal">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px dash-track opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-crimson/10 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <RbxMark className="h-11 w-11" />
            <span className="font-display text-xl font-bold uppercase tracking-[0.2em] text-white">
              RBX<span className="text-crimson">.</span>BD
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            Royal Bengal X — Bangladesh&apos;s elite competitive Beyblade X team.
            Spin with power. Battle with honor.
          </p>
          <div className="mt-6 flex gap-3">
            {[Camera, MessageCircle, MonitorPlay, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rbx-steel text-zinc-400 transition hover:border-crimson hover:text-crimson"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-crimson"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-rbx-steel/70 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} RBX Bangladesh. All rights reserved.</p>
          <p className="font-display uppercase tracking-[0.25em]">Beyblade X · Est. 2025 · Dhaka</p>
        </div>
      </div>
    </footer>
  );
}
