# RBX Bangladesh — Setup & Deployment Guide

> **TL;DR for absolute beginners (Windows / macOS):**
> ```bash
> npm install
> createdb app_db
> node scripts/setup-db.mjs
> npm run dev
> ```
> Then open http://localhost:3000 — admin login is at `/login`
> (`admin@rbx.gg` / `RBX@Admin2026`). A guided wizard with a live connection
> check is available at **`/setup`**.
>
> **The `DATABASE_URL is required` crash is fixed** — the app now falls back to
> `postgresql://postgres:postgres@127.0.0.1:5432/app_db` and shows a friendly
> notice instead of a blank error page.

A production-grade, animated website + admin portal for the RBX Bangladesh
Beyblade X team. Built with **Next.js (App Router)**, **React 19**,
**TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lenis**, and
**PostgreSQL**.

This guide is written for beginners. Follow it top to bottom and you'll have a
live site in under 30 minutes.

---

## Table of Contents

1. [How the app works](#1-how-the-app-works)
2. [Run it locally right now (zero setup)](#2-run-it-locally-right-now-zero-setup)
3. [Create a Supabase project](#3-create-a-supabase-project)
4. [Run the SQL migration](#4-run-the-sql-migration)
5. [Create your admin login](#5-create-your-admin-login)
6. [Connect the app to Supabase](#6-connect-the-app-to-supabase)
7. [Deploy to Vercel](#7-deploy-to-vercel)
8. [Uploading media](#8-uploading-media)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. How the app works

- **Public pages** (Home, Bladers, Medal Vault, Tournaments, Combos, Hall of
  Fame, Gallery, About, Contact, Join) read data from the database and are
  server-rendered for SEO.
- **Admin portal** (`/admin`) is protected by middleware. You log in with an
  email + password; only signed-in sessions can reach the dashboard.
- **Forms** (Join / Contact) write straight into the database with built-in
  anti-spam (honeypot + time-trap).
- **The database** holds bladers, combos, medals (1 physical medal = 1 row),
  medal photos (many per medal), tournaments, results, milestones, gallery
  items and form submissions.

This repository ships **pre-wired to a local PostgreSQL database via Drizzle
ORM** so it runs instantly in a sandbox with zero accounts. `supabase/schema.sql`
is the equivalent, copy-paste migration for hosting the same schema on Supabase's
managed platform.

---

## 2. Run it locally right now (zero setup)

```bash
# 1. install dependencies
npm install

# 2. (sandbox/preview) the local database is already seeded. On your own
#    machine with Postgres running, create the schema + demo data:
node scripts/setup-db.mjs


# 3. start the dev server
npm run dev
# open http://localhost:3000
```

Admin login (demo): **admin@rbx.gg** / **RBX@Admin2026** at `/login`.

---

## 3. Create a Supabase project

1. Go to <https://supabase.com> and sign up (free tier is plenty).
2. Click **New project**. Pick a name, a strong database password, and a region
   close to Bangladesh (e.g. **Singapore**).
3. Wait ~2 minutes for the project to finish provisioning.

---

## 4. Run the SQL migration

1. In your Supabase project, open **SQL Editor** → **New query**.
2. Open the file [`supabase/schema.sql`](./supabase/schema.sql) in this repo,
   copy **all** of it, and paste it into the editor.
3. Click **Run**. This creates every table, turns on Row Level Security with
   public-read / admin-write policies, creates the `rbx-media` storage bucket,
   and loads the demo roster + medals.
4. Sanity check: run `select * from public.team_stats;` — you should see the
   aggregated totals.

---

## 5. Create your admin login

Because admin auth uses **Supabase Auth**:

1. Open **Authentication** → **Users** → **Add user**.
2. Enter an email and a password, and enable **Auto Confirm User**.
3. Use those credentials at `/login`.

> The public site never exposes admin functionality — middleware blocks every
> `/admin` route unless a valid session cookie is present.

---

## 6. Connect the app to Supabase

1. In Supabase, open **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key.
3. In your project, create `.env.local` (copy `.env.local.example`) and set:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ADMIN_SESSION_SECRET=a-long-random-string
   ```

4. Generate a session secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

> **Note:** This repository's running code queries PostgreSQL through Drizzle
> ORM against `DATABASE_URL`. The Supabase URL/anon key above are provided for
> teams adopting the managed-BaaS path described in the spec; the schema and RLS
> rules in `supabase/schema.sql` are identical to what the app expects.

---

## 7. Deploy to Vercel

1. Push this repository to GitHub.
2. Go to <https://vercel.com> → **Add New… → Project** and import the repo.
3. Framework preset: **Next.js** (detected automatically).
4. Add the **Environment Variables** from your `.env.local` in
   **Settings → Environment Variables** (Production + Preview).
5. Click **Deploy**. Vercel builds and hosts the site; every push redeploys.

---

## 8. Uploading media

- Blader avatars/banners, tournament posters and medal photography live in the
  **`rbx-media`** storage bucket (created by the migration, public read).
- Medals without an uploaded photo automatically show a
  **“Physical Photo Pending”** badge on the Medal Vault — nothing breaks while
  photography is pending.

---

## 9. Troubleshooting

| Problem | Fix |
| --- | --- |
| `/admin` redirects to login | Log in at `/login` (admin@rbx.gg / RBX@Admin2026). |
| Page shows a database error | Make sure Postgres is running and `DATABASE_URL` is correct. |
| Empty stats / no bladers | Re-run the seed: ``. |
| Fonts look default | The site loads Chakra Petch + Inter from Google Fonts; ensure network access or self-host them. |
| Admin cookie not sticking | Set a strong `ADMIN_SESSION_SECRET` and ensure cookies are enabled. |

---

**Spin with power. Battle with honor.** 🩸
