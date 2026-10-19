import { desc } from "drizzle-orm";
import { Mail } from "lucide-react";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { deleteMessage } from "../actions";
import { AdminTitle, DeleteButton } from "../ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const msgs = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));

  return (
    <div className="space-y-6">
      <AdminTitle title="Messages" subtitle={`${msgs.length} contact submissions.`} />

      {msgs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-rbx-line py-20 text-zinc-500">
          <Mail className="h-10 w-10" />
          <p className="font-display uppercase tracking-[0.2em]">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {msgs.map((m) => (
            <div key={m.id} className="rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{m.subject || "(No subject)"}</h3>
                  <p className="text-sm text-zinc-500">
                    {m.name} · {m.email}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-600">{formatDate(m.createdAt as unknown as string)}</p>
                </div>
                <DeleteButton action={deleteMessage} id={m.id} />
              </div>
              <p className="mt-3 whitespace-pre-wrap rounded-lg border border-rbx-line bg-rbx-black/40 p-3 text-sm leading-relaxed text-zinc-400">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
