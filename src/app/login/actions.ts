"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";

export type LoginState = { ok: boolean; error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { ok: false, error: "Enter your email and password." };

  const ok = await login(email, password);
  if (!ok) return { ok: false, error: "Invalid email or password." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/login");
}
