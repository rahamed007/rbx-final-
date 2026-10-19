"use client";

import { useActionState, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import { sendMessage, type ContactState } from "./actions";

const fieldClass =
  "w-full rounded-xl border border-rbx-line bg-rbx-black/60 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-crimson focus:neon-glow";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(sendMessage, { ok: false });
  const [loadedAt] = useState(() => Date.now());

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="loadedAt" value={loadedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Name *</label>
          <input name="name" required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Email *</label>
          <input name="email" type="email" required placeholder="you@email.com" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Subject</label>
        <input name="subject" placeholder="Sponsorship, collaboration, media…" className={fieldClass} />
      </div>
      <div>
        <label className="mb-1.5 block font-display text-xs uppercase tracking-[0.2em] text-zinc-400">Message *</label>
        <textarea name="message" required rows={5} placeholder="How can we help?" className={fieldClass} />
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
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
