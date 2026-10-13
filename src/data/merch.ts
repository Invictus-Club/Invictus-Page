export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  sizes?: string[];
  isCombo?: boolean;
  isMembership?: boolean;
  usdPrice?: number;
  category?: string;
  tagline?: string;
  description?: string;
}

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: "invictus-hoodie",
    name: "STEALTH CYBER HOODIE",
    price: 699,
    image: "/merch/hoodie-699.jpeg",
    secondaryImage: "/merch/Invictus Black Hoodie Front and Back.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "invictus-tshirt",
    name: "HEAVYWEIGHT DEV TEE",
    price: 399,
    image: "/merch/tshirt-399.jpeg",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "invictus-totebag",
    name: "HEAVY CANVAS TOTEBAG",
    price: 99,
    image: "/merch/totebag-99.jpeg",
  },
  {
    id: "invictus-bottle",
    name: "STEALTH THERMAL FLASK",
    price: 199,
    image: "/merch/bottle-199.jpeg",
  },
  {
    id: "membership-pack",
    name: "CLUB MEMBERSHIP (ID CARD + LANYARD + TOTEBAG + PEN)",
    price: 200,
    image: "/merch/lanyard-membership.png",
    secondaryImage: "/merch/totebag-99.jpeg",
    isMembership: true,
  },
  {
    id: "complete-combo",
    name: "COMPLETE COMBO (EVERYTHING INCLUDED)",
    price: 1111,
    image: "/merch/hoodie-699.jpeg",
    secondaryImage: "/merch/tshirt-399.jpeg",
    sizes: ["S", "M", "L", "XL", "2XL"],
    isCombo: true,
  },
];

export const ADDON_ITEMS: MerchItem[] = [];
