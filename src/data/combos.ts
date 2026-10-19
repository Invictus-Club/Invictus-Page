// =========================================================================
// INVICTUS MERCH COMBOS & BUNDLE TEMPLATES
// You can easily edit any combo name, price, badge, or included items by hand!
// Note: Totebag, ID Card, and Lanyard are covered in the compulsory ₹200 membership.
// Standalone reference: Hoodie ₹699, Dev Tee ₹449, Thermal Bottle ₹199, Notepad ₹99.
// =========================================================================

import { MerchItem } from "./merch";

export interface MerchComboTemplate {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  price: number;
  originalPrice?: number;
  savings?: string;
  description: string;
  includes: string[];
  isFeatured?: boolean;
}

export const MERCH_COMBOS: MerchComboTemplate[] = [
  {
    id: "combo-starter-gear",
    name: "DEV TEE & NOTEPAD PACK",
    badge: "STARTER DEV GEAR",
    price: 499,
    originalPrice: 548,
    savings: "SAVE ₹49",
    tagline: "Heavyweight 240 GSM dev tee + grid-lined hardcover notepad.",
    description: "The clean coding essentials for daily classes and system design.",
    includes: [
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Hardcover Developer Notepad (Grid-lined)",
      "Exclusive Invictus Holographic Decals",
    ],
  },
  {
    id: "combo-campus-daily",
    name: "CAMPUS DAILY DUO",
    badge: "EVERYDAY ESSENTIALS",
    price: 599,
    originalPrice: 648,
    savings: "SAVE ₹49",
    tagline: "Heavyweight dev tee + vacuum insulated thermal bottle.",
    description: "Stay hydrated and comfortable through lecture marathons and lab practicals.",
    includes: [
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
      "Exclusive Invictus Holographic Decals",
    ],
  },
  {
    id: "combo-cyber-stealth",
    name: "CYBER STEALTH HOODIE PACK",
    badge: "COLD-LAB ESSENTIAL",
    price: 749,
    originalPrice: 798,
    savings: "SAVE ₹49",
    tagline: "400 GSM Cyber Fleece hoodie + grid-lined developer notepad.",
    description: "Engineered for chilly air-conditioned computer labs and overnight hackathons.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Hardcover Developer Notepad (Grid-lined)",
      "Exclusive Invictus Holographic Decals",
    ],
  },
  {
    id: "combo-winter-coder",
    name: "WINTER CODER COMBO",
    badge: "LATE-NIGHT SPECIAL",
    price: 829,
    originalPrice: 898,
    savings: "SAVE ₹69",
    tagline: "400 GSM cyber hoodie + 500ml vacuum insulated thermal bottle.",
    description: "Keep warm and keep coffee piping hot during marathon debugging sessions.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
      "Exclusive Invictus Holographic Decals",
    ],
  },
  {
    id: "combo-apparel-duo",
    name: "FULL WARDROBE APPAREL PACK",
    badge: "MOST POPULAR",
    price: 999,
    originalPrice: 1148,
    savings: "SAVE ₹149",
    tagline: "Official cyber hoodie and heavyweight dev tee bundled together.",
    description: "Both club apparel staples crafted with heavyweight premium fabric.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Heavyweight Fleece)",
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Exclusive Invictus Holographic Decals Pack",
    ],
  },
  {
    id: "combo-elite-all-in-one",
    name: "COMPLETE TECH COLLECTIVE VAULT",
    badge: "★ BEST VALUE // ALL-IN-ONE",
    price: 1199,
    originalPrice: 1446,
    savings: "SAVE ₹247",
    isFeatured: true, // Displayed in luxury champagne gold gloss
    tagline: "Every piece of Invictus merch: hoodie, tee, thermal bottle, and notepad.",
    description: "All four club apparel and gear items bundled at the absolute maximum discount rate.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Stealth Thermal Bottle (500ml Vacuum Insulated)",
      "Hardcover Developer Notepad (Grid-lined)",
      "Exclusive Invictus Holographic Decals Pack",
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
    image: combo.isFeatured ? "/merch/hoodie-699.jpeg" : "/merch/tshirt-399.jpeg",
    secondaryImage: "/merch/bottle-199.jpeg",
    isCombo: true,
    tagline: combo.tagline,
    description: combo.description,
    sizes: ["S", "M", "L", "XL", "2XL"],
  };
}
