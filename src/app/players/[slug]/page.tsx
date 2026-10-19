import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Swords, Rocket, Trophy, Gauge, Crown, Award } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getBladerBySlug } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const tierDot: Record<string, string> = {
  gold: "bg-gold",
  silver: "bg-silver",
  bronze: "bg-amber-600",
  special: "bg-crimson",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blader = await getBladerBySlug(slug);
  return { title: blader ? blader.name : "Blader" };
}

export default async function BladerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blader = await getBladerBySlug(slug);
  if (!blader) notFound();

  const total = blader.wins + blader.losses;
  const winRate = total > 0 ? Math.round((blader.wins / total) * 100) : null;

  const gold = blader.medals.filter((m) => m.tier === "gold").length;
  const silver = blader.medals.filter((m) => m.tier === "silver").length;
  const bronze = blader.medals.filter((m) => m.tier === "bronze").length;

  return (
    <>
      {/* Banner */}
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden pt-16">
        <Image
          src={blader.bannerUrl || "/images/team-banner.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rbx-black via-rbx-black/50 to-rbx-black/70" />
      </section>

      {/* Identity */}
      <Container className="-mt-28 relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <Reveal y={24} className="shrink-0">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl border-2 border-crimson/60 neon-glow md:h-52 md:w-52">
              <Image
                src={blader.avatarUrl || "/images/emblem.webp"}
                alt={blader.name}
                fill
                sizes="208px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex-1">
            <p className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.35em] text-crimson">
              {blader.role} · {blader.playstyle}
            </p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none tracking-tight text-white md:text-7xl">
              {blader.name}
            </h1>
            {blader.realName && <p className="mt-2 text-zinc-400">{blader.realName}</p>}
          </Reveal>
        </div>

        {/* Quick stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatBox icon={Gauge} label="Experience" value={blader.experience || "—"} />
          <StatBox
            icon={Trophy}
            label="Win Rate"
            value={winRate !== null ? `${winRate}%` : "Unlogged"}
            hint={winRate === null ? "No verified matches yet" : `${blader.wins}W / ${blader.losses}L`}
          />
          <StatBox icon={Crown} label="Gold" value={String(gold)} />
          <StatBox icon={Award} label="Total Medals" value={String(blader.medals.length)} />
        </div>
      </Container>

      {/* Bio + signature */}
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal>
              <SectionHeading eyebrow="Profile" title="THE BLADER" />
              <p className="mt-6 text-lg leading-relaxed text-zinc-300">{blader.bio}</p>

              {blader.launchTechnique && (
                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-rbx-line bg-rbx-charcoal p-5">
                  <Rocket className="mt-0.5 h-6 w-6 shrink-0 text-crimson" />
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-crimson">
                      Launch Technique
                    </p>
                    <p className="mt-1 text-zinc-300">{blader.launchTechnique}</p>
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-crimson/40 bg-rbx-charcoal carbon p-6 neon-glow">
                <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.25em] text-crimson">
                  <Swords className="h-4 w-4" /> Signature Combo
                </div>
                <p className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-white">
                  {blader.signatureCombo || "—"}
                </p>
                <div className="mt-6 space-y-3 border-t border-rbx-steel pt-4">
                  {blader.combos.length > 0 ? (
                    blader.combos.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{c.name}</span>
                        <span className="font-display text-xs uppercase tracking-widest text-crimson">
                          {c.archetype}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">Loadout specs pending.</p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Loadouts */}
      {blader.combos.length > 0 && (
        <section className="pb-8">
          <Container>
            <SectionHeading eyebrow="Loadouts" title="MAIN DECK" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {blader.combos.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-rbx-steel bg-rbx-charcoal p-6 transition hover:border-crimson/60">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-crimson/50 px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-crimson">
                        {c.archetype}
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-xl font-bold uppercase text-white">{c.name}</h4>
                    <dl className="mt-4 space-y-2 text-sm">
                      <PartRow label="Blade" value={c.blade} />
                      <PartRow label="Ratchet" value={c.ratchet} />
                      <PartRow label="Bit" value={c.bit} />
                    </dl>
                    {c.description && <p className="mt-4 text-xs leading-relaxed text-zinc-500">{c.description}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Medals earned */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Hardware" title="MEDALS EARNED" />
          <div className="mt-8 flex flex-wrap gap-4">
            <MedalPill label="Gold" count={gold} className="border-gold/50 text-gold" />
            <MedalPill label="Silver" count={silver} className="border-silver/50 text-silver" />
            <MedalPill label="Bronze" count={bronze} className="border-amber-700/50 text-amber-600" />
          </div>
          {blader.medals.length > 0 ? (
            <ul className="mt-8 divide-y divide-rbx-steel overflow-hidden rounded-2xl border border-rbx-steel">
              {blader.medals.map((m) => (
                <li key={m.id} className="flex items-center gap-4 bg-rbx-charcoal/50 px-5 py-4">
                  <span className={cn("h-3 w-3 shrink-0 rounded-full", tierDot[m.tier] || "bg-crimson")} />
                  <div className="flex-1">
                    <p className="font-medium text-white">{m.title}</p>
                    <p className="text-xs text-zinc-500">{m.eventName}</p>
                  </div>
                  <span className="hidden text-xs text-zinc-500 sm:block">{formatDate(m.awardedOn)}</span>
                  {m.photos.length === 0 && (
                    <span className="rounded-full border border-rbx-line px-2 py-0.5 font-display text-[0.55rem] uppercase tracking-widest text-zinc-500">
                      Photo Pending
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-rbx-line py-12 text-center text-zinc-500">
              No physical medals logged yet.
            </p>
          )}
        </Container>
      </section>

      {/* Career timeline */}
      {blader.milestones.length > 0 && (
        <section className="pb-24">
          <Container>
            <SectionHeading eyebrow="Journey" title="CAREER TIMELINE" />
            <ol className="relative mt-10 space-y-8 border-l border-rbx-steel pl-8">
              {blader.milestones.map((ms, i) => (
                <Reveal key={ms.id} delay={i * 0.08}>
                  <li className="relative">
                    <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-crimson bg-rbx-black">
                      <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                    </span>
                    <p className="font-display text-xs uppercase tracking-[0.25em] text-crimson">
                      {formatDate(ms.happenedOn)}
                    </p>
                    <h4 className="mt-1 font-display text-xl font-bold text-white">{ms.title}</h4>
                    {ms.description && <p className="mt-1 text-sm text-zinc-400">{ms.description}</p>}
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}
    </>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5">
      <Icon className="h-5 w-5 text-crimson" />
      <p className="mt-3 font-display text-2xl font-bold text-white">{value}</p>
      <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      {hint && <p className="mt-1 text-[0.7rem] text-zinc-600">{hint}</p>}
    </div>
  );
}

function PartRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-rbx-steel/60 pb-2">
      <dt className="font-display text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</dt>
      <dd className="font-medium text-zinc-200">{value}</dd>
    </div>
  );
}

function MedalPill({ label, count, className }: { label: string; count: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-full border bg-rbx-charcoal px-5 py-2.5", className)}>
      <span className="font-display text-2xl font-bold">{count}</span>
      <span className="font-display text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
