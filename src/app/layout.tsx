import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invictus Club | Elite Developer Hub",
  description: "Join a community of elite developers, architects, and innovators.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className={`${inter.className} bg-black text-slate-100 min-h-screen selection:bg-[#FFD60A] selection:text-black antialiased overflow-x-clip`}>
        {children}
      </body>
    </html>
  );
}
