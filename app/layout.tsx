import type { Metadata } from "next";
import { Great_Vibes, Pacifico, Poppins } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be Mine - Valentine's Day 2026 💕",
  description: "A charming Valentine's Day proposal by Novyrix",
  authors: [{ name: "Novyrix" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${pacifico.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
