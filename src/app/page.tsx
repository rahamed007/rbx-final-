import Link from "next/link";
import { ArrowRight, Swords } from "lucide-react";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import StatStrip from "@/components/StatStrip";
import SectionHeading from "@/components/SectionHeading";
import HorizontalRail from "@/components/HorizontalRail";
import BladerCard, { type BladerCardData } from "@/components/BladerCard";
import MedalShowcase from "@/components/MedalShowcase";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { getStats, getFeaturedBladers, getMedals } from "@/lib/data";
import type { MedalCardData } from "@/components/MedalCard";

export const dynamic = "force-dynamic";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export default async function HomePage() {
  const [stats, featured, allMedals] = await Promise.all([
    getStats(),
    getFeaturedBladers(3),
    getMedals(),
  ]);

  const counts = new Map<number, { gold: number; silver: number; bronze: number }>();
  for (const m of allMedals) {
    if (m.bladerId == null) continue;
    const c = counts.get(m.bladerId) ?? { gold: 0, silver: 0, bronze: 0 };
    if (m.tier === "gold") c.gold += 1;
    else if (m.tier === "silver") c.silver += 1;
    else if (m.tier === "bronze") c.bronze += 1;
    counts.set(m.bladerId, c);
  }

  const featuredData: BladerCardData[] = featured.map((b) => {
    const c = counts.get(b.id) ?? { gold: 0, silver: 0, bronze: 0 };
    return {
      id: b.id,
      slug: b.slug,
      name: b.name,
      role: b.role,
      playstyle: b.playstyle,
      experience: b.experience,
      avatarUrl: b.avatarUrl,
      signatureCombo: b.signatureCombo,
      ...c,
    };
  });

  const recentMedals: MedalCardData[] = allMedals.slice(0, 8).map((m) => ({
    id: m.id,
    title: m.title,
    tier: m.tier,
    category: m.category,
    eventName: m.eventName,
    organizer: m.organizer,
    venue: m.venue,
    awardedOn: m.awardedOn,
    placement: m.placement,
    narrative: m.narrative,
    blader: m.blader ? { name: m.blader.name, slug: m.blader.slug } : null,
    photos: m.photos.map((p) => ({ id: p.id, url: p.url, kind: p.kind })),
  }));

  return (
    <>
      <HomeHero />

      <Marquee
        items={[
          "Spin With Power",
          "Battle With Honor",
          "Xtreme Dash",
          "Royal Bengal X",
          "Beyblade X Bangladesh",
        ]}
      />

      {/* Stats */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="By The Numbers"
            title="A LEGACY IN MOTION"
            subtitle="Live aggregation straight from the RBX battle database — every medal, podium and victory, counted."
          />
        </Container>
        <div className="mt-12">
          <StatStrip stats={stats} />
        </div>
      </section>

      {/* Featured Bladers — pinned horizontal rail */}
      <section className="pb-6">
        <Container>
          <SectionHeading
            eyebrow="The Roster"
            title="MEET THE BLADERS"
            subtitle="The athletes who carry the RBX banner into the stadium."
          />
        </Container>
      </section>
      <HorizontalRail>
        {featuredData.map((b, i) => (
          <div key={b.id} className="w-[80vw] shrink-0 sm:w-[360px]">
            <BladerCard blader={b} index={i} />
          </div>
        ))}
        <div className="flex w-[70vw] shrink-0 items-center sm:w-[320px]">
          <Link
            href="/players"
            className="group flex w-full flex-col items-start gap-4 rounded-2xl border border-dashed border-rbx-line p-8 transition hover:border-crimson"
          >
            <Swords className="h-10 w-10 text-crimson" />
            <span className="font-display text-3xl font-bold uppercase text-white">Full Roster</span>
            <span className="text-sm text-zinc-400">See every blader, filter by role and playstyle.</span>
            <span className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-crimson">
              Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </HorizontalRail>

      {/* Recent Medals — pinned horizontal rail + modal */}
      <section className="pt-10">
        <Container>
          <SectionHeading
            eyebrow="Trophy Room"
            title="RECENT MEDALS"
            subtitle="Physical hardware from the RBX Medal Vault. Tap any medal for the full story."
          />
        </Container>
      </section>
      <MedalShowcase medals={recentMedals} />

      {/* CTA */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-rbx-line bg-rbx-charcoal carbon p-10 text-center md:p-16">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-40 w-[60%] -translate-x-1/2 rounded-full bg-crimson/25 blur-[80px]" />
              </div>
              <p className="relative font-display text-xs font-bold uppercase tracking-[0.35em] text-crimson">
                Recruitment Open
              </p>
              <h2 className="relative mt-4 font-display text-4xl font-bold uppercase leading-tight text-white md:text-6xl">
                Ready to enter the stadium?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
                Think you have what it takes to represent Bangladesh on the world stage?
                Apply to the RBX recruitment desk.
              </p>
              <div className="relative mt-8 flex justify-center">
                <Button href="/join">
                  Join The Team <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
