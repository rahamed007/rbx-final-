import { getTournaments } from "@/lib/data";
import { createTournament, deleteTournament } from "../actions";
import { AdminTitle, Card, DeleteButton, Select, inputClass, labelClass, btnPrimary } from "../ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminTournaments() {
  const tournaments = await getTournaments();

  return (
    <div className="space-y-6">
      <AdminTitle title="Tournaments" subtitle="Manage the event archive." />

      <Card title="Add Tournament">
        <form action={createTournament} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Name *</label>
            <input name="name" required className={inputClass} placeholder="RBX S1 Regular #1" />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input name="date" type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <Select name="status" options={["past", "upcoming"]} defaultValue="past" />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input name="location" className={inputClass} placeholder="Dhaka" />
          </div>
          <div>
            <label className={labelClass}>Organizer</label>
            <input name="organizer" className={inputClass} placeholder="RBX Bangladesh" />
          </div>
          <div>
            <label className={labelClass}>Format</label>
            <input name="format" className={inputClass} placeholder="Swiss + Top Cut" />
          </div>
          <div>
            <label className={labelClass}>Poster URL</label>
            <input name="posterUrl" className={inputClass} placeholder="/images/hero.webp" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea name="description" rows={3} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Add Tournament
            </button>
          </div>
        </form>
      </Card>

      <Card title={`Events (${tournaments.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="font-display text-xs uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Location</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rbx-steel">
              {tournaments.map((t) => (
                <tr key={t.id}>
                  <td className="py-3 pr-4 font-medium text-white">{t.name}</td>
                  <td className="py-3 pr-4 text-zinc-400">{formatDate(t.date)}</td>
                  <td className="py-3 pr-4 text-zinc-400">{t.location ?? "—"}</td>
                  <td className="py-3 pr-4 capitalize text-zinc-400">{t.status}</td>
                  <td className="py-3">
                    <DeleteButton action={deleteTournament} id={t.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
