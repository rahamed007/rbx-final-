"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { bladers, medals, combos, tournaments, joinApplications, contactMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { slugify } from "@/lib/utils";

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}
function num(fd: FormData, key: string) {
  const v = str(fd, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function bool(fd: FormData, key: string) {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

/* ------------------------------- Bladers -------------------------------- */
export async function createBlader(fd: FormData) {
  const name = str(fd, "name");
  if (!name) return;
  await db.insert(bladers).values({
    name,
    slug: slugify(name) || `blader-${Date.now()}`,
    realName: str(fd, "realName") || null,
    role: str(fd, "role") || "core",
    playstyle: str(fd, "playstyle") || "balance",
    experience: str(fd, "experience") || null,
    avatarUrl: str(fd, "avatarUrl") || null,
    bannerUrl: str(fd, "bannerUrl") || null,
    signatureCombo: str(fd, "signatureCombo") || null,
    launchTechnique: str(fd, "launchTechnique") || null,
    bio: str(fd, "bio") || null,
    featured: bool(fd, "featured"),
  });
  revalidatePath("/admin/bladers");
  revalidatePath("/players");
  revalidatePath("/");
}

export async function deleteBlader(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(bladers).where(eq(bladers.id, id));
  revalidatePath("/admin/bladers");
  revalidatePath("/players");
  revalidatePath("/");
}

/* -------------------------------- Medals -------------------------------- */
export async function createMedal(fd: FormData) {
  const title = str(fd, "title");
  if (!title) return;
  await db.insert(medals).values({
    title,
    tier: str(fd, "tier") || "gold",
    category: str(fd, "category") || "regular",
    eventName: str(fd, "eventName") || title,
    organizer: str(fd, "organizer") || null,
    venue: str(fd, "venue") || null,
    awardedOn: str(fd, "awardedOn") || null,
    placement: num(fd, "placement"),
    bladerId: num(fd, "bladerId"),
    narrative: str(fd, "narrative") || null,
    featured: bool(fd, "featured"),
  });
  revalidatePath("/admin/medals");
  revalidatePath("/medals");
  revalidatePath("/");
}

export async function deleteMedal(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(medals).where(eq(medals.id, id));
  revalidatePath("/admin/medals");
  revalidatePath("/medals");
  revalidatePath("/");
}

/* -------------------------------- Combos -------------------------------- */
export async function createCombo(fd: FormData) {
  const name = str(fd, "name");
  if (!name) return;
  await db.insert(combos).values({
    name,
    blade: str(fd, "blade") || "—",
    ratchet: str(fd, "ratchet") || "—",
    bit: str(fd, "bit") || "—",
    archetype: str(fd, "archetype") || "balance",
    bladerId: num(fd, "bladerId"),
    description: str(fd, "description") || null,
  });
  revalidatePath("/admin/combos");
  revalidatePath("/combos");
}

export async function deleteCombo(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(combos).where(eq(combos.id, id));
  revalidatePath("/admin/combos");
  revalidatePath("/combos");
}

/* ----------------------------- Tournaments ------------------------------ */
export async function createTournament(fd: FormData) {
  const name = str(fd, "name");
  if (!name) return;
  await db.insert(tournaments).values({
    name,
    slug: slugify(name) || `event-${Date.now()}`,
    date: str(fd, "date") || null,
    location: str(fd, "location") || null,
    organizer: str(fd, "organizer") || null,
    description: str(fd, "description") || null,
    posterUrl: str(fd, "posterUrl") || null,
    status: str(fd, "status") || "past",
    format: str(fd, "format") || "Swiss + Top Cut",
  });
  revalidatePath("/admin/tournaments");
  revalidatePath("/tournaments");
}

export async function deleteTournament(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(tournaments).where(eq(tournaments.id, id));
  revalidatePath("/admin/tournaments");
  revalidatePath("/tournaments");
}

/* ---------------------------- Applications ------------------------------ */
export async function updateApplicationStatus(fd: FormData) {
  const id = num(fd, "id");
  const status = str(fd, "status");
  if (id == null || !status) return;
  await db.update(joinApplications).set({ status }).where(eq(joinApplications.id, id));
  revalidatePath("/admin/applications");
}

export async function deleteApplication(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(joinApplications).where(eq(joinApplications.id, id));
  revalidatePath("/admin/applications");
}

/* ------------------------------ Messages -------------------------------- */
export async function deleteMessage(fd: FormData) {
  const id = num(fd, "id");
  if (id == null) return;
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
}
