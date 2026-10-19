-- ==========================================================================
-- RBX BANGLADESH — DEMO SEED DATA (local PostgreSQL / Drizzle)
-- Run after `npx drizzle-kit push`. Safe to re-run (truncates first).
-- Password below is scrypt("RBX@Admin2026") for the demo admin login.
-- ==========================================================================

BEGIN;

TRUNCATE medal_photos, medals, milestones, tournament_results, tournaments,
         combos, gallery_items, join_applications, contact_messages,
         admin_users, bladers RESTART IDENTITY CASCADE;

-- ------------------------------- Bladers -------------------------------- --
INSERT INTO bladers (slug, name, real_name, role, playstyle, experience, avatar_url, banner_url, signature_combo, launch_technique, bio, wins, losses, featured, joined_at) VALUES
('shadow-sf', 'SHADOW SF', 'Shakib Ferdous', 'captain', 'attack', '9 Months',
 '/images/blader-shadow.webp', '/images/team-banner.webp',
 'Shark Scale 3-60 H',
 'Sliding Shoot — Xtreme Dash finish',
 'RBX captain and the team''s fiercest attack-type blader. Known for a relentless Sliding Shoot that converts launch angle into raw burst power. Main deck: Shark Scale 3-60 LR / Wizard Rod 1-60 H / Hells Nether Nr.',
 0, 0, true, '2025-01-20'),
('cmx', 'CMX', 'MD Khaled Mahmud', 'core', 'attack', '7 Months',
 '/images/blader-cmx.webp', '/images/team-banner.webp',
 'Aero Pegasus 1-80 Point',
 'Tornado Launch — Big Bang finish',
 'High-tempo attack blader with a gift for reading launch angles. Aero Pegasus specialist who thrives under pressure and already owns a Swiss medal on the international stage.',
 0, 0, true, '2025-02-01'),
('blitz-rahim', 'BLITZ RAHIM', 'Rahim Uddin', 'reserve', 'stamina', '1 Year',
 '/images/blader-shadow.webp', '/images/team-banner.webp',
 'Knight Shield 3-80 Orbit',
 'Straight Launch — Long spin',
 'The team''s stamina anchor. Patient, methodical, and almost impossible to burst in the endgame.',
 0, 0, false, '2025-03-10'),
('nova-tanvir', 'NOVA TANVIR', 'Tanvir Ahmed', 'core', 'defense', '8 Months',
 '/images/blader-cmx.webp', '/images/team-banner.webp',
 'Turtle Ring 5-80 Ball',
 'Heavy Slash Launch',
 'Defensive specialist who turns opponents'' power against them. Rock-solid in the pocket.',
 0, 0, false, '2025-02-18'),
('zero-hossain', 'ZERO HOSSAIN', 'Hossain Iqbal', 'reserve', 'balance', '5 Months',
 '/images/blader-shadow.webp', '/images/team-banner.webp',
 'Dran Dagger 4-60 Rush',
 'Drop Launch — Counter finish',
 'Balanced all-rounder with a sharp counter-attack game. The team''s rising prospect.',
 0, 0, false, '2025-08-05');

-- -------------------------------- Combos --------------------------------- --
INSERT INTO combos (name, blade, ratchet, bit, archetype, blader_id, description) VALUES
('Shark Scale 3-60 H', 'Shark Scale', '3-60', 'H (Hold)', 'attack', 1, 'Signature combo. Aggressive rubber-assisted attack with a hold finish for consistent burst conversions.'),
('Wizard Rod 1-60 H', 'Wizard Rod', '1-60', 'H (Hold)', 'attack', 1, 'Main-deck attack alternate — low profile, high speed.'),
('Hells Nether Nr', 'Hells Nether', '—', 'Nr (Needle)', 'stamina', 1, 'Main-deck stamina pick for longer sets. Full ratchet spec pending.'),
('Aero Pegasus 1-80 Point', 'Aero Pegasus', '1-80', 'Point', 'attack', 2, 'Signature combo. Explosive smash-attack core built for a Big Bang finish.'),
('Aero Pegasus 1-60 Rush', 'Aero Pegasus', '1-60', 'Rush', 'attack', 2, 'High-RPM variant for aggressive movement patterns.'),
('Shark Scale 4-50 Level', 'Shark Scale', '4-50', 'Level', 'stamina', 2, 'Stamina-leaning Shark Scale build for grindy matchups.'),
('Knight Shield 3-80 Orbit', 'Knight Shield', '3-80', 'Orbit', 'stamina', 3, 'Circular stamina monster built to outlast the meta.'),
('Turtle Ring 5-80 Ball', 'Turtle Ring', '5-80', 'Ball', 'defense', 4, 'Immovable defensive wall with high recoil resistance.'),
('Dran Dagger 4-60 Rush', 'Dran Dagger', '4-60', 'Rush', 'balance', 5, 'Versatile balance combo with a deadly counter-rush.');

