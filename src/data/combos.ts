// =========================================================================
// INVICTUS MERCH COMBOS & BUNDLE TEMPLATES
// You can easily edit any combo name, price, badge, or included items by hand!
// =========================================================================

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
    id: "combo-starter",
    name: "STARTER DEV PACK",
    badge: "MOST POPULAR",
    price: 549,
    originalPrice: 599,
    savings: "SAVE ₹50",
    tagline: "Club membership induction plus heavyweight dev tee.",
    description: "The ideal initiation bundle for freshmen and new club inductees.",
    includes: [
      "Official Club Membership (ID Card + Lanyard + Pen)",
      "Heavyweight Dev Tee (240 GSM Combed Cotton)",
      "Exclusive Invictus Holographic Decals",
      "Access to Members-Only WhatsApp Group",
    ],
  },
  {
    id: "combo-cyber-stealth",
    name: "CYBER STEALTH PACK",
    badge: "COLD-LAB ESSENTIAL",
    price: 849,
    originalPrice: 899,
    savings: "SAVE ₹50",
    tagline: "400 GSM Cyber Fleece hoodie + official membership kit.",
    description: "Engineered for overnight hackathons, chilly labs, and all-night coding sprints.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Brushed Fleece)",
      "Official Club Membership (ID Card + Lanyard + Pen)",
      "Heavy Canvas Totebag",
      "Exclusive Invictus Holographic Decals",
    ],
  },
  {
    id: "combo-campus-daily",
    name: "CAMPUS DAILY BUNDLE",
    badge: "EVERYDAY CARRY",
    price: 799,
    originalPrice: 897,
    savings: "SAVE ₹98",
    tagline: "Everything you need for a full day of engineering classes.",
    description: "Hot brew, comfortable developer tee, sturdy bag, and official membership credentials.",
    includes: [
      "Official Club Membership (ID Card + Lanyard + Pen)",
      "Heavyweight Dev Tee (Pre-shrunk)",
      "Stealth Thermal Flask (500ml Vacuum Insulated)",
      "Heavy Canvas Totebag",
    ],
  },
  {
    id: "combo-elite-all-in-one",
    name: "ELITE TECH COLLECTIVE (ALL-IN-ONE)",
    badge: "BEST VALUE // COMPLETE VAULT",
    price: 1111,
    originalPrice: 1596,
    savings: "SAVE ₹485",
    isFeatured: true, // Displayed in luxury champagne gold gloss
    tagline: "The entire Invictus merch collection in one complete box.",
    description: "Every single piece of apparel, gear, and membership privileges at our maximum discounted rate.",
    includes: [
      "Official Club Membership (ID Card + Cool Lanyard + Pen)",
      "Stealth Cyber Hoodie (400 GSM Heavyweight)",
      "Heavyweight Dev Tee (240 GSM)",
      "Stealth Thermal Flask (Vacuum Insulated)",
      "Heavy Canvas Totebag",
      "Exclusive Invictus Holographic Decals",
      "Priority Access to Club Hackathons & Competitions",
    ],
  },
  {
    id: "combo-winter-coder",
    name: "WINTER CODER PACK",
    badge: "LIMITED EDITION",
    price: 949,
    originalPrice: 1097,
    savings: "SAVE ₹148",
    tagline: "Cyber hoodie + vacuum insulated thermal flask combo.",
    description: "Keep warm and keep your coffee piping hot during long debugging sessions.",
    includes: [
      "Stealth Cyber Hoodie (400 GSM Heavyweight Fleece)",
      "Stealth Thermal Flask (500ml Vacuum Insulated)",
      "Official Club Lanyard & Membership ID",
    ],
  },
  {
    id: "combo-minimalist",
    name: "MINIMALIST ESSENTIALS",
    badge: "LIGHTWEIGHT",
    price: 449,
    originalPrice: 498,
    savings: "SAVE ₹49",
    tagline: "Clean everyday developer basics.",
    description: "The minimalist grab-and-go developer kit for clean, everyday campus wear.",
    includes: [
      "Heavyweight Dev Tee",
      "Heavy Canvas Totebag",
      "Official Club Pen & Lanyard",
    ],
  },
];
