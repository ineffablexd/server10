import type { Metadata } from "next";
import { Inter, Dancing_Script, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Valentine Link Creator",
  description: "Create a special link for your loved one",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${dancingScript.variable}
          ${pacifico.variable}
          bg-pink-50
          text-slate-800
        `}
      >
        {children}
      </body>
    </html>
  );
}
