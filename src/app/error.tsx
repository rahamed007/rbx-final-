"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Wrench } from "lucide-react";

/** Friendly error boundary — explains what happened instead of a stack trace. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const looksLikeDb = /database|econnrefused|password|relation .* does not exist|connect/i.test(
    `${error.message} ${error.digest ?? ""}`,
  );

  return (
    <section className="grid min-h-screen place-items-center px-5 py-24">
      <div className="w-full max-w-lg rounded-2xl border border-rbx-line bg-rbx-charcoal p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-amber-400" />
        <h1 className="mt-4 font-display text-2xl font-bold uppercase text-white">
          {looksLikeDb ? "Database not connected" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {looksLikeDb
            ? "The site could not reach your PostgreSQL database. Run the one-command setup, then reload."
            : "A temporary error occurred while rendering this page. Try again."}
        </p>

        {looksLikeDb && (
          <pre className="mt-4 overflow-x-auto rounded-lg border border-rbx-line bg-black/60 px-4 py-3 text-left font-mono text-xs text-emerald-300">
            node scripts/setup-db.mjs
          </pre>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-crimson px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-white hover:bg-crimson-bright"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Try again
          </button>
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 rounded-lg border border-rbx-line px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-zinc-200 hover:border-crimson hover:text-crimson"
          >
            <Wrench className="h-3.5 w-3.5" /> Setup guide
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-rbx-line px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-zinc-200 hover:border-crimson hover:text-crimson"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
