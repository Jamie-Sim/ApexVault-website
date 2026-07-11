import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/* Type system — Technor (display) / Supreme (body) / Fragment Mono
   (gauge text) / Zodiak italic (founder's voice) */
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

export const metadata: Metadata = {
  title: "Apex Vault — The Drive Society",
  description:
    "A Glasgow private car club. A members' fleet of analog-era performance cars, kept warm, insured and ready. Founding memberships open now.",
  openGraph: {
    title: "Apex Vault — The Drive Society",
    description:
      "A members' fleet of analog-era performance cars, kept warm, insured and ready. 30 founding places. Glasgow, launching June 2026.",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Vault — The Drive Society",
    description:
      "A members' fleet of analog-era performance cars, kept warm, insured and ready. 30 founding places.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${technor.variable} ${supreme.variable} ${zodiakItalic.variable} ${fragmentMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
