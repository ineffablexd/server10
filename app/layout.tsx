import type { Metadata } from "next";
import { Inter, Dancing_Script, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"] });
const pacifico = Pacifico({ weight: '400', subsets: ["latin"] });

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
      <body className={`${inter.className} bg-pink-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}