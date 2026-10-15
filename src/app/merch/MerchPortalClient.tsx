"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MERCH_ITEMS, MerchItem } from "@/data/merch";
import { ScrollSequenceCanvas } from "@/components/merch/ScrollSequenceCanvas";
import { ScrollStageItem } from "@/components/merch/ScrollStageItem";
import { SimpleCheckoutTerminal, CartItem } from "@/components/merch/SimpleCheckoutTerminal";
import { MerchCartDrawer } from "@/components/merch/MerchCartDrawer";
import {
  playCyberBeep,
  playCartSound,
  setAudioEnabled,
  getAudioEnabled,
} from "@/lib/merch-audio";

export default function MerchPortalClient() {
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const membershipItem = MERCH_ITEMS.find((i) => i.isMembership) || MERCH_ITEMS[4];
  const completeCombo = MERCH_ITEMS.find((i) => i.isCombo) || MERCH_ITEMS[5];

  // Cart state: Membership is default, rest are add-ons
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: `${membershipItem.id}-std`,
      item: membershipItem,
      quantity: 1,
    },
  ]);

  useEffect(() => {
    setAudioEnabled(true);
    setAudioActive(getAudioEnabled());

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !audioActive;
    setAudioActive(next);
    setAudioEnabled(next);
    if (next) {
      playCyberBeep(700, 0.1);
    }
  };

  const handleAddToCart = (item: MerchItem, size?: string) => {
    const cartItemId = `${item.id}-${size || "std"}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartItemId);
      if (existing) {
        return prev.map((c) =>
          c.id === cartItemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: cartItemId, item, quantity: 1, size }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddMembership = () => {
    playCartSound();
    handleAddToCart(membershipItem);
  };

  const handleAddCompleteCombo = () => {
    playCartSound();
    handleAddToCart(completeCombo, "L");
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const scrollToCheckout = () => {
    const target = document.getElementById("checkout-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white font-sans selection:bg-[#FFD60A] selection:text-black">
      {/* 342-Frame Full-Screen Background Scroll Sequence */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ScrollSequenceCanvas scrollProgress={scrollProgress} framesCount={342} />
      </div>

      {/* Top Persistent Header (Zero SVGs, Metallic Gloss Accents) */}
      <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 hover:text-[#FFD60A] transition-colors"
            >
              HOME
            </Link>

            <span className="text-zinc-800">|</span>

            <span className="text-sm sm:text-base font-black tracking-tighter uppercase font-mono">
              INVICTUS <span className="text-[#FFD60A]">MERCH</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Bag Pill (Classy Metallic Gold) */}
            <button
              type="button"
              onClick={() => {
                setCartDrawerOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase cursor-pointer"
            >
              BAG ({totalCartCount}) — ₹{totalCartPrice}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN SCROLL SEQUENCE */}
      <main className="relative z-10">
        {/* Sequence Shot 1: Entrance Gate (Clean, uncluttered, spacious entrance - Classy Metallic Gloss Card) */}
        <section className="relative min-h-[135vh] w-full flex flex-col justify-end items-center px-4 pb-12 text-center bg-transparent pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center gap-4 pb-6">
            <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl card-metallic-titanium max-w-lg space-y-4">
              {/* Top Specular Chamfer Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
              {/* Anisotropic Light Sweep */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />

              <h1 className="relative z-10 text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                INVICTUS <span className="text-[#FFD60A]">MERCH</span>
              </h1>
              <div className="relative z-10 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.scrollBy({ top: window.innerHeight * 1.1, behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-2xl btn-metallic-gold font-mono font-black text-xs uppercase tracking-widest cursor-pointer"
                >
                  ENTER VAULT ↓
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sequence Shots 2 to 6: Wardrobe Showcase (Hoodie, Tshirt, Totebag, Bottle, Membership, Combo) */}
        {MERCH_ITEMS.map((item, idx) => (
          <ScrollStageItem
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            index={idx}
          />
        ))}

        {/* Sequence Shot 7: Transition Sequence (Gliding into Workstation - Pure background video, no AI clutter) */}
        <div className="relative min-h-[90vh] w-full pointer-events-none" />

        {/* Sequence Shot 8: Checkout & Exit Sequence -> Register via Google Form + WhatsApp Dispatch */}
        <SimpleCheckoutTerminal
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onAddMembership={handleAddMembership}
          onAddCompleteCombo={handleAddCompleteCombo}
        />
      </main>

      {/* Clean Footer (Zero SVGs, No Delivery Fee text) */}
      <footer className="relative z-10 py-10 px-4 sm:px-8 bg-black border-t border-zinc-800 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold">
            INVICTUS CLUB // OFFICIAL MERCH & INDUCTION PORTAL
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">[ HOME ]</Link>
            <Link href="/events" className="hover:text-white transition-colors">[ EVENTS ]</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[#FFD60A] hover:underline cursor-pointer"
            >
              [ TOP ↑ ]
            </button>
          </div>
        </div>
      </footer>

      {/* Cart Drawer (Zero SVGs) */}
      <MerchCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={scrollToCheckout}
      />
    </div>
  );
}
