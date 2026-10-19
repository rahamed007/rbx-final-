"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export type ContactState = { ok: boolean; message?: string; error?: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (formData.get("company")) return { ok: true, message: "Message sent!" };

  const loadedAt = Number(formData.get("loadedAt") || 0);
  if (loadedAt && Date.now() - loadedAt < 2500) {
    return { ok: false, error: "Submission too fast — please try again." };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 5) return { ok: false, error: "Please enter a message." };

  try {
    await db.insert(contactMessages).values({
      name: name.slice(0, 160),
      email: email.slice(0, 180),
      subject: subject.slice(0, 200) || null,
      message: message.slice(0, 2000),
    });
    return { ok: true, message: "Message received — we'll get back to you soon!" };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again later." };
  }
}
