"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Medal,
  Disc3,
  Trophy,
  Send,
  MessageSquare,
  ExternalLink,
  LogOut,
} from "lucide-react";
import RbxMark from "@/components/RbxMark";
import { logoutAction } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bladers", label: "Bladers", icon: Users },
  { href: "/admin/medals", label: "Medals", icon: Medal },
  { href: "/admin/combos", label: "Combos", icon: Disc3 },
  { href: "/admin/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/admin/applications", label: "Applications", icon: Send },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-rbx-steel bg-rbx-charcoal transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-rbx-steel px-5 py-5">
          <RbxMark className="h-9 w-9" />
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">RBX Admin</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-crimson">Control Center</p>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto text-zinc-400 lg:hidden" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.1em] transition",
                  active ? "bg-crimson/15 text-crimson" : "text-zinc-400 hover:bg-rbx-steel/50 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-rbx-steel p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> View Public Site
          </Link>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-rbx-steel glass px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-white lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-display text-sm uppercase tracking-[0.2em] text-zinc-400">RBX Management</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-zinc-500 sm:block">{email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full border border-rbx-line px-3 py-1.5 font-display text-xs uppercase tracking-widest text-zinc-300 transition hover:border-crimson hover:text-crimson"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
