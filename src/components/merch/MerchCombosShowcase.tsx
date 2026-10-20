"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MERCH_COMBOS, MerchComboTemplate } from "@/data/combos";
import { playCartSound, playCyberBeep } from "@/lib/merch-audio";

interface MerchCombosShowcaseProps {
  onAddToCart: (combo: MerchComboTemplate, size?: string) => void;
  onProceedToCheckout: () => void;
}

export function MerchCombosShowcase({
  onAddToCart,
  onProceedToCheckout,
}: MerchCombosShowcaseProps) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(4); // Default to All-in Pack
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    MERCH_COMBOS.forEach((c) => {
      initial[c.id] = "L";
    });
    return initial;
  });
  const [addedPackId, setAddedPackId] = useState<string | null>(null);

  const activeCombo = MERCH_COMBOS[selectedPackIndex];
  const currentSize = selectedSizes[activeCombo.id] || "L";

  const handleSelectPack = (idx: number) => {
    playCyberBeep(700, 0.04);
    setSelectedPackIndex(idx);
  };

  const handleSizeChange = (comboId: string, size: string) => {
    playCyberBeep(750, 0.04);
    setSelectedSizes((prev) => ({ ...prev, [comboId]: size }));
  };

  const handleAdd = (combo: MerchComboTemplate) => {
    playCartSound();
    setAddedPackId(combo.id);
    onAddToCart(combo, combo.hasApparel ? selectedSizes[combo.id] || "L" : undefined);
    setTimeout(() => setAddedPackId(null), 1500);
  };

  return (
    <section className="relative z-20 w-full py-16 px-4 sm:px-8 bg-black/95 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30 text-[#FFD60A] font-mono text-xs font-bold uppercase tracking-widest">
              Curated Bundles
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              CURATED <span className="text-[#FFD60A]">MERCH PACKS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
              5 official merchandise bundles with standalone savings.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/merch/combos"
              className="px-6 py-3 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              View All Packs ↗
            </Link>
          </div>
        </div>

        {/* 5-Pack Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MERCH_COMBOS.map((combo, idx) => {
            const isSelected = selectedPackIndex === idx;
            return (
              <button
                key={combo.id}
                type="button"
                onClick={() => handleSelectPack(idx)}
                className={`relative p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden border ${
                  isSelected
                    ? "card-metallic-gold border-[#FFD60A] shadow-md"
                    : "card-metallic-titanium border-white/10 hover:border-white/25"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD60A]" />
                )}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#FFD60A] font-bold">0{idx + 1}</span>
                    <span className="text-emerald-400 font-bold">{combo.savings}</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-black uppercase truncate text-white">
                    {combo.name}
                  </div>
                </div>

                <div className="pt-3 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-black text-[#FFD60A]">
                    ₹{combo.price}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    ₹{combo.originalPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pack Detailed Showcase Card */}
        <div
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${
            activeCombo.isFeatured
              ? "card-metallic-gold border-[#FFD60A]/70 shadow-lg"
              : "card-metallic-titanium border-white/20"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Product Images In Package Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/15 flex items-center justify-center p-6">
                <Image
                  src={activeCombo.products[0]?.image || "/merch/all-in-pack.jpg"}
                  alt={activeCombo.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase bg-black/80 border border-[#FFD60A]/40 text-[#FFD60A]">
                  {activeCombo.badge}
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                  {activeCombo.savings}
                </div>
              </div>

              {/* Package Items Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeCombo.products.map((p) => (
                  <div
                    key={p.id}
                    className="p-2 rounded-xl bg-black/70 border border-white/10 text-center"
                  >
                    <div className="font-mono text-xs text-white font-bold truncate">
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Manifest, Sizing, Price & Direct Add */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {activeCombo.name}
                </h3>
                <p className="text-xs font-mono text-[#FFD60A] font-bold">
                  {activeCombo.tagline}
                </p>
              </div>

              {/* Items Manifest List */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                  Includes:
                </span>
                <ul className="space-y-1 font-mono text-xs text-zinc-300">
                  {activeCombo.includes.map((inc, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-2">
                      <span className="text-[#FFD60A] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size selector if apparel */}
              {activeCombo.hasApparel && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase font-bold">Size:</span>
                    <span className="text-[#FFD60A] font-bold">{currentSize}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["S", "M", "L", "XL", "2XL"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeChange(activeCombo.id, sz)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                          currentSize === sz
                            ? "bg-[#FFD60A] text-black shadow-md"
                            : "bg-black/60 border border-white/15 text-zinc-400 hover:text-white hover:border-white/40"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Action Buttons */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-baseline justify-between font-mono">
                  <div>
                    <span className="text-xs text-zinc-400 uppercase block">Pack Price</span>
                    <span className="text-3xl font-black text-[#FFD60A]">
                      ₹{activeCombo.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-500 uppercase block">Standalone</span>
                    <span className="text-sm text-zinc-500 line-through">
                      ₹{activeCombo.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleAdd(activeCombo)}
                    className={`py-3.5 px-4 rounded-xl font-mono font-black text-xs uppercase cursor-pointer transition-all ${
                      addedPackId === activeCombo.id
                        ? "bg-emerald-500 text-black border border-emerald-400"
                        : "btn-metallic-gold"
                    }`}
                  >
                    {addedPackId === activeCombo.id
                      ? "✓ Added Pack to Bag"
                      : `+ Add to Bag — ₹${activeCombo.price}`}
                  </button>

                  <Link
                    href={`/merch/combos#pack-${activeCombo.id}`}
                    className="py-3.5 px-4 rounded-xl btn-metallic-titanium font-mono font-bold text-xs uppercase text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    View Pack Details ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
