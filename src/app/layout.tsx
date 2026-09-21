import type { Metadata } from "next";
import { Rajdhani, Barlow } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Nav from "@/components/Nav";

const rajdhani = Rajdhani({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — Performance Edition`,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
