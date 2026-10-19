import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Database client (Drizzle + node-postgres).
 *
 * Beginner-friendly by design:
 *  - Never throws at import time. If no connection string is configured we fall
 *    back to the standard local default instead of crashing the whole site.
 *  - Reuses a single pool across hot reloads in development.
 *  - Connection failures are surfaced by the query helpers in `src/lib/data.ts`
 *    as a friendly setup screen, not a raw stack trace.
 */

const DEFAULT_LOCAL_URL = "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
    process.env.PG_URL,
  ];
  for (const value of candidates) {
    if (value && value.trim().length > 0) return value.trim();
  }
  return DEFAULT_LOCAL_URL;
}

/**
 * Hosted Postgres (e.g. Supabase) needs SSL, but its certificate chain isn't in
 * Node's default trust store. For non-local hosts with no explicit sslmode we
 * use `no-verify`: encrypted, without CA verification.
 */
function withSsl(url: string): string {
  try {
    const parsed = new URL(url);
    const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
    if (!isLocal && !parsed.searchParams.has("sslmode")) {
      parsed.searchParams.set("sslmode", "no-verify");
      return parsed.toString();
    }
  } catch {
    // Leave unparsable strings alone; the pool will report the error.
  }
  return url;
}

export const databaseUrl = withSsl(resolveDatabaseUrl());

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
  });

// Never let a background pool error take down the Node process.
pool.on("error", (err) => {
  console.error("[db] idle client error:", err.message);
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);

/** Quick connectivity probe used to render friendly setup guidance. */
export async function isDatabaseReachable(): Promise<boolean> {
  try {
    const client = await pool.connect();
    try {
      await client.query("select 1");
      return true;
    } finally {
      client.release();
    }
  } catch {
    return false;
  }
}
