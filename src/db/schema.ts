import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  date,
  varchar,
  index,
} from "drizzle-orm/pg-core";

/**
 * RBX Bangladesh — Beyblade X Team
 * ---------------------------------------------------------------------------
 * This Drizzle schema powers the running application (local PostgreSQL).
 * A Supabase-equivalent SQL migration lives in `supabase/schema.sql` for
 * teams that want to deploy on Supabase managed BaaS.
 */

export const bladers = pgTable("bladers", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  realName: varchar("real_name", { length: 160 }),
  role: varchar("role", { length: 40 }).notNull().default("core"), // captain | core | reserve
  playstyle: varchar("playstyle", { length: 40 }).notNull().default("balance"), // attack | defense | stamina | balance
  experience: varchar("experience", { length: 80 }),
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  signatureCombo: text("signature_combo"),
  launchTechnique: text("launch_technique"),
  bio: text("bio"),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  joinedAt: date("joined_at"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const combos = pgTable("combos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  blade: varchar("blade", { length: 120 }).notNull(),
  ratchet: varchar("ratchet", { length: 120 }).notNull(),
  bit: varchar("bit", { length: 120 }).notNull(),
  archetype: varchar("archetype", { length: 40 }).notNull().default("balance"), // attack | defense | stamina | balance
  bladerId: integer("blader_id").references(() => bladers.id, { onDelete: "set null" }),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const medals = pgTable(
  "medals",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 180 }).notNull(),
    tier: varchar("tier", { length: 20 }).notNull().default("gold"), // gold | silver | bronze | special
    category: varchar("category", { length: 40 }).notNull().default("regular"), // regular | swiss | invitational
    eventName: varchar("event_name", { length: 180 }).notNull(),
    organizer: varchar("organizer", { length: 180 }),
    venue: varchar("venue", { length: 180 }),
    awardedOn: date("awarded_on"),
    placement: integer("placement"),
    bladerId: integer("blader_id").references(() => bladers.id, { onDelete: "cascade" }),
    narrative: text("narrative"),
    featured: boolean("featured").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    bladerIdx: index("medals_blader_idx").on(t.bladerId),
    tierIdx: index("medals_tier_idx").on(t.tier),
  }),
);

export const medalPhotos = pgTable("medal_photos", {
  id: serial("id").primaryKey(),
  medalId: integer("medal_id")
    .notNull()
    .references(() => medals.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  kind: varchar("kind", { length: 20 }).notNull().default("front"), // front | back | certificate
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  date: date("date"),
  location: varchar("location", { length: 180 }),
  organizer: varchar("organizer", { length: 180 }),
  description: text("description"),
  posterUrl: text("poster_url"),
  status: varchar("status", { length: 20 }).notNull().default("past"), // past | upcoming
  format: varchar("format", { length: 60 }).default("Swiss + Top Cut"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tournamentResults = pgTable("tournament_results", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  bladerId: integer("blader_id").references(() => bladers.id, { onDelete: "set null" }),
  placement: integer("placement").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  bladerId: integer("blader_id")
    .notNull()
    .references(() => bladers.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 180 }).notNull(),
  happenedOn: date("happened_on"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 60 }).notNull().default("battle"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const joinApplications = pgTable("join_applications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  city: varchar("city", { length: 120 }),
  experience: varchar("experience", { length: 120 }),
  mainCombo: text("main_combo"),
  message: text("message"),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull().default("RBX Admin"),
  passwordHash: text("password_hash").notNull(), // scrypt "salt:hash"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---- Relations (for Drizzle relational queries) ----
import { relations } from "drizzle-orm";

export const bladersRelations = relations(bladers, ({ many }) => ({
  combos: many(combos),
  medals: many(medals),
  milestones: many(milestones),
  results: many(tournamentResults),
}));

export const medalsRelations = relations(medals, ({ one, many }) => ({
  blader: one(bladers, { fields: [medals.bladerId], references: [bladers.id] }),
  photos: many(medalPhotos),
}));

export const medalPhotosRelations = relations(medalPhotos, ({ one }) => ({
  medal: one(medals, { fields: [medalPhotos.medalId], references: [medals.id] }),
}));

export const combosRelations = relations(combos, ({ one }) => ({
  blader: one(bladers, { fields: [combos.bladerId], references: [bladers.id] }),
}));

export const tournamentsRelations = relations(tournaments, ({ many }) => ({
  results: many(tournamentResults),
}));

export const tournamentResultsRelations = relations(tournamentResults, ({ one }) => ({
  tournament: one(tournaments, {
    fields: [tournamentResults.tournamentId],
    references: [tournaments.id],
  }),
  blader: one(bladers, { fields: [tournamentResults.bladerId], references: [bladers.id] }),
}));

export const milestonesRelations = relations(milestones, ({ one }) => ({
  blader: one(bladers, { fields: [milestones.bladerId], references: [bladers.id] }),
}));
