import { db } from "@/db";
import {
  bladers,
  combos,
  medals,
  medalPhotos,
  tournaments,
  tournamentResults,
  milestones,
  galleryItems,
} from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";

/* --------------------------------- Types -------------------------------- */
export type BladerRow = typeof bladers.$inferSelect;

/**
 * Every read goes through this guard. If the database is unreachable or not
 * migrated yet, the page still renders (with empty data) instead of crashing
 * with a 500. The setup banner explains how to fix it.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[db] query failed:", error instanceof Error ? error.message : error);
    }
    return fallback;
  }
}

/* --------------------------------- Stats -------------------------------- */
export type Stats = {
  totalBladers: number;
  totalMedals: number;
  gold: number;
  silver: number;
  bronze: number;
  victories: number;
  podiums: number;
};

const EMPTY_STATS: Stats = {
  totalBladers: 0,
  totalMedals: 0,
  gold: 0,
  silver: 0,
  bronze: 0,
  victories: 0,
  podiums: 0,
};

export async function getStats(): Promise<Stats> {
  return safe(async () => {
    const [allBladers, allMedals, allResults] = await Promise.all([
      db.select().from(bladers),
      db.select().from(medals),
      db.select().from(tournamentResults),
    ]);

    return {
      totalBladers: allBladers.length,
      totalMedals: allMedals.length,
      gold: allMedals.filter((m) => m.tier === "gold").length,
      silver: allMedals.filter((m) => m.tier === "silver").length,
      bronze: allMedals.filter((m) => m.tier === "bronze").length,
      victories: allResults.filter((r) => r.placement === 1).length,
      podiums: allResults.filter((r) => r.placement <= 3).length,
    };
  }, EMPTY_STATS);
}

/* -------------------------------- Bladers ------------------------------- */
export async function getBladers(): Promise<BladerRow[]> {
  return safe(async () => db.select().from(bladers).orderBy(asc(bladers.id)), []);
}

export async function getFeaturedBladers(limit = 3): Promise<BladerRow[]> {
  return safe(async () => {
    const all = await db.select().from(bladers);
    const featured = all.filter((b) => b.featured);
    const rest = all.filter((b) => !b.featured);
    return [...featured, ...rest].slice(0, limit);
  }, []);
}

export async function getMedalCountsByBlader() {
  return safe(async () => {
    const all = await db.select().from(medals);
    const map = new Map<number, { gold: number; silver: number; bronze: number }>();
    for (const m of all) {
      if (m.bladerId == null) continue;
      const c = map.get(m.bladerId) ?? { gold: 0, silver: 0, bronze: 0 };
      if (m.tier === "gold") c.gold += 1;
      else if (m.tier === "silver") c.silver += 1;
      else if (m.tier === "bronze") c.bronze += 1;
      map.set(m.bladerId, c);
    }
    return map;
  }, new Map<number, { gold: number; silver: number; bronze: number }>());
}

export async function getBladerBySlug(slug: string) {
  return safe(async () => {
    const [blader] = await db.select().from(bladers).where(eq(bladers.slug, slug)).limit(1);
    if (!blader) return null;

    const [bladerCombos, bladerMedals, bladerMilestones, bladerResults] = await Promise.all([
      db.select().from(combos).where(eq(combos.bladerId, blader.id)),
      db.select().from(medals).where(eq(medals.bladerId, blader.id)).orderBy(desc(medals.awardedOn)),
      db
        .select()
        .from(milestones)
        .where(eq(milestones.bladerId, blader.id))
        .orderBy(desc(milestones.happenedOn)),
      db
        .select({
          placement: tournamentResults.placement,
          tournamentId: tournamentResults.tournamentId,
        })
        .from(tournamentResults)
        .where(eq(tournamentResults.bladerId, blader.id)),
    ]);

    const medalsWithPhotos = await Promise.all(
      bladerMedals.map(async (m) => {
        const photos = await db.select().from(medalPhotos).where(eq(medalPhotos.medalId, m.id));
        return { ...m, photos };
      }),
    );

    return {
      ...blader,
      combos: bladerCombos,
      medals: medalsWithPhotos,
      milestones: bladerMilestones,
      results: bladerResults,
    };
  }, null);
}

