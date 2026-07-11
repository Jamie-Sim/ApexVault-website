import type { Metadata } from "next";
import { Cormorant_Garamond, Fragment_Mono } from "next/font/google";
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

/* v2 type system — Technor (display) / Supreme (body) / Fragment Mono (gauge) / Zodiak italic (editorial accent) */
const technor = localFont({
  src: [
    {
      path: "../fonts/Technor-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-display",
});

const supreme = localFont({
  src: [
    {
      path: "../fonts/Supreme-Variable.woff2",
      style: "normal",
      weight: "100 800",
    },
    {
      path: "../fonts/Supreme-VariableItalic.woff2",
      style: "italic",
      weight: "100 800",
    },
  ],
  display: "swap",
  variable: "--font-body",
});

const zodiakItalic = localFont({
  src: [
    {
      path: "../fonts/Zodiak-VariableItalic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-editorial",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  style: ["normal"],
  display: "swap",
  variable: "--font-mono",
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
    <html
      lang="en"
      style={fontVariables}
      className={`${clashDisplay.variable} ${technor.variable} ${supreme.variable} ${zodiakItalic.variable} ${fragmentMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
