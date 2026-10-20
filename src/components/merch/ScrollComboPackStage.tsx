"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MerchComboTemplate, ComboProductItem } from "@/data/combos";
import { playCyberBeep, playCartSound } from "@/lib/merch-audio";

interface ScrollComboPackStageProps {
  combo: MerchComboTemplate;
  index: number;
  total: number;
  selectedSize: string;
  onSizeChange: (comboId: string, size: string) => void;
  onAddToCart: (combo: MerchComboTemplate, size?: string) => void;
  onCheckout: (combo: MerchComboTemplate, size?: string) => void;
}

export function ScrollComboPackStage({
  combo,
  index,
  total,
  selectedSize,
  onSizeChange,
  onAddToCart,
  onCheckout,
}: ScrollComboPackStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const isManualOverrideRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const products = combo.products;
  const currentProduct: ComboProductItem = products[activeProductIndex] || products[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDistance = rect.height - windowHeight;
      if (totalDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
      setScrollProgress(progress);

      if (products.length > 0 && !isManualOverrideRef.current) {
        const itemIndex = Math.min(
          products.length - 1,
          Math.floor(progress * products.length)
        );
        setActiveProductIndex(itemIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, [products.length]);

  const handleSelectProduct = (idx: number) => {
    playCyberBeep(700, 0.05);
    setActiveProductIndex(idx);
    isManualOverrideRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualOverrideRef.current = false;
    }, 1800);
  };

  const handleAdd = () => {
    playCartSound();
    setIsAdded(true);
    onAddToCart(combo, combo.hasApparel ? selectedSize : undefined);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleSizeClick = (sz: string) => {
    playCyberBeep(800, 0.04);
    onSizeChange(combo.id, sz);
  };

  const isFeatured = combo.isFeatured;

  return (
    <div
      ref={containerRef}
      id={`pack-${combo.id}`}
      className="relative min-h-[160vh] w-full border-b border-white/10"
    >
      {/* Sticky Presentation Stage */}
      <div className="sticky top-20 sm:top-24 z-10 w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Clean Meta Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#FFD60A] font-bold">
                0{index + 1} / 0{total}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400 uppercase tracking-wider">{combo.badge}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-500 uppercase hidden sm:inline">
                Scroll to Reveal Items
              </span>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD60A] transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main Stage Grid: Left = Product Showcase Viewer, Right = Pack Details & Checkout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 items-center">
            {/* LEFT: Product Inside The Package (Scroll-Swapped Image) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {/* Product Viewport Container */}
              <div
                className={`relative overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-[16/11] w-full flex items-center justify-center ${
                  isFeatured
                    ? "card-metallic-gold border-[#FFD60A]/60 shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
                    : "card-metallic-titanium border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                }`}
              >
                {/* Specular Top Chamfer */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-20" />
                
                {/* Radial Lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,214,10,0.06)_0%,transparent_70%)] pointer-events-none z-10" />

                {/* Animated Product Image */}
                <div className="relative w-full h-full p-4 sm:p-8 flex items-center justify-center">
                  <Image
                    key={currentProduct.id}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain p-4 sm:p-6 transition-all duration-500 ease-out scale-100 hover:scale-105"
                    priority={index === 0}
                  />
                </div>

                {/* Clean Bottom Overlay inside Viewport */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="truncate">
                    <div className="text-sm font-black uppercase tracking-wide text-white font-mono">
                      {currentProduct.name}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 truncate mt-0.5">
                      {currentProduct.spec}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-mono text-[#FFD60A] font-bold">
                    {activeProductIndex + 1} of {products.length}
                  </span>
                </div>
              </div>

              {/* Product Scrubber Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {products.map((prod, pIdx) => {
                  const isActive = activeProductIndex === pIdx;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleSelectProduct(pIdx)}
                      className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer overflow-hidden ${
                        isActive
                          ? "bg-[#FFD60A]/15 border-[#FFD60A] text-white shadow-sm"
                          : "bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD60A]" />
                      )}
                      <div className="font-mono text-xs font-bold truncate">
                        {prod.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Pack Identity, Inclusions, Sizing & Instant Order */}
            <div
              className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 ${
                isFeatured
                  ? "card-metallic-gold border-[#FFD60A]/70"
                  : "card-metallic-titanium"
              }`}
            >
              {/* Header: Title, Tagline, Price */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] font-black uppercase tracking-wider ${
                      isFeatured
                        ? "bg-[#FFD60A]/25 border border-[#FFD60A]/60 text-[#FFD60A]"
                        : "bg-white/10 border border-white/20 text-zinc-300"
                    }`}
                  >
                    {combo.badge}
                  </span>

                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-black uppercase tracking-wider">
                    {combo.savings}
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                    {combo.name}
                  </h2>
                  <p className="text-xs font-mono text-[#FFD60A] font-bold mt-2">
                    {combo.tagline}
                  </p>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-wider block">
                    Includes:
                  </span>
                  <ul className="space-y-1.5 font-mono text-xs text-zinc-300">
                    {combo.includes.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <span className="text-[#FFD60A] font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sizing Picker */}
              {combo.hasApparel && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase font-bold">Size:</span>
                    <span className="text-[#FFD60A] font-bold">{selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {["S", "M", "L", "XL", "2XL"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeClick(sz)}
                        className={`py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                          selectedSize === sz
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

              {/* Pricing breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">
                      PACK PRICE
                    </div>
                    <div className="text-4xl font-black text-[#FFD60A] leading-tight">
                      ₹{combo.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">
                      STANDALONE
                    </div>
                    <div className="text-base font-mono text-zinc-500 line-through">
                      ₹{combo.originalPrice}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-400 flex items-center justify-between border-t border-white/5 pt-1.5">
                  <span>+ ₹200 Membership</span>
                  <span className="text-white font-bold">= ₹{combo.price + 200} Total</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onCheckout(combo, combo.hasApparel ? selectedSize : undefined)}
                  className="w-full py-4 px-6 rounded-xl font-mono font-black text-sm uppercase tracking-wider cursor-pointer shadow-lg transition-transform active:scale-95 btn-metallic-gold"
                >
                  Checkout Pack — ₹{combo.price + 200} →
                </button>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isAdded
                      ? "bg-emerald-500 text-black border border-emerald-400"
                      : "btn-metallic-titanium"
                  }`}
                >
                  {isAdded ? "✓ Added to Bag" : `+ Add to Bag — ₹${combo.price}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
