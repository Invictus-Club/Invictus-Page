"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MERCH_COMBOS, MerchComboTemplate } from "@/data/combos";
import { playCartSound, playCyberBeep } from "@/lib/merch-audio";

export default function CombosClient() {
  const router = useRouter();

  // Track selected apparel size for each combo card (defaults to "L")
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    MERCH_COMBOS.forEach((combo) => {
      initial[combo.id] = "L";
    });
    return initial;
  });

  const handleSizeChange = (comboId: string, size: string) => {
    playCyberBeep(750, 0.05);
    setSelectedSizes((prev) => ({ ...prev, [comboId]: size }));
  };

  const handleCheckout = (combo: MerchComboTemplate) => {
    playCartSound();
    playCyberBeep(880, 0.15);
    const size = selectedSizes[combo.id] || "L";
    router.push(`/merch?combo=${combo.id}&size=${size}#checkout-section`);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FFD60A] selection:text-black">
      {/* Sticky Minimal Navigation Header (Pure Black, Zero SVGs) */}
      <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/merch"
            className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 hover:text-[#FFD60A] transition-colors flex items-center gap-2 cursor-pointer"
          >
            ← BACK TO MERCH STORE
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black font-mono tracking-tighter uppercase text-white">
              INVICTUS <span className="text-[#FFD60A]">COMBOS</span>
            </span>
          </div>

          <Link
            href="/merch#checkout-section"
            className="px-4 py-2 rounded-xl btn-metallic-titanium font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer"
          >
            GO TO CHECKOUT →
          </Link>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8 text-center space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/30 text-[#FFD60A] font-mono text-[11px] font-black uppercase tracking-widest">
          OFFICIAL INVICTUS GEAR PACKS // DIRECT WHATSAPP DISPATCH
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
          CURATED <span className="text-[#FFD60A]">MERCH COMBOS</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
          Official membership (₹200) is compulsory and covers your ID Card, Lanyard, Totebag & Pen. Explore curated gear bundles with hoodies (₹699), dev tees (₹449), thermal bottles (₹199), and notepads (₹99).
        </p>
      </section>

      {/* Main Grid: Multiple Template Combo Rectangles */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {MERCH_COMBOS.map((combo) => {
            const currentSize = selectedSizes[combo.id] || "L";
            const isFeatured = combo.isFeatured;

            return (
              <div
                key={combo.id}
                className={`relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:scale-[1.01] ${
                  isFeatured
                    ? "card-metallic-gold border-[#FFD60A]/70 shadow-[0_20px_60px_rgba(212,175,55,0.25)]"
                    : "card-metallic-titanium hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Specular Chamfer Highlight */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1px] pointer-events-none ${
                    isFeatured
                      ? "bg-gradient-to-r from-transparent via-[#FFF3C2]/90 to-transparent"
                      : "bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  }`}
                />

                {/* Anisotropic Radial Light Sweep */}
                <div
                  className={`absolute inset-0 pointer-events-none ${
                    isFeatured
                      ? "bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,225,140,0.14)_0%,rgba(212,175,55,0.03)_50%,transparent_70%)]"
                      : "bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />

                {/* Card Header & Content */}
                <div className="relative z-10 space-y-4">
                  {/* Badge & Savings Pill */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] font-black uppercase tracking-wider ${
                        isFeatured
                          ? "bg-[#FFD60A]/25 border border-[#FFD60A]/60 text-[#FFD60A]"
                          : "bg-white/10 border border-white/20 text-zinc-300"
                      }`}
                    >
                      {combo.badge}
                    </span>

                    {combo.savings && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-black uppercase tracking-wider">
                        {combo.savings}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      {combo.name}
                    </h2>
                    <p className="text-xs font-mono text-[#FFD60A] font-bold mt-1">
                      {combo.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>

                  {/* Included Items Manifest */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono text-zinc-300 font-bold uppercase tracking-wider block">
                      BUNDLE INCLUDES [{combo.includes.length} ITEMS]:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-zinc-300">
                      {combo.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#FFD60A] font-bold shrink-0">✓</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Size Selection, Price, Checkout Button */}
                <div className="relative z-10 space-y-4 pt-6 mt-6 border-t border-white/10">
                  {/* Apparel Size Picker */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-400 uppercase font-bold">SELECT APPAREL SIZE:</span>
                      <span className="text-[#FFD60A] font-bold">[{currentSize}]</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {["S", "M", "L", "XL", "2XL"].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleSizeChange(combo.id, sz)}
                          className={`py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                            currentSize === sz
                              ? "bg-[#FFD60A] text-black shadow-[0_2px_10px_rgba(255,214,10,0.5)]"
                              : "bg-black/60 border border-white/15 text-zinc-400 hover:text-white hover:border-white/40"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Display */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase">COMBO ADD-ON</div>
                        <div className="text-3xl font-black text-[#FFD60A] leading-tight">
                          ₹{combo.price}
                        </div>
                      </div>
                      {combo.originalPrice && (
                        <div className="text-right">
                          <div className="text-[10px] font-mono text-zinc-500 uppercase">STANDALONE</div>
                          <div className="text-sm font-mono text-zinc-500 line-through">
                            ₹{combo.originalPrice}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between border-t border-white/5 pt-1.5">
                      <span>+ ₹200 COMPULSORY MEMBERSHIP</span>
                      <span className="text-white font-bold">= ₹{combo.price + 200} TOTAL</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={() => handleCheckout(combo)}
                    className="w-full py-3.5 px-4 rounded-xl font-mono font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-transform active:scale-95 btn-metallic-gold"
                  >
                    CHECKOUT COMBO (₹{combo.price + 200}) →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guidance Note for Easy Hand-Editing */}
        <div className="mt-16 p-6 rounded-2xl border border-white/10 bg-zinc-950/80 text-center space-y-2 max-w-2xl mx-auto">
          <div className="font-mono text-xs text-[#FFD60A] font-bold uppercase tracking-wider">
            [ HAND-EDITABLE TEMPLATES ]
          </div>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
            All combo bundles, prices, badges, and inclusions are defined in <code className="text-white">src/data/combos.ts</code>. You can easily edit any combo details directly by hand in that file!
          </p>
        </div>
      </main>
    </div>
  );
}
