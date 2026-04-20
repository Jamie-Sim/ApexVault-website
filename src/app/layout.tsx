import type { Metadata } from "next";
import { Bokor, Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";

const bokor = Bokor({
  variable: "--font-bokor",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Vault — The Drive Society",
  description:
    "Glasgow-based private car club. Curated analog-era performance cars. Founding memberships open — limited spots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bokor.variable} ${cormorant.variable} ${dmSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
