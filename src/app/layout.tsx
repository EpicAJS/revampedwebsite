import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import { PlayerProvider } from "@/lib/player";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Player from "@/components/Player";
import MobileNav from "@/components/MobileNav";
import { getAllPostSlugs } from "@/lib/posts";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abhijaysalvi.com"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    url: "https://abhijaysalvi.com",
    siteName: profile.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The Blog entry only exists in the library once there's something to read.
  const hasPosts = getAllPostSlugs().length > 0;

  return (
    <html lang="en" className={figtree.variable}>
      <body className="h-full">
        <PlayerProvider>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1 min-h-0 gap-0 md:gap-2 md:p-2 md:pb-0">
              <Sidebar hasPosts={hasPosts} />
              <div
                id="main-scroll"
                className="scroll-area flex-1 min-w-0 overflow-y-auto rounded-none md:rounded-lg bg-bg"
              >
                <TopBar />
                <main className="pb-16">{children}</main>
              </div>
            </div>
            <Player />
            <MobileNav />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
