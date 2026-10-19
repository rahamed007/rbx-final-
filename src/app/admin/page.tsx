import Link from "next/link";
import { desc } from "drizzle-orm";
import { Users, Medal, Disc3, Trophy, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { db } from "@/db";
import { bladers, medals, combos, tournaments, joinApplications, contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [bladerRows, medalRows, comboRows, tournamentRows, apps, msgs] = await Promise.all([
    db.select().from(bladers),
    db.select().from(medals),
    db.select().from(combos),
    db.select().from(tournaments),
    db.select().from(joinApplications).orderBy(desc(joinApplications.createdAt)),
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
  ]);

  const cards = [
    { label: "Bladers", value: bladerRows.length, icon: Users, href: "/admin/bladers" },
    { label: "Medals", value: medalRows.length, icon: Medal, href: "/admin/medals" },
    { label: "Combos", value: comboRows.length, icon: Disc3, href: "/admin/combos" },
    { label: "Tournaments", value: tournamentRows.length, icon: Trophy, href: "/admin/tournaments" },
    { label: "Applications", value: apps.filter((a) => a.status === "new").length, icon: Send, href: "/admin/applications" },
    { label: "Messages", value: msgs.length, icon: MessageSquare, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">Overview of your RBX team data.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex items-center gap-4 rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5 transition hover:border-crimson/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-crimson/40 bg-crimson/10">
              <c.icon className="h-5 w-5 text-crimson" />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl font-bold text-white">{c.value}</p>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-zinc-500">{c.label}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 transition group-hover:text-crimson" />
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent Applications" href="/admin/applications" empty={apps.length === 0}>
          {apps.slice(0, 5).map((a) => (
            <Row key={a.id} title={a.name} subtitle={a.email} badge={a.status} />
          ))}
        </Panel>
        <Panel title="Recent Messages" href="/admin/messages" empty={msgs.length === 0}>
          {msgs.slice(0, 5).map((m) => (
            <Row key={m.id} title={m.subject || m.name} subtitle={m.email} />
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  href,
  empty,
  children,
}: {
  title: string;
  href: string;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-rbx-steel bg-rbx-charcoal">
      <div className="flex items-center justify-between border-b border-rbx-steel px-5 py-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">{title}</h2>
        <Link href={href} className="text-xs uppercase tracking-widest text-crimson hover:underline">
          View all
        </Link>
      </div>
      {empty ? (
        <p className="px-5 py-10 text-center text-sm text-zinc-500">Nothing here yet.</p>
      ) : (
        <div className="divide-y divide-rbx-steel">{children}</div>
      )}
    </div>
  );
}

function Row({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{title}</p>
        <p className="truncate text-xs text-zinc-500">{subtitle}</p>
      </div>
      {badge && (
        <span className="ml-3 shrink-0 rounded-full border border-rbx-line px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-widest text-crimson">
          {badge}
        </span>
      )}
    </div>
  );
}
