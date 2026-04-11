import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CursorDot from "@/components/CursorDot";

const didot = localFont({
  src: [
    { path: "../public/Didot.woff2", weight: "400", style: "normal" },
    { path: "../public/Didot Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/Didot Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-didot",
  display: "swap",
});

const didotTitle = localFont({
  src: "../public/Didot Title.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-didot-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evrlink — Luxury Ownership Infrastructure",
  description:
    "Evrlink is the infrastructure that connects luxury brands to the lifetime value of their products. Digital ownership passports powered by invisible microchips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${didot.variable} ${didotTitle.variable}`}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <CursorDot />
        {children}
      </body>
    </html>
  );
}
