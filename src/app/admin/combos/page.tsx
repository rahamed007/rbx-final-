import { getCombos, getBladers } from "@/lib/data";
import { createCombo, deleteCombo } from "../actions";
import { AdminTitle, Card, DeleteButton, Select, inputClass, labelClass, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminCombos() {
  const [combos, bladers] = await Promise.all([getCombos(), getBladers()]);

  return (
    <div className="space-y-6">
      <AdminTitle title="Combos" subtitle="Manage the Beyblade X build directory." />

      <Card title="Add Combo">
        <form action={createCombo} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Name *</label>
            <input name="name" required className={inputClass} placeholder="Shark Scale 3-60 H" />
          </div>
          <div>
            <label className={labelClass}>Blade</label>
            <input name="blade" className={inputClass} placeholder="Shark Scale" />
          </div>
          <div>
            <label className={labelClass}>Ratchet</label>
            <input name="ratchet" className={inputClass} placeholder="3-60" />
          </div>
          <div>
            <label className={labelClass}>Bit</label>
            <input name="bit" className={inputClass} placeholder="H (Hold)" />
          </div>
          <div>
            <label className={labelClass}>Archetype</label>
            <Select name="archetype" options={["attack", "defense", "stamina", "balance"]} defaultValue="attack" />
          </div>
          <div>
            <label className={labelClass}>Owner</label>
            <Select name="bladerId" options={bladers.map((b) => String(b.id))} defaultValue={String(bladers[0]?.id ?? "")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea name="description" rows={3} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Add Combo
            </button>
          </div>
        </form>
      </Card>

      <Card title={`Directory (${combos.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="font-display text-xs uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Blade</th>
                <th className="pb-3 pr-4">Ratchet</th>
                <th className="pb-3 pr-4">Bit</th>
                <th className="pb-3 pr-4">Archetype</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rbx-steel">
              {combos.map((c) => (
                <tr key={c.id}>
                  <td className="py-3 pr-4 font-medium text-white">{c.name}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.blade}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.ratchet}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.bit}</td>
                  <td className="py-3 pr-4 capitalize text-zinc-400">{c.archetype}</td>
                  <td className="py-3">
                    <DeleteButton action={deleteCombo} id={c.id} />
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
