import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RBX Bangladesh for sponsorships, collaborations and media.",
};

const INFO = [
  { icon: Mail, label: "Email", value: "team@rbx.gg" },
  { icon: MapPin, label: "Home Stadium", value: "Dhaka, Bangladesh" },
  { icon: Clock, label: "Response Time", value: "Within 48 hours" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="CONTACT"
        subtitle="Sponsorships, collaborations, media inquiries or just want to talk Beyblade X — we're listening."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h2 className="font-display text-3xl font-bold uppercase text-white">Reach The Team</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                Whether you&apos;re a sponsor, an organizer, or a fellow blader — drop us a line and
                we&apos;ll get back to you.
              </p>
              <div className="mt-8 space-y-4">
                {INFO.map((i) => (
                  <div key={i.label} className="flex items-center gap-4 rounded-2xl border border-rbx-steel bg-rbx-charcoal p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-crimson/40 bg-crimson/10">
                      <i.icon className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">{i.label}</p>
                      <p className="font-medium text-white">{i.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-rbx-line bg-rbx-charcoal carbon p-6 md:p-8">
                <div className="mb-6 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-crimson">
                  <MessageSquare className="h-4 w-4" /> Send a message
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
