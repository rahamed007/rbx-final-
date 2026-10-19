"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import { submitApplication, type JoinState } from "./actions";

const EXPERIENCE = ["Under 6 months", "6–12 months", "1–2 years", "2+ years"];

const fieldClass =
  "w-full rounded-xl border border-rbx-line bg-rbx-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-crimson focus:neon-glow";

export default function JoinForm() {
  const [state, formAction, isPending] = useActionState<JoinState, FormData>(submitApplication, { ok: false });
  const [loadedAt] = useState(() => Date.now());

  return (
    <form action={formAction} className="relative space-y-5">
      {/* honeypot + time trap */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="loadedAt" value={loadedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Name *</label>
          <input name="name" required placeholder="Your blader name" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Email *</label>
          <input name="email" type="email" required placeholder="you@email.com" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Phone</label>
          <input name="phone" placeholder="+880…" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">City</label>
          <input name="city" placeholder="Dhaka" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Experience</label>
          <select name="experience" className={fieldClass} defaultValue={EXPERIENCE[0]}>
            {EXPERIENCE.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Main Combo</label>
          <input name="mainCombo" placeholder="Shark Scale 3-60 H" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">
          Why should RBX recruit you? *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your playstyle, goals and tournament experience…"
          className={fieldClass}
        />
      </div>

      <AnimatePresence mode="wait">
        {state.error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-crimson/50 bg-crimson/10 px-4 py-3 text-sm text-crimson"
          >
            {state.error}
          </motion.p>
        )}
        {state.ok && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            <CheckCircle2 className="h-5 w-5" /> {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting
          </>
        ) : (
          <>
            Submit Application <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
