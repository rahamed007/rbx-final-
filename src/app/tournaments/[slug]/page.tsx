import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Building2, Swords, ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Podium, { type PodiumEntry } from "@/components/Podium";
import { getTournamentBySlug } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PLACEMENT_STYLE: Record<number, string> = {
  1: "text-gold",
  2: "text-silver",
  3: "text-amber-600",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTournamentBySlug(slug);
  return { title: t ? t.name : "Tournament" };
}

export default async function TournamentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tournament = await getTournamentBySlug(slug);
  if (!tournament) notFound();

  const podium: PodiumEntry[] = tournament.results
    .filter((r) => r.placement <= 3)
    .map((r) => ({
      placement: r.placement,
      blader: r.blader ? { name: r.blader.name, slug: r.blader.slug, avatarUrl: r.blader.avatarUrl } : null,
    }));

  const standings = [...tournament.results].sort((a, b) => a.placement - b.placement);

  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[52vh] min-h-[340px] items-end overflow-hidden pt-16">
        <Image
          src={tournament.posterUrl || "/images/hero.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rbx-black via-rbx-black/60 to-rbx-black/50" />
        <Container className="relative z-10 pb-12">
          <Link
            href="/tournaments"
            className="mb-6 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:text-crimson"
          >
            <ArrowLeft className="h-4 w-4" /> All Tournaments
          </Link>
          <span
            className={cn(
              "rounded-full border px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em]",
              tournament.status === "upcoming"
                ? "border-crimson bg-crimson/20 text-crimson"
                : "border-rbx-line bg-black/40 text-zinc-300",
            )}
          >
            {tournament.status === "upcoming" ? "Upcoming" : "Completed"}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            {tournament.name}
          </h1>
        </Container>
      </section>

      {/* Info + description */}
      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoTile icon={Calendar} label="Date" value={formatDate(tournament.date)} />
            <InfoTile icon={MapPin} label="Venue" value={tournament.location || "TBD"} />
            <InfoTile icon={Building2} label="Organizer" value={tournament.organizer || "—"} />
            <InfoTile icon={Swords} label="Format" value={tournament.format || "—"} />
          </div>
          {tournament.description && (
            <Reveal>
              <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300">{tournament.description}</p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Podium / bracket */}
      {podium.length > 0 && (
        <section className="py-12">
          <Container>
            <SectionHeading eyebrow="Top Cut" title="PODIUM" align="center" />
            <div className="mt-14">
              <Podium results={podium} />
            </div>
          </Container>
        </section>
      )}

      {/* Standings */}
      {standings.length > 0 && (
        <section className="pb-24">
          <Container>
            <SectionHeading eyebrow="Results" title="FULL STANDINGS" />
            <div className="mt-8 overflow-hidden rounded-2xl border border-rbx-steel">
              <table className="w-full text-left text-sm">
                <thead className="bg-rbx-charcoal font-display text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <tr>
                    <th className="px-5 py-4">Place</th>
                    <th className="px-5 py-4">Blader</th>
                    <th className="px-5 py-4 text-right">Medal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rbx-steel">
                  {standings.map((r) => (
                    <tr key={r.id} className="bg-rbx-charcoal/40 transition hover:bg-rbx-steel/30">
                      <td className={cn("px-5 py-4 font-display text-lg font-bold", PLACEMENT_STYLE[r.placement] || "text-zinc-400")}>
                        #{r.placement}
                      </td>
                      <td className="px-5 py-4">
                        {r.blader ? (
                          <Link href={`/players/${r.blader.slug}`} className="font-medium text-white hover:text-crimson">
                            {r.blader.name}
                          </Link>
                        ) : (
                          <span className="text-zinc-500">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {r.placement === 1 ? "🥇 Gold" : r.placement === 2 ? "🥈 Silver" : r.placement === 3 ? "🥉 Bronze" : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5">
      <Icon className="h-5 w-5 text-crimson" />
      <p className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  );
}
