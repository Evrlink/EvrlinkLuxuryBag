import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamara — Luxury Ownership Passports",
  description:
    "Tamara creates digital ownership passports for luxury goods, protecting authenticity through invisible microchips linked to digital certificates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
