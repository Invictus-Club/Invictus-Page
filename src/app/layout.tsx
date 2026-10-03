import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://invictus-club.vercel.app"),
  title: {
    default: "Invictus Club | Elite Developer Hub",
    template: "%s | Invictus Club",
  },
  description: "Join a community of elite developers, architects, and innovators building high-performance systems and national hackathon solutions.",
  keywords: ["Invictus", "Developer Hub", "Hackathons", "Three.js", "Next.js", "Engineering", "VTU", "Tech Community"],
  authors: [{ name: "Invictus Club Leadership" }],
  openGraph: {
    title: "Invictus Club | Elite Developer Hub",
    description: "Join a community of elite developers, architects, and innovators building high-performance systems.",
    url: "https://invictus-club.vercel.app",
    siteName: "Invictus Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invictus Club | Elite Developer Hub",
    description: "Join a community of elite developers, architects, and innovators building high-performance systems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
