#!/usr/bin/env node
/**
 * RBX Bangladesh — one-command database setup.
 *
 *   node scripts/setup-db.mjs
 *
 * What it does:
 *   1. Reads DATABASE_URL (from .env.local or .env, or the local default).
 *   2. Creates/updates every table with `drizzle-kit push`.
 *   3. Loads the demo roster, medals, tournaments and combos.
 *
 * Safe to run repeatedly — it rebuilds the demo data each time.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { Client } from "pg";

const DEFAULT_URL = "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match) continue;
      const key = match[1];
      let value = match[2].replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

// Hosted Postgres (e.g. Supabase) needs SSL; see src/db/index.ts.
function withSsl(raw) {
  const parsed = new URL(raw);
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  if (!isLocal && !parsed.searchParams.has("sslmode")) {
    parsed.searchParams.set("sslmode", "no-verify");
  }
  return parsed.toString();
}

loadEnv();
const url = withSsl(process.env.DATABASE_URL || DEFAULT_URL);

console.log("\n🏟️  RBX Bangladesh — database setup");
console.log("   target:", url.replace(/:\/\/([^:]+):[^@]*@/, "://$1:****@"));

try {
  console.log("\n[1/3] Creating tables (drizzle-kit push)…");
  execSync("npx drizzle-kit push --force", { stdio: "inherit" });

  console.log("\n[2/3] Connecting to PostgreSQL…");
  const client = new Client({ connectionString: url });
  await client.connect();

  console.log("[3/3] Loading demo data (roster, medals, tournaments)…");
  const seed = readFileSync("supabase/seed.sql", "utf8");
  await client.query(seed);
  await client.end();

  console.log("\n✅ Done! Start the site with:  npm run dev");
  console.log("   Admin login → http://localhost:3000/login");
  console.log("   admin@rbx.gg  /  RBX@Admin2026\n");
} catch (error) {
  console.error("\n❌ Setup failed:", error?.message ?? error);
  console.error("\nMost likely PostgreSQL is not running or DATABASE_URL is wrong.");
  console.error("• Make sure PostgreSQL is installed and running.");
  console.error("• Check .env.local → DATABASE_URL (example: postgresql://postgres:postgres@127.0.0.1:5432/app_db)");
  console.error("• Create the database if needed:  createdb app_db\n");
  process.exit(1);
}