-- ------------------------------ Tournaments ------------------------------ --
INSERT INTO tournaments (name, slug, date, location, organizer, description, poster_url, status, format) VALUES
('RBX Season Opener', 'rbx-season-opener', '2025-02-15', 'Dhaka', 'RBX Bangladesh', 'The curtain-raiser for Season 1 — a packed bracket that set the tone for the year.', '/images/team-banner.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Regular #1', 'rbx-s1-regular-1', '2025-03-08', 'Dhaka', 'RBX Bangladesh', 'Opening regular of the S1 circuit.', '/images/hero.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Regular #2', 'rbx-s1-regular-2', '2025-03-29', 'Dhaka', 'RBX Bangladesh', 'Second stop of the S1 regular season.', '/images/hero.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Regular #3', 'rbx-s1-regular-3', '2025-04-19', 'Chattogram', 'RBX Bangladesh', 'Chattogram leg of the S1 circuit.', '/images/hero.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Regular #4', 'rbx-s1-regular-4', '2025-05-10', 'Dhaka', 'RBX Bangladesh', 'Fourth regular — qualification heats up.', '/images/hero.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Regular #5', 'rbx-s1-regular-5', '2025-05-31', 'Dhaka', 'RBX Bangladesh', 'Final regular before the Grand Final.', '/images/hero.webp', 'past', 'Swiss + Top Cut'),
('RBX S1 Grand Final', 'rbx-s1-grand-final', '2025-06-21', 'Dhaka', 'RBX Bangladesh', 'The Season 1 Grand Final — the biggest stage of the year.', '/images/team-banner.webp', 'past', 'Double Elimination'),
('RBX Winter Invitational 2026', 'rbx-winter-invitational-2026', '2026-02-14', 'Dhaka', 'RBX Bangladesh', 'Invite-only showdown featuring the region''s elite.', '/images/team-banner.webp', 'upcoming', 'Invitational Round Robin'),
('Bangladesh National Beyblade X Open', 'bd-national-open-2026', '2026-03-21', 'Sylhet', 'BeyBlade BD Federation', 'The national open — RBX fields its full roster.', '/images/hero.webp', 'upcoming', 'Swiss + Top Cut');

-- -------------------------- Tournament results --------------------------- --
INSERT INTO tournament_results (tournament_id, blader_id, placement) VALUES
(1, 2, 1), (1, 1, 3),
(2, 1, 1), (2, 2, 2),
(3, 2, 1), (3, 1, 2),
(4, 1, 1), (4, 2, 3),
(5, 2, 1),
(6, 2, 1),
(7, 1, 1), (7, 2, 2);

-- -------------------------------- Medals --------------------------------- --
-- SHADOW SF: 3 gold, 3 silver, 1 bronze
INSERT INTO medals (title, tier, category, event_name, organizer, venue, awarded_on, placement, blader_id, narrative, featured) VALUES
('S1 Regular #1 — Champion', 'gold', 'regular', 'RBX S1 Regular #1', 'RBX Bangladesh', 'Dhaka', '2025-03-08', 1, 1, 'A flawless top-cut run capped by a 2-0 burst finish in the final.', true),
('S1 Regular #3 — Champion', 'gold', 'regular', 'RBX S1 Regular #3', 'RBX Bangladesh', 'Chattogram', '2025-04-19', 1, 1, 'Won the away leg with a signature Shark Scale Xtreme Dash.', true),
('S1 Grand Final — Champion', 'gold', 'regular', 'RBX S1 Grand Final', 'RBX Bangladesh', 'Dhaka', '2025-06-21', 1, 1, 'Season 1 Grand Final title — the crowning achievement of the season.', true),
('S1 Regular #2 — Runner-up', 'silver', 'regular', 'RBX S1 Regular #2', 'RBX Bangladesh', 'Dhaka', '2025-03-29', 2, 1, 'Narrow final loss in a five-game grind.', false),
('S1 Regular #4 — Runner-up', 'silver', 'regular', 'RBX S1 Regular #4', 'RBX Bangladesh', 'Dhaka', '2025-05-10', 2, 1, 'Strong run ended by a last-spin heartbreaker.', false),
('Season Opener — Runner-up', 'silver', 'regular', 'RBX Season Opener', 'RBX Bangladesh', 'Dhaka', '2025-02-15', 2, 1, 'Debut event podium to open the season.', false),
('Season Opener — 3rd Place', 'bronze', 'regular', 'RBX Season Opener (Consolation)', 'RBX Bangladesh', 'Dhaka', '2025-02-15', 3, 1, 'Bronze from the consolation bracket.', false);

