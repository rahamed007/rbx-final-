"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import StadiumBackdrop from "./StadiumBackdrop";
import DbStatusBanner from "./DbStatusBanner";

/**
 * Switches chrome by route: public pages get the glassmorphic header, footer
 * and parallax stadium backdrop; /admin and /login are full-bleed canvases.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (bare) {
    return <div className="relative z-10 min-h-screen bg-rbx-black">{children}</div>;
  }

  return (
    <>
      <DbStatusBanner />
      <StadiumBackdrop />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
