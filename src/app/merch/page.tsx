import type { Metadata } from "next";
import MerchPortalClient from "./MerchPortalClient";

export const metadata: Metadata = {
  title: "Invictus Armory | Official Club Merch & Induction Portal",
  description:
    "Official Invictus Tech Guild merchandise store & club induction portal. Club membership pack (ID card, cool lanyard, totebag, pen) at ₹200, cyber hoodies (₹699), heavyweight dev tees (₹399), thermal flasks (₹199), canvas totebags (₹99), and the complete combo at ₹1,111.",
  keywords: [
    "Invictus Merch",
    "Invictus Club",
    "Tech Guild Merchandise",
    "VTU Tech Club",
    "Club Membership",
    "Cool Lanyard",
    "Dev Tee",
    "Cyber Hoodie",
  ],
  openGraph: {
    title: "Invictus Armory | Official Club Merch & Induction Portal",
    description:
      "Official Invictus Tech Guild merchandise store & club induction portal. Unlock your induction kit and explore premium developer apparel.",
    type: "website",
    images: [
      {
        url: "/merch/invictus-hoodie.png",
        width: 1200,
        height: 630,
        alt: "Invictus Stealth Cyber Hoodie",
      },
    ],
  },
};

export default function MerchPage() {
  return <MerchPortalClient />;
}
