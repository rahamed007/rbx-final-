import { databaseUrl, isDatabaseReachable } from "@/db";

export const dynamic = "force-dynamic";

/** Health probe used by the platform and by the in-app setup banner. */
export async function GET() {
  const ok = await isDatabaseReachable();

  // Never expose credentials — only the host/port/database.
  let target = "unconfigured";
  try {
    const url = new URL(databaseUrl);
    target = `${url.hostname}:${url.port || "5432"}${url.pathname}`;
  } catch {
    target = "invalid connection string";
  }

  if (!ok) {
    return Response.json(
      {
        ok: false,
        database: "unreachable",
        target,
        hint: "Start PostgreSQL, create the app_db database, then run: node scripts/setup-db.mjs",
      },
      { status: 503 },
    );
  }

  return Response.json({ ok: true, database: "reachable", target });
}
