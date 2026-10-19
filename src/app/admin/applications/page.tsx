import { desc } from "drizzle-orm";
import { Inbox } from "lucide-react";
import { db } from "@/db";
import { joinApplications } from "@/db/schema";
import { updateApplicationStatus, deleteApplication } from "../actions";
import { AdminTitle, DeleteButton, Select } from "../ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "reviewed", "accepted", "rejected"];
const statusColor: Record<string, string> = {
  new: "text-crimson border-crimson/50",
  reviewed: "text-gold border-gold/50",
  accepted: "text-emerald-400 border-emerald-400/50",
  rejected: "text-zinc-500 border-rbx-line",
};

export default async function AdminApplications() {
  const apps = await db.select().from(joinApplications).orderBy(desc(joinApplications.createdAt));

  return (
    <div className="space-y-6">
      <AdminTitle title="Applications" subtitle={`${apps.filter((a) => a.status === "new").length} new recruitment applications.`} />

      {apps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-rbx-line py-20 text-zinc-500">
          <Inbox className="h-10 w-10" />
          <p className="font-display uppercase tracking-[0.2em]">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((a) => (
            <div key={a.id} className="rounded-2xl border border-rbx-steel bg-rbx-charcoal p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{a.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {a.email} {a.phone && `· ${a.phone}`} {a.city && `· ${a.city}`}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-600">
                    {a.experience ?? "—"} · applied {formatDate(a.createdAt as unknown as string)}
                  </p>
                </div>
                <span className={`rounded-full border px-3 py-1 font-display text-[0.6rem] uppercase tracking-widest ${statusColor[a.status] || statusColor.new}`}>
                  {a.status}
                </span>
              </div>

              {a.mainCombo && (
                <p className="mt-3 text-sm text-zinc-300">
                  <span className="text-zinc-500">Main combo:</span> {a.mainCombo}
                </p>
              )}
              <p className="mt-3 rounded-lg border border-rbx-line bg-rbx-black/40 p-3 text-sm leading-relaxed text-zinc-400">
                {a.message}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <form action={updateApplicationStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={a.id} />
                  <Select name="status" options={STATUSES} defaultValue={a.status} className="w-36" />
                  <button type="submit" className="rounded-lg border border-rbx-line px-3 py-2 font-display text-xs uppercase tracking-widest text-zinc-300 transition hover:border-crimson hover:text-crimson">
                    Update
                  </button>
                </form>
                <div className="ml-auto">
                  <DeleteButton action={deleteApplication} id={a.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
