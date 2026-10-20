// =========================================================================
// INVICTUS MERCH COMBOS & BUNDLE TEMPLATES
// Definitive Curated Packs:
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
  category: "APPAREL" | "VESSEL" | "EQUIPMENT" | "INSTRUMENT";
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
    badge: "LAB & STUDY ESSENTIALS",
    price: 349,
    originalPrice: 397,
    savings: "SAVE ₹48",
    tagline: "Hardcover Developer Notepad + Executive Metal Pen + Stealth Thermal Bottle.",
    description:
      "The clean, daily utility arsenal. Engineered for lectures, practicals, lab calculations, and all-day hydration.",
    includes: [
      "Hardcover Developer Notepad (Grid-lined)",
      "Executive Brass Rollerball Pen (Gold Accents)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
    ],
    hasApparel: false,
    products: [
      {
        id: "prod-notepad",
        name: "HARDCOVER DEV NOTEPAD",
        spec: "Grid-lined 100 GSM paper • Matte black vegan leather • Gold VTU logo",
        category: "EQUIPMENT",
        badge: "GRID-LINED // FOIL LOGO",
        image: "/merch/notepad-pen.jpg",
      },
      {
        id: "prod-pen",
        name: "EXECUTIVE BRASS ROLLERBALL PEN",
        spec: "Solid brass knurled body • 0.5mm tungsten carbide tip • Laser-engraved INVICTUS",
        category: "INSTRUMENT",
        badge: "KNURLED BRASS // 0.5MM",
        image: "/merch/pen-metal.jpg",
      },
      {
        id: "prod-bottle",
        name: "STEALTH THERMAL BOTTLE",
        spec: "500ml capacity • Double-wall vacuum insulation • 18/8 food-grade steel",
        category: "VESSEL",
        badge: "VACUUM INSULATED // 500ML",
        image: "/merch/bottle-199.jpeg",
      },
    ],
  },
  {
    id: "combo-student-pack",
    name: "STUDENT PACK",
    badge: "CAMPUS DAILY DRIVER",
    price: 599,
    originalPrice: 647,
    savings: "SAVE ₹48",
    tagline: "Heavyweight Dev Tee + Hardcover Developer Notepad + Executive Metal Pen.",
    description:
      "The core uniform of the modern student engineer. High GSM combed cotton combined with precision analog study tools.",
    includes: [
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Hardcover Developer Notepad (Grid-lined)",
      "Executive Brass Rollerball Pen (Gold Accents)",
    ],
    hasApparel: true,
    apparelType: "tee",
    products: [
      {
        id: "prod-tee",
        name: "HEAVYWEIGHT DEV TEE",
        spec: "240 GSM combed cotton • Pre-shrunk boxy cut • Metallic screenprint",
        category: "APPAREL",
        badge: "240 GSM // BOX CUT",
        image: "/merch/tshirt-399.jpeg",
      },
      {
        id: "prod-notepad",
        name: "HARDCOVER DEV NOTEPAD",
        spec: "Grid-lined 100 GSM paper • Matte black vegan leather • Gold VTU logo",
        category: "EQUIPMENT",
        badge: "GRID-LINED // FOIL LOGO",
        image: "/merch/notepad-pen.jpg",
      },
      {
        id: "prod-pen",
        name: "EXECUTIVE BRASS ROLLERBALL PEN",
        spec: "Solid brass knurled body • 0.5mm tungsten carbide tip • Laser-engraved INVICTUS",
        category: "INSTRUMENT",
        badge: "KNURLED BRASS // 0.5MM",
        image: "/merch/pen-metal.jpg",
      },
    ],
  },
  {
    id: "combo-premium-pack",
    name: "PREMIUM PACK",
    badge: "COLD-LAB SHIELD",
    price: 799,
    originalPrice: 898,
    savings: "SAVE ₹99",
    tagline: "Stealth Cyber Hoodie + Stealth Thermal Bottle.",
    description:
      "Designed for freezing AC computer labs and late-night campus hackathons. Heavy 400 GSM brushed fleece with all-night hot coffee.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
    ],
    hasApparel: true,
    apparelType: "hoodie",
    products: [
      {
        id: "prod-hoodie",
        name: "STEALTH CYBER HOODIE",
        spec: "400 GSM heavyweight brushed fleece • Double-layered hood • Gold metal aglets",
        category: "APPAREL",
        badge: "400 GSM // BRUSHED FLEECE",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-bottle",
        name: "STEALTH THERMAL BOTTLE",
        spec: "500ml capacity • Double-wall vacuum insulation • 18/8 food-grade steel",
        category: "VESSEL",
        badge: "VACUUM INSULATED // 500ML",
        image: "/merch/bottle-199.jpeg",
      },
    ],
  },
  {
    id: "combo-apparel-pack",
    name: "APPAREL PACK",
    badge: "WARDROBE DUO // POPULAR",
    price: 999,
    originalPrice: 1148,
    savings: "SAVE ₹149",
    tagline: "Stealth Cyber Hoodie + Heavyweight Dev Tee.",
    description:
      "The complete Invictus apparel lineup bundled together. Heavyweight thermal warmth plus breathable daily dev tee.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Heavyweight Fleece)",
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
    ],
    hasApparel: true,
    apparelType: "both",
    products: [
      {
        id: "prod-hoodie",
        name: "STEALTH CYBER HOODIE",
        spec: "400 GSM heavyweight brushed fleece • Double-layered hood • Gold metal aglets",
        category: "APPAREL",
        badge: "400 GSM // BRUSHED FLEECE",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-tee",
        name: "HEAVYWEIGHT DEV TEE",
        spec: "240 GSM combed cotton • Pre-shrunk boxy cut • Metallic screenprint",
        category: "APPAREL",
        badge: "240 GSM // BOX CUT",
        image: "/merch/tshirt-399.jpeg",
      },
    ],
  },
  {
    id: "combo-all-in-pack",
    name: "ALL-IN PACK",
    badge: "★ ULTIMATE COLLECTIVE VAULT",
    price: 1234,
    originalPrice: 1545,
    savings: "SAVE ₹311 (MAX VALUE)",
    isFeatured: true,
    tagline: "Hoodie + T-Shirt + Hardcover Notepad + Metal Pen + Thermal Bottle.",
    description:
      "The definitive collection. Every single official merchandise artifact engineered by the Invictus Tech Collective, packed into one supreme vault bundle at the greatest discount.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
      "Hardcover Developer Notepad (Grid-lined)",
      "Executive Brass Rollerball Pen (Gold Accents)",
    ],
    hasApparel: true,
    apparelType: "both",
    products: [
      {
        id: "prod-all-vault",
        name: "COMPLETE VAULT OVERVIEW",
        spec: "Full 5-Piece Suite: Hoodie, Tee, Thermal Bottle, Hardcover Notebook, and Executive Pen",
        category: "EQUIPMENT",
        badge: "5-PIECE VAULT OVERVIEW",
        image: "/merch/all-in-pack.jpg",
      },
      {
        id: "prod-hoodie",
        name: "STEALTH CYBER HOODIE",
        spec: "400 GSM heavyweight brushed fleece • Double-layered hood • Gold metal aglets",
        category: "APPAREL",
        badge: "400 GSM // BRUSHED FLEECE",
        image: "/merch/hoodie-699.jpeg",
      },
      {
        id: "prod-tee",
        name: "HEAVYWEIGHT DEV TEE",
        spec: "240 GSM combed cotton • Pre-shrunk boxy cut • Metallic screenprint",
        category: "APPAREL",
        badge: "240 GSM // BOX CUT",
        image: "/merch/tshirt-399.jpeg",
      },
      {
        id: "prod-bottle",
        name: "STEALTH THERMAL BOTTLE",
        spec: "500ml capacity • Double-wall vacuum insulation • 18/8 food-grade steel",
        category: "VESSEL",
        badge: "VACUUM INSULATED // 500ML",
        image: "/merch/bottle-199.jpeg",
      },
      {
        id: "prod-notepad",
        name: "HARDCOVER DEV NOTEPAD",
        spec: "Grid-lined 100 GSM paper • Matte black vegan leather • Gold VTU logo",
        category: "EQUIPMENT",
        badge: "GRID-LINED // FOIL LOGO",
        image: "/merch/notepad-pen.jpg",
      },
      {
        id: "prod-pen",
        name: "EXECUTIVE BRASS ROLLERBALL PEN",
        spec: "Solid brass knurled body • 0.5mm tungsten carbide tip • Laser-engraved INVICTUS",
        category: "INSTRUMENT",
        badge: "KNURLED BRASS // 0.5MM",
        image: "/merch/pen-metal.jpg",
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
    name: `COMBO: ${combo.name}`,
    price: combo.price,
    image: combo.isFeatured ? "/merch/all-in-pack.jpg" : combo.products[0]?.image || "/merch/all-in-pack.jpg",
    secondaryImage: combo.products[1]?.image,
    isCombo: true,
    tagline: combo.tagline,
    description: combo.description,
    sizes: combo.hasApparel ? ["S", "M", "L", "XL", "2XL"] : undefined,
  };
}
