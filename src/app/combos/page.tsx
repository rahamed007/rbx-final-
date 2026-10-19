import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ComboDirectory, { type ComboItem } from "@/components/ComboDirectory";
import { getCombos } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Combo Directory",
  description: "The RBX Beyblade X build directory — every blade, ratchet and bit, filterable by archetype and part.",
};

export default async function CombosPage() {
  const combos = await getCombos();

  const data: ComboItem[] = combos.map((c) => ({
    id: c.id,
    name: c.name,
    blade: c.blade,
    ratchet: c.ratchet,
    bit: c.bit,
    archetype: c.archetype,
    description: c.description,
    blader: c.blader ? { name: c.blader.name, slug: c.blader.slug } : null,
  }));

  return (
    <>
      <PageHero
        image="/images/hero.webp"
        eyebrow="The Lab"
        title="COMBO DIRECTORY"
        subtitle="Every Beyblade X build in the RBX arsenal. Filter by archetype and search by blade, ratchet or bit."
      />
      <section className="py-16 md:py-20">
        <Container>
          <ComboDirectory combos={data} />
        </Container>
      </section>
    </>
  );
}
