import type { Metadata } from "next";
import CombosClient from "./CombosClient";

export const metadata: Metadata = {
  title: "Merch Combos & Bundles | Invictus Tech Collective",
  description:
    "Curated Invictus merchandise combo bundles and discounted developer apparel packs. Bundle membership, hoodies, dev tees, and thermal flasks.",
  keywords: [
    "Invictus Combos",
    "Merch Bundles",
    "Tech Club Merch",
    "Starter Dev Pack",
    "Cyber Stealth Pack",
    "Campus Daily Bundle",
  ],
};

export default function CombosPage() {
  return <CombosClient />;
}
