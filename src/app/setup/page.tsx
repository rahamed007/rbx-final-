"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Database,
  Terminal,
  KeyRound,
  ExternalLink,
  Rocket,
} from "lucide-react";
import RbxMark from "@/components/RbxMark";

type Health = { ok: boolean; database?: string; target?: string; hint?: string };

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mt-2 overflow-hidden rounded-lg border border-rbx-line bg-black/60">
      <pre className="overflow-x-auto px-4 py-3 pr-12 font-mono text-xs leading-relaxed text-emerald-300">
        {children}
      </pre>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            /* clipboard blocked */
          }
        }}
        className="absolute right-2 top-2 rounded-md border border-rbx-line bg-rbx-charcoal p-1.5 text-zinc-400 transition hover:text-white"
        aria-label="Copy command"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  children,
}: {
  n: number;
  icon: typeof Database;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson font-display text-sm font-bold text-white">
          {n}
        </span>
        <Icon className="h-4 w-4 text-crimson" />
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

export default function SetupPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [checking, setChecking] = useState(false);

  const check = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      setHealth((await res.json()) as Health);
    } catch {
      setHealth({ ok: false });
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  return (
    <div className="min-h-screen px-5 pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <RbxMark className="h-10 w-10" />
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-crimson">System Setup</p>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
          Connect your database
        </h1>
        <p className="mt-3 text-zinc-400">
          No backend knowledge needed. Follow these steps once and the entire site — bladers, medals,
          tournaments, admin portal — comes alive with demo data.
        </p>

        {/* Live status */}
        <div
          className={`mt-8 rounded-2xl border p-5 ${
            health?.ok ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {health?.ok ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              ) : (
                <XCircle className="h-6 w-6 text-amber-400" />
              )}
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  {health === null
                    ? "Checking connection…"
                    : health.ok
                      ? "Database connected — you're all set"
                      : "Database not connected"}
                </p>
                <p className="font-mono text-xs text-zinc-400">{health?.target ?? "resolving target…"}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void check()}
              disabled={checking}
              className="flex items-center gap-2 rounded-lg border border-rbx-line px-3 py-2 font-display text-xs uppercase tracking-widest text-zinc-200 transition hover:border-crimson hover:text-crimson disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${checking ? "animate-spin" : ""}`} /> Re-check
            </button>
          </div>
          {health?.ok && (
            <p className="mt-3 text-sm text-emerald-300">
              Everything is working.{" "}
              <Link href="/" className="underline">
                Go to the homepage
              </Link>{" "}
              or{" "}
              <Link href="/login" className="underline">
                open the admin portal
              </Link>
              .
            </p>
          )}
        </div>

        <div className="mt-8 space-y-5">
          <Step n={1} icon={Database} title="Install & start PostgreSQL">
            <p>
              Windows/macOS: download the free installer from{" "}
              <a
                href="https://www.postgresql.org/download/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-crimson underline"
              >
                postgresql.org/download <ExternalLink className="h-3 w-3" />
              </a>
              . During install, keep the default port <strong className="text-white">5432</strong> and set a
              password (the demo uses <code className="text-white">postgres</code>).
            </p>
            <p>Then create the database (run once):</p>
            <Code>{`createdb app_db`}</Code>
          </Step>

          <Step n={2} icon={KeyRound} title="Check your .env.local file">
            <p>
              This project already includes <code className="text-white">.env.local</code>. Open it and make
              sure the password matches the one you chose during PostgreSQL installation:
            </p>
            <Code>{`DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/app_db`}</Code>
            <p className="text-xs text-zinc-500">
              If your password contains special characters (@, #, /), URL-encode them (e.g. <code>@</code> →{" "}
              <code>%40</code>).
            </p>
          </Step>

          <Step n={3} icon={Terminal} title="Create tables & load demo data">
            <p>From the project folder, run this single command:</p>
            <Code>{`node scripts/setup-db.mjs`}</Code>
            <p>It creates all tables and fills them with the RBX roster, medals and tournaments.</p>
          </Step>

          <Step n={4} icon={Rocket} title="Restart the site">
            <p>Stop the terminal (Ctrl + C), then start it again:</p>
            <Code>{`npm run dev`}</Code>
            <p>
              Open{" "}
              <Link href="/" className="text-crimson underline">
                the homepage
              </Link>{" "}
              and hit <strong className="text-white">Re-check</strong> above. Admin login:{" "}
              <code className="text-white">admin@rbx.gg</code> /{" "}
              <code className="text-white">RBX@Admin2026</code>.
            </p>
          </Step>
        </div>

        <div className="mt-8 rounded-2xl border border-rbx-line bg-rbx-charcoal p-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Prefer a hosted database? (no installs)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Create a free project at{" "}
            <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-crimson underline">
              supabase.com
            </a>
            , open the <strong className="text-white">SQL Editor</strong>, paste the whole file{" "}
            <code className="text-white">supabase/schema.sql</code> and click Run. Then copy the
            &quot;Connection string&quot; from Project Settings → Database into{" "}
            <code className="text-white">DATABASE_URL</code> (use the <em>Session pooler</em> URI) and restart.
            Full steps are in <code className="text-white">SETUP.md</code>.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-rbx-line bg-rbx-black/40 p-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Seeing “DATABASE_URL is required”?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            That crash is already fixed in this version — the app now falls back to{" "}
            <code className="text-white">postgresql://postgres:postgres@127.0.0.1:5432/app_db</code> and shows
            this guide instead of a white error screen. Following steps 1–4 above resolves it.
          </p>
        </div>
      </div>
    </div>
  );
}
