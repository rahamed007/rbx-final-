import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import AdminShell from "./AdminShell";

export const metadata = {
  title: { default: "Admin", template: "%s · RBX Admin" },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = await getSessionEmail();
  if (!email) redirect("/login");
  return <AdminShell email={email}>{children}</AdminShell>;
}