-- CMX: 4 gold, 2 silver, 5 bronze, 1 swiss (special)
INSERT INTO medals (title, tier, category, event_name, organizer, venue, awarded_on, placement, blader_id, narrative, featured) VALUES
('Season Opener — Champion', 'gold', 'regular', 'RBX Season Opener', 'RBX Bangladesh', 'Dhaka', '2025-02-15', 1, 2, 'Won the season opener on debut — an instant statement.', true),
('S1 Regular #2 — Champion', 'gold', 'regular', 'RBX S1 Regular #2', 'RBX Bangladesh', 'Dhaka', '2025-03-29', 1, 2, 'Back-to-back wins with the Aero Pegasus combo.', true),
('S1 Regular #4 — Champion', 'gold', 'regular', 'RBX S1 Regular #4', 'RBX Bangladesh', 'Dhaka', '2025-05-10', 1, 2, 'Dominant undefeated top cut.', false),
('S1 Regular #5 — Champion', 'gold', 'regular', 'RBX S1 Regular #5', 'RBX Bangladesh', 'Dhaka', '2025-05-31', 1, 2, 'Fourth title of the season.', false),
('S1 Regular #1 — Runner-up', 'silver', 'regular', 'RBX S1 Regular #1', 'RBX Bangladesh', 'Dhaka', '2025-03-08', 2, 2, 'Final decided by a single out-spin.', false),
('S1 Grand Final — Runner-up', 'silver', 'regular', 'RBX S1 Grand Final', 'RBX Bangladesh', 'Dhaka', '2025-06-21', 2, 2, 'Grand finalist in the biggest event of the year.', false),
('S1 Regular #3 — 3rd Place', 'bronze', 'regular', 'RBX S1 Regular #3', 'RBX Bangladesh', 'Chattogram', '2025-04-19', 3, 2, 'Bronze on the road.', false),
('Regional Qualifier — 3rd Place', 'bronze', 'regular', 'RBX Regional Qualifier', 'RBX Bangladesh', 'Dhaka', '2025-01-25', 3, 2, 'First competitive podium.', false),
('Community Cup — 3rd Place', 'bronze', 'regular', 'RBX Community Cup', 'RBX Bangladesh', 'Dhaka', '2025-07-12', 3, 2, 'Solid community-event finish.', false),
('Summer Series — 3rd Place', 'bronze', 'regular', 'RBX Summer Series', 'RBX Bangladesh', 'Dhaka', '2025-07-26', 3, 2, 'Bronze in the summer series.', false),
('Monsoon Clash — 3rd Place', 'bronze', 'regular', 'RBX Monsoon Clash', 'RBX Bangladesh', 'Dhaka', '2025-08-09', 3, 2, 'Bronze in the monsoon clash.', false),
('International Swiss — Medalist', 'special', 'swiss', 'Beyblade X International Swiss', 'BeyBlade X Global', 'Online / Global', '2025-05-31', 1, 2, 'Earned an international Swiss medal competing against the global field — RBX''s first on the world stage.', true);

-- A few medals have real photos uploaded; the rest show "Physical Photo Pending".
INSERT INTO medal_photos (medal_id, url, kind) VALUES
(1, '/images/medal.webp', 'front'),
(1, '/images/medal.webp', 'back'),
(1, '/images/medal.webp', 'certificate'),
(3, '/images/medal.webp', 'front'),
(8, '/images/medal.webp', 'front'),
(8, '/images/medal.webp', 'back'),
(12, '/images/medal.webp', 'front');

-- ------------------------------ Milestones ------------------------------- --
INSERT INTO milestones (blader_id, title, happened_on, description) VALUES
(1, 'Joined RBX', '2025-01-20', 'Signed as a founding attack-type blader.'),
(1, 'First Podium', '2025-02-15', 'Bronze at the RBX Season Opener.'),
(1, 'First Tournament Victory', '2025-03-08', 'Won RBX S1 Regular #1.'),
(1, 'Named Team Captain', '2025-06-21', 'Led RBX to the S1 Grand Final title.'),
(2, 'Joined RBX', '2025-02-01', 'Joined the core roster as an attack specialist.'),
(2, 'First Tournament Victory', '2025-02-15', 'Won the RBX Season Opener on debut.'),
(2, 'International Swiss Medal', '2025-05-31', 'Medaled at the Beyblade X International Swiss.');

-- ------------------------------- Gallery --------------------------------- --
INSERT INTO gallery_items (title, image_url, category) VALUES
('S1 Grand Final Arena', '/images/hero.webp', 'battle'),
('Team Banner Reveal', '/images/team-banner.webp', 'team'),
('CMX Podium Celebration', '/images/blader-cmx.webp', 'podium'),
('Shadow SF Spotlight', '/images/blader-shadow.webp', 'portrait'),
('Medal Vault', '/images/medal.webp', 'medals');

-- ----------------------------- Admin user -------------------------------- --
-- Login: admin@rbx.gg  /  RBX@Admin2026
INSERT INTO admin_users (email, name, password_hash) VALUES
('admin@rbx.gg', 'RBX Admin', 'a0e0432da821e52777fb91e273cf647c:fe24ee21e411dfbd8b9d8d27f87000b367aa7d6aa51ae3e6deb53cc2d880be67f9599e4542c0cb3a0a2aee9ea2a6990813602dbd7bc21a2c4ace2388bf8ef519');

COMMIT;
