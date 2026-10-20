"use client";

import { useState } from "react";
import { MerchItem } from "@/data/merch";
import { playCartSound, playCyberBeep } from "@/lib/merch-audio";

interface ScrollStageItemProps {
  item: MerchItem;
  onAddToCart: (item: MerchItem, size?: string) => void;
  index: number;
}

export function ScrollStageItem({ item, onAddToCart, index }: ScrollStageItemProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizes ? item.sizes[2] || item.sizes[0] : ""
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    playCartSound();
    setIsAdded(true);
    onAddToCart(item, item.sizes ? selectedSize : undefined);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const isCombo = !!item.isCombo;
  const isTotebag = item.id === "invictus-totebag" || item.id === "invictus-notepad";
  const isBottle = item.id === "invictus-bottle";

  // Timing heights: Totebag/Notepad gets 145vh to stay longer; Bottle gets 90vh to prepone faster
  const sectionHeight = isTotebag
    ? "min-h-[145vh]"
    : isBottle
    ? "min-h-[90vh]"
    : isCombo
    ? "min-h-[125vh]"
    : "min-h-[110vh]";

  return (
    <section
      className={`relative ${sectionHeight} w-full flex flex-col justify-center items-center px-4 sm:px-8 py-16 pointer-events-auto`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Category Badge: Default Membership vs Add-on */}
        <div>
          {item.isMembership ? (
            <span className="text-xs font-mono font-black text-black btn-metallic-gold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-lg">
              CLUB MEMBERSHIP (COMPULSORY BASE)
            </span>
          ) : isCombo ? (
            <span className="text-xs font-mono font-black text-black btn-metallic-gold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-lg">
              ALL-IN PACK // ULTIMATE VAULT (₹1234)
            </span>
          ) : (
            <span className="text-xs font-mono font-bold text-zinc-300 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              OPTIONAL ADD-ON
            </span>
          )}
        </div>

        {/* WHAT IS IT (BIG BOLD CENTERED TEXT) */}
        <h2
          className={`${
            isCombo
              ? "text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              : "text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          } font-black uppercase tracking-tight text-white leading-none drop-shadow-[0_6px_35px_rgba(0,0,0,0.95)]`}
        >
          {item.name}
        </h2>

        {/* Size picker (for apparel) - Centered */}
        {item.sizes && (
          <div className="space-y-2 pt-1 flex flex-col items-center">
            <div className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              SELECT SIZE:
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {item.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setSelectedSize(sz);
                    playCyberBeep(700, 0.04);
                  }}
                  className={`w-12 h-11 sm:w-14 sm:h-12 rounded-xl font-mono text-sm font-black transition-all cursor-pointer ${
                    selectedSize === sz
                      ? "btn-metallic-gold shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                      : "btn-metallic-titanium hover:text-white"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BELOW THEM: ADD TO CART BUTTON (CENTERED) */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleAdd}
            className={`px-10 sm:px-14 py-4 sm:py-5 rounded-2xl font-mono font-black uppercase tracking-wider cursor-pointer text-sm sm:text-base transition-all ${
              isAdded
                ? "bg-gradient-to-b from-emerald-400 to-emerald-600 text-black border border-emerald-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_30px_rgba(16,185,129,0.6)] scale-105"
                : "btn-metallic-gold shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            }`}
          >
            {isAdded
              ? "✓ ADDED TO BAG"
              : item.isMembership
              ? "✓ INCLUDED BY DEFAULT (COMPULSORY BASE)"
              : isCombo
              ? "+ ADD ALL-IN PACK (₹1234)"
              : "+ ADD AS ADD-ON"}
          </button>
        </div>
      </div>
    </section>
  );
}
