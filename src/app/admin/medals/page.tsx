import { getMedals, getBladers } from "@/lib/data";
import { createMedal, deleteMedal } from "../actions";
import { AdminTitle, Card, DeleteButton, Select, inputClass, labelClass, btnPrimary } from "../ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMedals() {
  const [medals, bladers] = await Promise.all([getMedals(), getBladers()]);

  return (
    <div className="space-y-6">
      <AdminTitle title="Medals" subtitle="Log physical medals into the vault." />

      <Card title="Add Medal">
        <form action={createMedal} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Title *</label>
            <input name="title" required className={inputClass} placeholder="S1 Regular #1 — Champion" />
          </div>
          <div>
            <label className={labelClass}>Tier</label>
            <Select name="tier" options={["gold", "silver", "bronze", "special"]} defaultValue="gold" />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <Select name="category" options={["regular", "swiss", "invitational"]} defaultValue="regular" />
          </div>
          <div>
            <label className={labelClass}>Event Name</label>
            <input name="eventName" className={inputClass} placeholder="RBX S1 Regular #1" />
          </div>
          <div>
            <label className={labelClass}>Blader</label>
            <Select name="bladerId" options={bladers.map((b) => String(b.id))} defaultValue={String(bladers[0]?.id ?? "")} />
          </div>
          <div>
            <label className={labelClass}>Organizer</label>
            <input name="organizer" className={inputClass} placeholder="RBX Bangladesh" />
          </div>
          <div>
            <label className={labelClass}>Venue</label>
            <input name="venue" className={inputClass} placeholder="Dhaka" />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input name="awardedOn" type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Placement</label>
            <input name="placement" type="number" min={1} className={inputClass} placeholder="1" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Battle Narrative</label>
            <textarea name="narrative" rows={3} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-300 sm:col-span-2">
            <input type="checkbox" name="featured" className="h-4 w-4 accent-[#dc2626]" /> Featured medal
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Add Medal
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-zinc-600">
          Note: medal photography is uploaded separately in Supabase Storage (rbx-media bucket). Medals without
          photos display the “Physical Photo Pending” badge.
        </p>
      </Card>

      <Card title={`Vault (${medals.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="font-display text-xs uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="pb-3 pr-4">Title</th>
                <th className="pb-3 pr-4">Tier</th>
                <th className="pb-3 pr-4">Blader</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rbx-steel">
              {medals.map((m) => (
                <tr key={m.id}>
                  <td className="py-3 pr-4 font-medium text-white">{m.title}</td>
                  <td className="py-3 pr-4 capitalize text-zinc-400">{m.tier}</td>
                  <td className="py-3 pr-4 text-zinc-400">{m.blader?.name ?? "—"}</td>
                  <td className="py-3 pr-4 text-zinc-500">{formatDate(m.awardedOn)}</td>
                  <td className="py-3">
                    <DeleteButton action={deleteMedal} id={m.id} />
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
