import Image from "next/image";
import RevealText from "./RevealText";

/** Inner-page hero banner with parallax texture and kinetic title. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "/images/team-banner.webp",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[48vh] items-end overflow-hidden pt-32 pb-14 md:min-h-[54vh]">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-rbx-black via-rbx-black/75 to-rbx-black/40" />
      <div className="carbon pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px dash-track opacity-70" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        {eyebrow && (
          <p className="mb-3 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.35em] text-crimson">
            <span className="h-px w-8 bg-crimson" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white md:text-7xl">
          <RevealText text={title} />
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
