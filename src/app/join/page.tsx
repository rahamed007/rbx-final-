import type { Metadata } from "next";
import { CheckCircle2, Flame, Target, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import JoinForm from "./JoinForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Join RBX",
  description: "Apply to the RBX Bangladesh recruitment desk and represent Bangladesh on the world stage.",
};

const PERKS = [
  { icon: Target, title: "Competitive Coaching", text: "Structured practice, combo lab access and tournament prep." },
  { icon: Flame, title: "Tournament Circuit", text: "Guaranteed entries to RBX regulars, invitationals and national opens." },
  { icon: Users, title: "A Brotherhood", text: "Train alongside Bangladesh's most driven attack, defense and stamina specialists." },
];

const REQUIREMENTS = [
  "Own a competitive Beyblade X setup (BX system).",
  "Able to attend weekly team practice (online or in Dhaka).",
  "Sportsmanship first — we battle with honor.",
  "Hunger to improve and represent Bangladesh.",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Recruitment Open"
        title="JOIN THE TEAM"
        subtitle="Think you have what it takes to wear the RBX colors? Apply now — we review every application."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info */}
            <Reveal>
              <h2 className="font-display text-3xl font-bold uppercase text-white">Why RBX?</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                RBX Bangladesh is more than a team — it&apos;s a movement. We build champions who
                spin with power and battle with honor, on the national and international stage.
              </p>

              <div className="mt-8 space-y-5">
                {PERKS.map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-crimson/40 bg-crimson/10">
                      <p.icon className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold uppercase text-white">{p.title}</h3>
                      <p className="text-sm text-zinc-400">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-rbx-line bg-rbx-charcoal p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-crimson">
                  What we look for
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {REQUIREMENTS.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-rbx-line bg-rbx-charcoal carbon p-6 md:p-8 neon-glow">
                <h2 className="font-display text-2xl font-bold uppercase text-white">Application Form</h2>
                <p className="mt-1 text-sm text-zinc-500">All fields marked * are required.</p>
                <div className="mt-6">
                  <JoinForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
