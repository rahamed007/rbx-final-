"use server";

import { db } from "@/db";
import { joinApplications } from "@/db/schema";

export type JoinState = { ok: boolean; message?: string; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitApplication(_prev: JoinState, formData: FormData): Promise<JoinState> {
  // --- Anti-spam: honeypot (hidden field bots love to fill) ---
  if (formData.get("company")) {
    return { ok: true, message: "Application received!" }; // silently drop bots
  }

  // --- Anti-spam: time trap (humans take >3s to fill a form) ---
  const loadedAt = Number(formData.get("loadedAt") || 0);
  if (loadedAt && Date.now() - loadedAt < 3000) {
    return { ok: false, error: "Submission too fast — please try again." };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const experience = String(formData.get("experience") || "").trim();
  const mainCombo = String(formData.get("mainCombo") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 10) return { ok: false, error: "Tell us a bit more (at least 10 characters)." };

  try {
    await db.insert(joinApplications).values({
      name: name.slice(0, 160),
      email: email.slice(0, 180),
      phone: phone.slice(0, 60) || null,
      city: city.slice(0, 120) || null,
      experience: experience.slice(0, 120) || null,
      mainCombo: mainCombo.slice(0, 500) || null,
      message: message.slice(0, 2000),
    });
    return { ok: true, message: "Welcome to the arena! Your application is in." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again later." };
  }
}
