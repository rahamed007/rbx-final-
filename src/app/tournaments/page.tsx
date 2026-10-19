import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getTournaments } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tournaments",
  description: "RBX Bangladesh event archive — past results and upcoming tournaments.",
};

function TournamentCard({ t, index }: { t: Awaited<ReturnType<typeof getTournaments>>[number]; index: number }) {
  const upcoming = t.status === "upcoming";
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link
        href={`/tournaments/${t.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rbx-steel bg-rbx-charcoal transition-colors hover:border-crimson/60"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={t.posterUrl || "/images/hero.webp"}
            alt={t.name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rbx-charcoal to-transparent" />
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full border px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] backdrop-blur",
              upcoming ? "border-crimson bg-crimson/20 text-crimson" : "border-rbx-line bg-black/50 text-zinc-300",
            )}
          >
            {upcoming ? "Upcoming" : "Completed"}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-bold uppercase leading-tight text-white group-hover:text-crimson">
            {t.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-crimson" /> {formatDate(t.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-crimson" /> {t.location || "TBD"}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-rbx-steel pt-3">
            <span className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
              {t.format}
            </span>
            <span className="flex items-center gap-1 font-display text-xs uppercase tracking-widest text-crimson">
              Details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default async function TournamentsPage() {
  const tournaments = await getTournaments();
  const upcoming = tournaments.filter((t) => t.status === "upcoming");
  const past = tournaments.filter((t) => t.status !== "upcoming");

  return (
    <>
      <PageHero
        eyebrow="The Circuit"
        title="TOURNAMENTS"
        subtitle="From season openers to grand finals — explore RBX results and upcoming events."
      />
      <section className="py-16 md:py-20">
        <Container className="space-y-16">
          {upcoming.length > 0 && (
            <div>
              <SectionHeading eyebrow="Next Up" title="UPCOMING EVENTS" />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((t, i) => (
                  <TournamentCard key={t.id} t={t} index={i} />
                ))}
              </div>
            </div>
          )}
          <div>
            <SectionHeading eyebrow="Archive" title="PAST EVENTS" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((t, i) => (
                <TournamentCard key={t.id} t={t} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
