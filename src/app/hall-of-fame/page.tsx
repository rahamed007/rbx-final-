import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Crown, Trophy, Medal as MedalIcon } from "lucide-react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getHallOfFame } from "@/lib/data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description: "The RBX Bangladesh all-time greats — ranked by medals, golds and tournament victories.",
};

export default async function HallOfFamePage() {
  const rows = await getHallOfFame();

  return (
    <>
      <PageHero
        image="/images/medal.webp"
        eyebrow="Immortals"
        title="HALL OF FAME"
        subtitle="The bladers who defined RBX history — ranked by championship gold, podium finishes and tournament victories."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="space-y-4">
            {rows.map((row, i) => (
              <Reveal key={row.blader.id} delay={i * 0.06}>
                <Link
                  href={`/players/${row.blader.slug}`}
                  className={cn(
                    "group flex items-center gap-5 overflow-hidden rounded-2xl border bg-rbx-charcoal p-4 transition-colors md:p-5",
                    i === 0
                      ? "border-gold/50 shadow-[0_0_40px_rgba(231,181,59,0.15)]"
                      : "border-rbx-steel hover:border-crimson/50",
                  )}
                >
                  {/* Rank */}
                  <div className="flex w-12 shrink-0 flex-col items-center md:w-16">
                    {i === 0 ? (
                      <Crown className="h-7 w-7 text-gold" />
                    ) : (
                      <span className="font-display text-2xl font-bold text-zinc-600 md:text-3xl">#{i + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-rbx-line md:h-20 md:w-20">
                    <Image
                      src={row.blader.avatarUrl || "/images/emblem.webp"}
                      alt={row.blader.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Name + role */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-xl font-bold uppercase text-white md:text-2xl">
                      {row.blader.name}
                    </h3>
                    <p className="font-display text-xs uppercase tracking-[0.2em] text-crimson">
                      {row.blader.role} · {row.blader.playstyle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="hidden shrink-0 items-center gap-5 md:flex">
                    <HallStat icon={Trophy} value={row.gold} label="Gold" accent="text-gold" />
                    <HallStat icon={MedalIcon} value={row.silver} label="Silver" accent="text-silver" />
                    <HallStat icon={MedalIcon} value={row.bronze} label="Bronze" accent="text-amber-600" />
                    <HallStat icon={Crown} value={row.firsts} label="Wins" accent="text-crimson" />
                  </div>

                  {/* Mobile compact */}
                  <div className="flex shrink-0 gap-3 md:hidden">
                    <span className="font-display text-sm font-bold text-gold">{row.gold}G</span>
                    <span className="font-display text-sm font-bold text-silver">{row.silver}S</span>
                    <span className="font-display text-sm font-bold text-amber-600">{row.bronze}B</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function HallStat({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: typeof Trophy;
  value: number;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex w-16 flex-col items-center">
      <Icon className={cn("h-4 w-4", accent)} />
      <span className="mt-1 font-display text-xl font-bold text-white">{value}</span>
      <span className="font-display text-[0.55rem] uppercase tracking-[0.15em] text-zinc-500">{label}</span>
    </div>
  );
}
