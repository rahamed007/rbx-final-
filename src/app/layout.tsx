import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "RBX Bangladesh — Elite Beyblade X Team",
    template: "%s · RBX Bangladesh",
  },
  description:
    "Royal Bengal X — Bangladesh's elite competitive Beyblade X team. Meet the bladers, explore the medal vault, and spin with power.",
  keywords: ["Beyblade X", "RBX Bangladesh", "Beyblade", "competitive blading", "Royal Bengal X"],
  openGraph: {
    title: "RBX Bangladesh — Elite Beyblade X Team",
    description: "Spin with power. Battle with honor.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-rbx-black text-zinc-200 antialiased">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <SmoothScroll>
          <Preloader />
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
