"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";

type Health = { ok: boolean; database?: string; target?: string; hint?: string };

/**
 * Pings /api/health on load. If the database is unreachable, a slim banner
 * appears with a direct link to the setup guide — so the site is never
 * silently empty without an explanation.
 */
export default function DbStatusBanner() {
  const [health, setHealth] = useState<Health | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health", { cache: "no-store" })
      .then((r) => r.json() as Promise<Health>)
      .then((data) => {
        if (!cancelled) setHealth(data);
      })
      .catch(() => {
        if (!cancelled) setHealth({ ok: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!health || health.ok || dismissed) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[90] flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-center text-xs font-medium text-black">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Database not connected — showing empty content.{" "}
        <Link href="/setup" className="font-bold underline">
          Open the 2-minute setup guide
        </Link>
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="ml-2 shrink-0 rounded p-0.5 hover:bg-black/10"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
