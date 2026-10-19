import { getBladers } from "@/lib/data";
import { createBlader, deleteBlader } from "../actions";
import { AdminTitle, Card, DeleteButton, Select, inputClass, labelClass, btnPrimary } from "../ui";

export const dynamic = "force-dynamic";

export default async function AdminBladers() {
  const bladers = await getBladers();

  return (
    <div className="space-y-6">
      <AdminTitle title="Bladers" subtitle="Add and remove roster members." />

      <Card title="Add Blader">
        <form action={createBlader} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name *</label>
            <input name="name" required className={inputClass} placeholder="SHADOW SF" />
          </div>
          <div>
            <label className={labelClass}>Real Name</label>
            <input name="realName" className={inputClass} placeholder="Shakib Ferdous" />
          </div>
          <div>
            <label className={labelClass}>Role</label>
            <Select name="role" options={["captain", "core", "reserve"]} defaultValue="core" />
          </div>
          <div>
            <label className={labelClass}>Playstyle</label>
            <Select name="playstyle" options={["attack", "defense", "stamina", "balance"]} defaultValue="attack" />
          </div>
          <div>
            <label className={labelClass}>Experience</label>
            <input name="experience" className={inputClass} placeholder="9 Months" />
          </div>
          <div>
            <label className={labelClass}>Signature Combo</label>
            <input name="signatureCombo" className={inputClass} placeholder="Shark Scale 3-60 H" />
          </div>
          <div>
            <label className={labelClass}>Avatar URL</label>
            <input name="avatarUrl" className={inputClass} placeholder="/images/blader-shadow.webp" />
          </div>
          <div>
            <label className={labelClass}>Banner URL</label>
            <input name="bannerUrl" className={inputClass} placeholder="/images/team-banner.webp" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Launch Technique</label>
            <input name="launchTechnique" className={inputClass} placeholder="Sliding Shoot — Xtreme Dash finish" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Bio</label>
            <textarea name="bio" rows={3} className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-300 sm:col-span-2">
            <input type="checkbox" name="featured" className="h-4 w-4 accent-[#dc2626]" /> Featured on homepage
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className={btnPrimary}>
              Add Blader
            </button>
          </div>
        </form>
      </Card>

      <Card title={`Roster (${bladers.length})`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="font-display text-xs uppercase tracking-widest text-zinc-500">
              <tr>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Playstyle</th>
                <th className="pb-3 pr-4">Featured</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-rbx-steel">
              {bladers.map((b) => (
                <tr key={b.id}>
                  <td className="py-3 pr-4 font-medium text-white">{b.name}</td>
                  <td className="py-3 pr-4 capitalize text-zinc-400">{b.role}</td>
                  <td className="py-3 pr-4 capitalize text-zinc-400">{b.playstyle}</td>
                  <td className="py-3 pr-4 text-zinc-400">{b.featured ? "★" : "—"}</td>
                  <td className="py-3">
                    <DeleteButton action={deleteBlader} id={b.id} />
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
