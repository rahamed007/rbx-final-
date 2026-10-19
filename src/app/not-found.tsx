import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/20 blur-[120px]" />
      <div className="relative text-center">
        <p className="font-display text-[8rem] font-bold leading-none text-crimson neon-text md:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase text-white md:text-5xl">
          Out of the stadium
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-400">
          This page spun out of the arena. Let&apos;s get you back to the battle.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">Return Home</Button>
        </div>
      </div>
    </section>
  );
}
