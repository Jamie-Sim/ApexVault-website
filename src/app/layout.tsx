import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Variable.woff2",
      style: "normal",
      weight: "200 700",
    },
  ],
  display: "swap",
  variable: "--font-clash",
});

const fontVariables = {
  "--font-bokor": cormorantGaramond.style.fontFamily,
  "--font-cormorant": cormorantGaramond.style.fontFamily,
  "--font-dm-sans": cormorantGaramond.style.fontFamily,
} as React.CSSProperties;

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
    <html lang="en" style={fontVariables} className={clashDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
