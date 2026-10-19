import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "RBX Bangladesh battle photography, podium celebrations and team media.",
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHero
        image="/images/hero.webp"
        eyebrow="Media"
        title="GALLERY"
        subtitle="Battle photography, podium celebrations and behind-the-scenes from the RBX circuit."
      />
      <section className="py-16 md:py-20">
        <Container>
          <GalleryGrid items={items} />
        </Container>
      </section>
    </>
  );
}
