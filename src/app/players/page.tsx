import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import BladerGrid from "@/components/BladerGrid";
import type { BladerCardData } from "@/components/BladerCard";
import { getBladers, getMedalCountsByBlader } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Bladers",
  description: "Meet the RBX Bangladesh roster — filter by role and playstyle.",
};

export default async function PlayersPage() {
  const [bladers, counts] = await Promise.all([getBladers(), getMedalCountsByBlader()]);

  const data: BladerCardData[] = bladers.map((b) => {
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

  return (
    <>
      <PageHero
        eyebrow="The Roster"
        title="OUR BLADERS"
        subtitle="The athletes who carry the RBX banner into the stadium. Filter by role and playstyle to find your favorite."
      />
      <section className="py-16 md:py-20">
        <Container>
          <BladerGrid bladers={data} />
        </Container>
      </section>
    </>
  );
}
