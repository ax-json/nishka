import type { Metadata } from "next";
import { Caveat, DM_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Project Nishka — Credit should see more than a credit score",
    template: "%s · Project Nishka",
  },
  description:
    "Project Nishka explores how alternative data can help make formal credit more accessible to underserved women entrepreneurs in India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fontVars = [newsreader.variable, dmSans.variable, plexMono.variable, caveat.variable].join(" ");

  return (
    <html lang="en" id="top" className={`${fontVars} h-full`}>
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
