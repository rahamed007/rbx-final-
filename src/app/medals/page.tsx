import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import MedalVault from "@/components/MedalVault";
import type { MedalCardData } from "@/components/MedalCard";
import { getMedals } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Medal Vault",
  description: "The RBX Bangladesh trophy museum — every physical medal, with full battle narratives.",
};

export default async function MedalsPage() {
  const medals = await getMedals();

  const data: MedalCardData[] = medals.map((m) => ({
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
      <PageHero
        image="/images/medal.webp"
        eyebrow="Trophy Museum"
        title="MEDAL VAULT"
        subtitle="Every physical medal earned by RBX bladers. Open any medal to view photography, the organizer, the venue and the full battle narrative."
      />
      <section className="py-16 md:py-20">
        <Container>
          <MedalVault medals={data} />
        </Container>
      </section>
    </>
  );
}
