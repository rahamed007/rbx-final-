import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-lg border border-rbx-line bg-rbx-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-crimson";
export const labelClass = "mb-1 block font-display text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-zinc-400";
export const btnPrimary =
  "rounded-lg bg-crimson px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-crimson-bright";

export function AdminTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase text-white">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-rbx-steel bg-rbx-charcoal">
      {title && (
        <div className="border-b border-rbx-steel px-5 py-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">{title}</h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function DeleteButton({ action, id }: { action: (fd: FormData) => void | Promise<void>; id: number }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-rbx-line text-zinc-500 transition hover:border-crimson hover:text-crimson"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}

export function Select({
  name,
  options,
  defaultValue,
  className,
}: {
  name: string;
  options: string[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <select name={name} defaultValue={defaultValue} className={cn(inputClass, className)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
