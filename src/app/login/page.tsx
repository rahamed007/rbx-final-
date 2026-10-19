"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, ShieldAlert } from "lucide-react";
import RbxMark from "@/components/RbxMark";
import { loginAction, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, { ok: false });

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-5">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/20 blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-rbx-line bg-rbx-charcoal carbon p-8 neon-glow"
      >
        <div className="flex flex-col items-center text-center">
          <RbxMark className="h-16 w-16" />
          <h1 className="mt-5 font-display text-2xl font-bold uppercase tracking-[0.15em] text-white">
            Admin Portal
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Restricted access — RBX team management.</p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="admin@rbx.gg"
              className="w-full rounded-xl border border-rbx-line bg-rbx-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-crimson"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-rbx-line bg-rbx-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-crimson"
            />
          </div>

          {state.error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-crimson/50 bg-crimson/10 px-4 py-2.5 text-sm text-crimson"
            >
              <ShieldAlert className="h-4 w-4" /> {state.error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-crimson-bright disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="mt-6 rounded-lg border border-rbx-line bg-rbx-black/40 px-4 py-3 text-center text-xs text-zinc-500">
          Demo credentials — <span className="text-zinc-300">admin@rbx.gg</span> /{" "}
          <span className="text-zinc-300">RBX@Admin2026</span>
        </p>
      </motion.div>
    </div>
  );
}
