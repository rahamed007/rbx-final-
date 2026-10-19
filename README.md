# RBX Bangladesh — Official Beyblade X Team Website

A fully animated, multi-page website **and** admin portal for **RBX Bangladesh**
(Royal Bengal X). Built with Next.js (App Router), React 19, TypeScript,
Tailwind CSS, Framer Motion, Lenis smooth scroll and PostgreSQL.

> **Never touched a backend before? No problem.** The app ships with safe
> defaults, needs no coding, and includes a guided setup screen at **`/setup`**.

---

## 🚀 Quick start (copy & paste)

**1. Install dependencies**

```bash
npm install
```

**2. Create the database** (PostgreSQL must be installed & running)

```bash
createdb app_db
```

**3. Create the tables and load demo data**

```bash
node scripts/setup-db.mjs
```

**4. Start the site**

```bash
npm run dev
```

Open <http://localhost:3000> — done. 🎉

| What | Where |
| --- | --- |
| Public website | <http://localhost:3000> |
| Admin portal | <http://localhost:3000/login> |
| Admin email / password | `admin@rbx.gg` / `RBX@Admin2026` |
| Setup & connection wizard | <http://localhost:3000/setup> |
| Health check | <http://localhost:3000/api/health> |

---

## ⚙️ Configuration

All configuration lives in **`.env.local`** (already included):

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
ADMIN_SESSION_SECRET=rbx-local-dev-secret-change-before-deploying
```

- Replace `postgres` password if you chose a different one during install.
- If your password has `@ # / ?` characters, URL-encode them (`@` → `%40`).
- `ADMIN_SESSION_SECRET` can be any long random string.

**No `.env`? No crash.** The app falls back to the default local URL and shows
a friendly notice instead of a white error screen.

---

## 📄 Pages

| Route | Description |
| --- | --- |
| `/` | Cinematic hero, live stats, featured bladers, recent medals |
| `/players` | Filterable roster (role + playstyle) |
| `/players/[slug]` | Profile, signature combo, medals, career timeline |
| `/medals` | Medal Vault — museum grid + photo modal |
| `/tournaments` | Event archive, podium & standings |
| `/combos` | Beyblade X build directory (filter + search) |
| `/hall-of-fame` | All-time leaderboard |
| `/gallery` | Media gallery with lightbox |
| `/about` | Story, creed, timeline |
| `/contact` | Contact form (saved to database) |
| `/join` | Recruitment desk (validated, anti-spam) |
| `/login` → `/admin` | Protected management portal |
| `/setup` | **Backend setup guide + live connection check** |

---

## 🎬 Animation system

- **Cinematic preloader** with pulsing emblem + tagline reveal (session-aware,
  with a hard failsafe so it can never block the site).
- **Lenis** momentum scrolling with parallax stadium rails.
- **Kinetic typography** — word-staggered masked reveals.
- **3D holographic tilt cards** with cursor-tracking sheen.
- **Pinned horizontal carousels** for featured bladers and the medal vault.
- **Bey-Dash route transitions** with crimson streak lines.

All motion respects `prefers-reduced-motion` and degrades gracefully.

---

## 🗄️ Database

Tables: `bladers`, `combos`, `medals`, `medal_photos`, `tournaments`,
`tournament_results`, `milestones`, `gallery_items`, `join_applications`,
`contact_messages`, `admin_users`.

- 1 physical medal = **1 row** in `medals`; photos live in `medal_photos`.
- All homepage totals are **aggregated from the database** (never hardcoded).
- Schema: `src/db/schema.ts` (Drizzle).
- Supabase version: `supabase/schema.sql` (tables + RLS + storage bucket + seed).
- Local seed: `supabase/seed.sql`.

Useful commands:

```bash
npx drizzle-kit push                                         # sync schema
psql "$DATABASE_URL" -f supabase/seed.sql                    # reload demo data
node scripts/setup-db.mjs                                    # both, one command
```

---

## ☁️ Deploy

See **[SETUP.md](./SETUP.md)** for the full beginner walkthrough (Supabase +
Vercel). Short version: push to GitHub → import in Vercel → add
`DATABASE_URL` + `ADMIN_SESSION_SECRET` → Deploy.

---

## 🧯 Troubleshooting

| Symptom | Fix |
| --- | --- |
| `DATABASE_URL is required` | **Fixed** in this version. Still seeing it? Delete `.next`, then run `node scripts/setup-db.mjs` and `npm run dev`. |
| Empty bladers / medals | Database has no data → `node scripts/setup-db.mjs`. |
| Amber “Database not connected” banner | PostgreSQL isn't running, or the password in `.env.local` is wrong. Open `/setup`. |
| `ECONNREFUSED 127.0.0.1:5432` | Start PostgreSQL (Windows: Services → postgresql). |
| `database "app_db" does not exist` | Run `createdb app_db`. |
| Admin login says invalid | Run the seed script (it creates the admin user). |
| Changes to `.env.local` ignored | Restart `npm run dev`. |

**Spin with power. Battle with honor.**
