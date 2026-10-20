"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MERCH_COMBOS, MerchComboTemplate, comboToMerchItem } from "@/data/combos";
import { MERCH_ITEMS } from "@/data/merch";
import { ScrollComboPackStage } from "@/components/merch/ScrollComboPackStage";
import { MerchCartDrawer } from "@/components/merch/MerchCartDrawer";
import { CartItem } from "@/components/merch/SimpleCheckoutTerminal";
import { playCartSound, playCyberBeep } from "@/lib/merch-audio";

export default function CombosClient() {
  const router = useRouter();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    MERCH_COMBOS.forEach((combo) => {
      initial[combo.id] = "L";
    });
    return initial;
  });

  const [activePackId, setActivePackId] = useState<string>(MERCH_COMBOS[0].id);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const membershipItem = MERCH_ITEMS.find((i) => i.isMembership) || MERCH_ITEMS[4];
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: `${membershipItem.id}-std`,
      item: membershipItem,
      quantity: 1,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      for (const combo of MERCH_COMBOS) {
        const el = document.getElementById(`pack-${combo.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActivePackId(combo.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSizeChange = (comboId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [comboId]: size }));
  };

  const handleAddToCart = (combo: MerchComboTemplate, size?: string) => {
    const comboMerchItem = comboToMerchItem(combo);
    const cartItemId = `${combo.id}-${size || "std"}`;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartItemId);
      if (existing) {
        return prev.map((c) =>
          c.id === cartItemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item: comboMerchItem,
          quantity: 1,
          size,
        },
      ];
    });
  };

  const handleCheckout = (combo: MerchComboTemplate, size?: string) => {
    playCartSound();
    playCyberBeep(880, 0.15);
    const apparelSize = size || selectedSizes[combo.id] || "L";
    router.push(`/merch?combo=${combo.id}&size=${apparelSize}#checkout-section`);
  };

  const scrollToPack = (packId: string) => {
    playCyberBeep(650, 0.04);
    const target = document.getElementById(`pack-${packId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const nextQty = c.quantity + delta;
            if (c.item.isMembership) {
              return { ...c, quantity: Math.max(1, nextQty) };
            }
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id || c.item.isMembership));
  };

  const handleClearCart = () => {
    setCart([
      {
        id: `${membershipItem.id}-std`,
        item: membershipItem,
        quantity: 1,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD60A] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/merch"
              className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 hover:text-[#FFD60A] transition-colors flex items-center gap-2 cursor-pointer"
            >
              ← Back to Merch Store
            </Link>

            <span className="hidden sm:inline text-zinc-800">|</span>

            <span className="hidden sm:inline text-xs sm:text-sm font-black font-mono tracking-tighter uppercase text-white">
              INVICTUS <span className="text-[#FFD60A]">COMBOS</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase cursor-pointer"
            >
              Bag ({totalCartCount}) — ₹{totalCartPrice}
            </button>

            <Link
              href="/merch#checkout-section"
              className="px-3 sm:px-4 py-2 rounded-xl btn-metallic-titanium font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer"
            >
              Checkout →
            </Link>
          </div>
        </div>

        {/* Clean Sticky Jump Bar (No brackets) */}
        <div className="w-full bg-[#0a0b0e]/95 backdrop-blur-md border-t border-white/5 py-2 px-4 overflow-x-auto hide-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 min-w-max">
            {MERCH_COMBOS.map((combo, idx) => {
              const isActive = activePackId === combo.id;
              return (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => scrollToPack(combo.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#FFD60A] text-black shadow-md"
                      : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  0{idx + 1}. {combo.name} — ₹{combo.price}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Clean, Decluttered Hero Section */}
      <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-8 text-center space-y-3">
        <div className="inline-block px-3 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30 text-[#FFD60A] font-mono text-xs font-bold uppercase tracking-widest">
          Curated Bundles
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
          CURATED <span className="text-[#FFD60A]">GEAR PACKS</span>
        </h1>

        <p className="max-w-xl mx-auto text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
          5 official club bundles with standalone savings. Compulsory ₹200 membership covers ID card, lanyard, totebag, and pen.
        </p>
      </section>

      {/* SCROLL-BASED STAGES FOR THE 5 PACKS */}
      <main className="relative z-10 w-full">
        {MERCH_COMBOS.map((combo, index) => (
          <ScrollComboPackStage
            key={combo.id}
            combo={combo}
            index={index}
            total={MERCH_COMBOS.length}
            selectedSize={selectedSizes[combo.id] || "L"}
            onSizeChange={handleSizeChange}
            onAddToCart={handleAddToCart}
            onCheckout={handleCheckout}
          />
        ))}
      </main>

      {/* CLEAN SUMMARY SECTION AT THE END */}
      <section className="relative z-10 py-16 px-4 sm:px-8 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              DISPATCH <span className="text-[#FFD60A]">YOUR PACK</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
              Direct WhatsApp order dispatch with instant confirmation.
            </p>
          </div>

          {/* Clean Pack Summary Table (No brackets) */}
          <div className="relative overflow-hidden rounded-3xl card-metallic-titanium p-6 sm:p-8 text-left">
            <div className="divide-y divide-white/10 font-mono text-xs">
              {MERCH_COMBOS.map((c, i) => (
                <div
                  key={c.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFD60A] font-bold">0{i + 1}.</span>
                      <span className="font-black text-white text-sm uppercase">{c.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                        {c.savings}
                      </span>
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {c.includes.join(" + ")}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-[#FFD60A]">₹{c.price}</div>
                      <div className="text-xs text-zinc-500 line-through">₹{c.originalPrice}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCheckout(c)}
                      className="px-4 py-2.5 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase cursor-pointer"
                    >
                      Select Pack →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/merch#checkout-section"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase tracking-widest text-center cursor-pointer"
            >
              Go to Checkout →
            </Link>

            <Link
              href="/merch"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-metallic-titanium font-mono font-bold text-xs uppercase tracking-widest text-center cursor-pointer"
            >
              ← Standalone Merch
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="relative z-10 py-10 px-4 sm:px-8 bg-black border-t border-zinc-900 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white font-bold">
            INVICTUS CLUB • MERCH GEAR PACKS
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/merch" className="hover:text-white transition-colors">Merch</Link>
            <Link href="/wins" className="hover:text-[#FFD60A] transition-colors">Hall of Fame</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[#FFD60A] hover:underline cursor-pointer"
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <MerchCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          router.push("/merch#checkout-section");
        }}
      />
    </div>
  );
}
