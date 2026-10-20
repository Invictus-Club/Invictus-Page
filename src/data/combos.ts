// =========================================================================
// INVICTUS MERCH COMBOS & BUNDLES
// 1. Essential Pack (Notepad + Pen + Bottle) — ₹349
// 2. Student Pack (T-Shirt + Notepad + Pen) — ₹599
// 3. Premium Pack (Hoodie + Bottle) — ₹799
// 4. Apparel Pack (Hoodie + T-Shirt) — ₹999
// 5. All-in Pack (Hoodie + T-Shirt + Notepad + Pen + Bottle) — ₹1234
// =========================================================================

import { MerchItem } from "./merch";

export interface ComboProductItem {
  id: string;
  name: string;
  spec: string;
  category: string;
  badge: string;
  image: string;
}

export interface MerchComboTemplate {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  price: number;
  originalPrice: number;
  savings: string;
  description: string;
  includes: string[];
  products: ComboProductItem[];
  hasApparel?: boolean;
  apparelType?: "tee" | "hoodie" | "both";
  isFeatured?: boolean;
}

export const MERCH_COMBOS: MerchComboTemplate[] = [
  {
    id: "combo-essential-pack",
    name: "ESSENTIAL PACK",
    badge: "ESSENTIALS",
    price: 349,
    originalPrice: 397,
    savings: "SAVE ₹48",
    tagline: "Notepad, Pen, and Thermal Bottle",
    description: "Daily essentials for lectures, labs, and hydration.",
    includes: [
      "Hardcover Developer Notepad",
      "Executive Brass Pen",
      "Stealth Thermal Bottle 500ml",
    ],
    hasApparel: false,
    products: [
      {
        id: "prod-notepad",
        name: "Hardcover Dev Notepad",
        spec: "Grid-lined paper with embossed foil logo",
        category: "Stationery",
        badge: "Grid-Lined",
        image: "/merch/notepad-pen.jpg",
      },
      {
        id: "prod-bottle",
        name: "Stealth Thermal Bottle",
        spec: "500ml double-wall vacuum insulated steel",
        category: "Drinkware",
        badge: "Vacuum Flask",
        image: "/merch/bottle-199.jpeg",
      },
    ],
  },
  {
    id: "combo-student-pack",
    name: "STUDENT PACK",
    badge: "STUDENT",
    price: 599,
    originalPrice: 647,
    savings: "SAVE ₹48",
    tagline: "Dev Tee, Notepad, and Pen",
    description: "Heavyweight combed cotton tee with essential study tools.",
    includes: [
      "Heavyweight Dev Tee 240 GSM",
      "Hardcover Developer Notepad",
      "Executive Brass Pen",
    ],
    hasApparel: true,
    apparelType: "tee",
    products: [
      {
        id: "prod-tee",
        name: "Heavyweight Dev Tee",
        spec: "240 GSM combed cotton boxy cut",
        category: "Apparel",
        badge: "240 GSM Cotton",
        image: "/merch/tshirt-399.jpeg",
      },
      {
        id: "prod-notepad",
        name: "Hardcover Dev Notepad",
        spec: "Grid-lined paper with embossed foil logo",
        category: "Stationery",
        badge: "Grid-Lined",
        image: "/merch/notepad-pen.jpg",
      },
    ],
  },
  {
    id: "combo-premium-pack",
    name: "PREMIUM PACK",
    badge: "COLD-LAB",
    price: 799,
    originalPrice: 898,
    savings: "SAVE ₹99",
    tagline: "Cyber Hoodie and Thermal Bottle",
    description: "Heavy 400 GSM brushed fleece with insulated thermal flask.",
    includes: [
      "Stealth Cyber Hoodie 400 GSM",
      "Stealth Thermal Bottle 500ml",
    ],
    hasApparel: true,
    apparelType: "hoodie",
    products: [
      {
        id: "prod-hoodie",
        name: "Stealth Cyber Hoodie",
        spec: "400 GSM brushed fleece with metallic aglets",
        category: "Apparel",
        badge: "400 GSM Fleece",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-bottle",
        name: "Stealth Thermal Bottle",
        spec: "500ml double-wall vacuum insulated steel",
        category: "Drinkware",
        badge: "Vacuum Flask",
        image: "/merch/bottle-199.jpeg",
      },
    ],
  },
  {
    id: "combo-apparel-pack",
    name: "APPAREL PACK",
    badge: "APPAREL",
    price: 999,
    originalPrice: 1148,
    savings: "SAVE ₹149",
    tagline: "Cyber Hoodie and Dev Tee",
    description: "Both heavyweight club apparel pieces bundled together.",
    includes: [
      "Stealth Cyber Hoodie 400 GSM",
      "Heavyweight Dev Tee 240 GSM",
    ],
    hasApparel: true,
    apparelType: "both",
    products: [
      {
        id: "prod-hoodie",
        name: "Stealth Cyber Hoodie",
        spec: "400 GSM brushed fleece with metallic aglets",
        category: "Apparel",
        badge: "400 GSM Fleece",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-tee",
        name: "Heavyweight Dev Tee",
        spec: "240 GSM combed cotton boxy cut",
        category: "Apparel",
        badge: "240 GSM Cotton",
        image: "/merch/tshirt-399.jpeg",
      },
    ],
  },
  {
    id: "combo-all-in-pack",
    name: "ALL-IN PACK",
    badge: "VAULT",
    price: 1234,
    originalPrice: 1545,
    savings: "SAVE ₹311",
    isFeatured: true,
    tagline: "Hoodie, Tee, Bottle, Notepad, and Pen",
    description: "The complete 5-piece merchandise collection.",
    includes: [
      "Stealth Cyber Hoodie 400 GSM",
      "Heavyweight Dev Tee 240 GSM",
      "Stealth Thermal Bottle 500ml",
      "Hardcover Developer Notepad",
      "Executive Brass Pen",
    ],
    hasApparel: true,
    apparelType: "both",
    products: [
      {
        id: "prod-all-vault",
        name: "All-In Pack Overview",
        spec: "Complete 5-piece collection",
        category: "Collection",
        badge: "Full Collection",
        image: "/merch/all-in-pack.jpg",
      },
      {
        id: "prod-hoodie",
        name: "Stealth Cyber Hoodie",
        spec: "400 GSM brushed fleece with metallic aglets",
        category: "Apparel",
        badge: "400 GSM Fleece",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-tee",
        name: "Heavyweight Dev Tee",
        spec: "240 GSM combed cotton boxy cut",
        category: "Apparel",
        badge: "240 GSM Cotton",
        image: "/merch/tshirt-399.jpeg",
      },
      {
        id: "prod-bottle",
        name: "Stealth Thermal Bottle",
        spec: "500ml double-wall vacuum insulated steel",
        category: "Drinkware",
        badge: "Vacuum Flask",
        image: "/merch/bottle-199.jpeg",
      },
      {
        id: "prod-notepad",
        name: "Hardcover Dev Notepad",
        spec: "Grid-lined paper with embossed foil logo",
        category: "Stationery",
        badge: "Grid-Lined",
        image: "/merch/notepad-pen.jpg",
      },
    ],
  },
];

/**
 * Converts a combo template into a MerchItem object compatible with the cart.
 */
export function comboToMerchItem(combo: MerchComboTemplate): MerchItem {
  return {
    id: combo.id,
    name: combo.name,
    price: combo.price,
    image: combo.isFeatured ? "/merch/all-in-pack.jpg" : combo.products[0]?.image || "/merch/all-in-pack.jpg",
    secondaryImage: combo.products[1]?.image,
    isCombo: true,
    tagline: combo.tagline,
    description: combo.description,
    sizes: combo.hasApparel ? ["S", "M", "L", "XL", "2XL"] : undefined,
  };
}
