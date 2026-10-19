import type { Metadata } from "next";
import Image from "next/image";
import { Flame, Shield, HeartHandshake, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and values behind RBX Bangladesh — Royal Bengal X.",
};

const VALUES = [
  { icon: Flame, title: "Power", text: "We spin with intent. Every launch is engineered for maximum burst and control." },
  { icon: Shield, title: "Honor", text: "We battle with respect — for our opponents, the judges, and the sport we love." },
  { icon: HeartHandshake, title: "Brotherhood", text: "No blader spins alone. We lift each other up, in victory and in defeat." },
  { icon: Sparkles, title: "Innovation", text: "The combo lab never sleeps. We iterate, test and push the Beyblade X meta forward." },
];

const TIMELINE = [
  { year: "2025", title: "RBX Is Founded", text: "A collective of Bangladesh's fiercest attack and stamina bladers unite under the Royal Bengal X banner." },
  { year: "2025", title: "Season 1 Debut", text: "Podium finishes across the S1 regular circuit establish RBX as a force to be reckoned with." },
  { year: "2025", title: "International Stage", text: "CMX medals at the Beyblade X International Swiss — RBX's first hardware on the world stage." },
  { year: "2026", title: "The Next Chapter", text: "Full roster, national open ambitions, and a recruitment drive to find Bangladesh's next champion." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="ABOUT RBX"
        subtitle="Royal Bengal X — forged in the stadium, driven by Xtreme Dash physics, and united by honor."
      />

      <Marquee items={["Spin With Power", "Battle With Honor", "Royal Bengal X", "Since 2025"]} />

      {/* Story */}
      <section className="py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Who We Are" title="MORE THAN A TEAM" />
              <div className="mt-6 space-y-4 leading-relaxed text-zinc-400">
                <p>
                  RBX Bangladesh — <span className="text-white">Royal Bengal X</span> — was born from a
                  simple belief: that Bangladeshi bladers belong on the world stage. Named after the
                  majesty of the Royal Bengal tiger, we bring the same ferocity, focus and pride to
                  every stadium we enter.
                </p>
                <p>
                  From basement practice sessions to national podiums, our bladers have built a
                  culture where data meets drama — where combo theory is tested in the fire of
                  real competition. We are attack specialists, stamina anchors, defensive walls and
                  balanced all-rounders, unified by one creed.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/players">Meet The Roster</Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-rbx-line">
                <div className="relative aspect-[4/3]">
                  <Image src="/images/team-banner.webp" alt="Royal Bengal X" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-rbx-black/60 to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Our Code" title="THE RBX CREED" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-rbx-steel bg-rbx-charcoal p-6 text-center transition hover:border-crimson/50">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-crimson/40 bg-crimson/10">
                    <v.icon className="h-6 w-6 text-crimson" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold uppercase text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="The Journey" title="OUR TIMELINE" />
          <ol className="relative mt-10 space-y-8 border-l border-rbx-steel pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-crimson bg-rbx-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                  </span>
                  <p className="font-display text-xs uppercase tracking-[0.25em] text-crimson">{t.year}</p>
                  <h4 className="mt-1 font-display text-xl font-bold text-white">{t.title}</h4>
                  <p className="mt-1 text-zinc-400">{t.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
