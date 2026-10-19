import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Read DATABASE_URL from .env.local / .env so `drizzle-kit push` targets the
// same database as the app (local Postgres or Supabase).
config({ path: [".env.local", ".env"], quiet: true });

const DEFAULT_LOCAL_URL = "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

function withSsl(url: string): string {
  const parsed = new URL(url);
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  if (!isLocal && !parsed.searchParams.has("sslmode")) {
    parsed.searchParams.set("sslmode", "no-verify");
  }
  return parsed.toString();
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: withSsl(process.env.DATABASE_URL?.trim() || DEFAULT_LOCAL_URL),
  },
});