/* --------------------------------- Medals ------------------------------- */
const EMPTY_MEDALS: Awaited<ReturnType<typeof getMedalsUnsafe>> = [];

async function getMedalsUnsafe() {
  const all = await db.select().from(medals).orderBy(desc(medals.awardedOn));
  return Promise.all(
    all.map(async (m) => {
      const [blader] = m.bladerId
        ? await db.select().from(bladers).where(eq(bladers.id, m.bladerId)).limit(1)
        : [null];
      const photos = await db.select().from(medalPhotos).where(eq(medalPhotos.medalId, m.id));
      return { ...m, blader: blader ?? null, photos };
    }),
  );
}

export async function getMedals() {
  return safe(getMedalsUnsafe, EMPTY_MEDALS);
}

export async function getMedalById(id: number) {
  return safe(async () => {
    const [medal] = await db.select().from(medals).where(eq(medals.id, id)).limit(1);
    if (!medal) return null;
    const [blader] = medal.bladerId
      ? await db.select().from(bladers).where(eq(bladers.id, medal.bladerId)).limit(1)
      : [null];
    const photos = await db.select().from(medalPhotos).where(eq(medalPhotos.medalId, medal.id));
    return { ...medal, blader: blader ?? null, photos };
  }, null);
}

export async function getRecentMedals(limit = 6) {
  const all = await getMedals();
  return all.slice(0, limit);
}

/* --------------------------------- Combos ------------------------------- */
export async function getCombos() {
  return safe(async () => {
    const all = await db.select().from(combos).orderBy(asc(combos.id));
    return Promise.all(
      all.map(async (c) => {
        const [blader] = c.bladerId
          ? await db.select().from(bladers).where(eq(bladers.id, c.bladerId)).limit(1)
          : [null];
        return { ...c, blader: blader ?? null };
      }),
    );
  }, []);
}

/* ------------------------------ Tournaments ----------------------------- */
export async function getTournaments() {
  return safe(async () => db.select().from(tournaments).orderBy(desc(tournaments.date)), []);
}

export async function getTournamentBySlug(slug: string) {
  return safe(async () => {
    const [t] = await db.select().from(tournaments).where(eq(tournaments.slug, slug)).limit(1);
    if (!t) return null;
    const results = await db
      .select({
        id: tournamentResults.id,
        placement: tournamentResults.placement,
        bladerId: tournamentResults.bladerId,
      })
      .from(tournamentResults)
      .where(eq(tournamentResults.tournamentId, t.id))
      .orderBy(asc(tournamentResults.placement));

    const resultsWithBladers = await Promise.all(
      results.map(async (r) => {
        if (!r.bladerId) return { ...r, blader: null };
        const [blader] = await db.select().from(bladers).where(eq(bladers.id, r.bladerId)).limit(1);
        return { ...r, blader: blader ?? null };
      }),
    );

    return { ...t, results: resultsWithBladers };
  }, null);
}

/* -------------------------------- Gallery ------------------------------- */
export async function getGallery() {
  return safe(async () => db.select().from(galleryItems).orderBy(desc(galleryItems.id)), []);
}

/* ----------------------------- Hall of Fame ----------------------------- */
type HallRow = {
  blader: BladerRow;
  gold: number;
  silver: number;
  bronze: number;
  firsts: number;
  totalMedals: number;
  score: number;
};

export async function getHallOfFame(): Promise<HallRow[]> {
  return safe(async () => {
    const [allBladers, allMedals, allResults] = await Promise.all([
      db.select().from(bladers),
      db.select().from(medals),
      db.select().from(tournamentResults),
    ]);

    const rows = allBladers.map((b) => {
      const own = allMedals.filter((m) => m.bladerId === b.id);
      const res = allResults.filter((r) => r.bladerId === b.id);
      const gold = own.filter((m) => m.tier === "gold").length;
      const silver = own.filter((m) => m.tier === "silver").length;
      const bronze = own.filter((m) => m.tier === "bronze").length;
      const firsts = res.filter((r) => r.placement === 1).length;
      const score = gold * 3 + silver * 2 + bronze + firsts * 2;
      return { blader: b, gold, silver, bronze, firsts, totalMedals: own.length, score };
    });

    return rows.sort((a, b) => b.score - a.score);
  }, [] as HallRow[]);
}
