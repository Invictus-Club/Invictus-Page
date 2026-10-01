import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invictus Club | Elite Developer Hub",
  description: "Join a community of elite developers, architects, and innovators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#05070f] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
