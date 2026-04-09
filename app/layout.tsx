import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
    <html lang="en" className={cormorant.variable}>
      <body style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
