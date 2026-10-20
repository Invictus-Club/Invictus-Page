"use client";

import { useState } from "react";
import Link from "next/link";
import { MerchItem } from "@/data/merch";
import { playCartSound, playCyberBeep } from "@/lib/merch-audio";

export interface CartItem {
  id: string;
  item: MerchItem;
  quantity: number;
  size?: string;
}

interface SimpleCheckoutTerminalProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddMembership: () => void;
  onAddCompleteCombo: () => void;
}

export function SimpleCheckoutTerminal({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddMembership,
  onAddCompleteCombo,
}: SimpleCheckoutTerminalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [usn, setUsn] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [copied, setCopied] = useState(false);

  const grandTotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  const generateInvoice = (code: string) => {
    const lines = cart.map(
      (c) => `• ${c.item.name} (${c.quantity}x)${c.size ? ` [Size: ${c.size}]` : ""} — ₹${c.item.price * c.quantity}`
    );
    return (
      `*INVICTUS CLUB MERCH ORDER [${code}]*\n\n` +
      `*NAME:* ${name.trim() || "Club Member"}\n` +
      (phone.trim() ? `*WHATSAPP:* ${phone.trim()}\n` : "") +
      (usn.trim() ? `*USN / ID:* ${usn.trim()}\n` : "") +
      `\n*ITEMS ORDERED:*\n${lines.join("\n")}\n\n` +
      `*TOTAL PAYABLE:* ₹${grandTotal}`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    playCartSound();
    playCyberBeep(880, 0.2);
    const code = "INV-" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsOrdered(true);

    const message = generateInvoice(code);
    const waUrl = `https://wa.me/918310999561?text=${encodeURIComponent(message)}`;

    // Directly open WhatsApp to +91 831 099 9561
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateInvoice(orderCode));
    setCopied(true);
    playCyberBeep(900, 0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="checkout-section"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 py-24 bg-black text-white z-20"
    >
      {/* Seamless transition gradient to pure solid black */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto space-y-8 text-center relative z-10">
        {/* Header (High Contrast Pure Black Background) */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            REGISTER & <span className="text-[#FFD60A]">ORDER NOW</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
            DIRECT WHATSAPP DISPATCH // INSTANT ORDER CONFIRMATION
          </p>
        </div>

        {/* BECOME MEMBER / REGISTER VIA GOOGLE FORM (Classy Metallic Gold Gloss) */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl card-metallic-gold flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          {/* Top Specular Chamfer Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFF3C2]/80 to-transparent pointer-events-none" />
          {/* Anisotropic Light Sweep */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,225,140,0.12)_0%,rgba(212,175,55,0.02)_45%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight">
              BECOME AN INVICTUS MEMBER
            </h3>
            <p className="text-xs font-mono text-zinc-300">
              Official membership includes ID Card + Cool Lanyard + Totebag + Pen. Fill the official induction Google Form.
            </p>
          </div>

          <a
            href="https://forms.gle/InvictusMembership2026"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 px-8 py-4 rounded-2xl btn-metallic-gold text-sm font-mono font-black uppercase tracking-wider whitespace-nowrap cursor-pointer shrink-0"
          >
            BECOME MEMBER (GOOGLE FORM) ↗
          </a>
        </div>

        {isOrdered ? (
          <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl card-metallic-titanium text-left space-y-6 max-w-xl mx-auto border-emerald-500/50">
            {/* Top Specular Chamfer Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(16,185,129,0.1)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                ORDER DISPATCHED VIA WHATSAPP
              </span>
              <span className="font-mono text-sm text-white font-bold">{orderCode}</span>
            </div>

            <div className="relative z-10 space-y-2 font-mono text-sm text-zinc-300">
              <div>NAME: {name.trim() || "Club Member"}</div>
              {phone.trim() && <div>WHATSAPP: {phone.trim()}</div>}
              <div>TOTAL: ₹{grandTotal}</div>
              <div className="text-xs text-emerald-400 font-bold">SENT TO: wa.me/918310999561</div>
            </div>

            <div className="relative z-10 space-y-3 pt-2">
              <a
                href={`https://wa.me/918310999561?text=${encodeURIComponent(
                  generateInvoice(orderCode)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-4 px-6 rounded-xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:from-white hover:to-emerald-400 text-black font-mono font-black text-sm uppercase transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_10px_25px_rgba(16,185,129,0.4)]"
              >
                OPEN WHATSAPP (+91 831 099 9561) AGAIN →
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3.5 px-6 rounded-xl btn-metallic-titanium font-mono text-xs uppercase cursor-pointer"
              >
                {copied ? "✓ COPIED INVOICE!" : "COPY INVOICE TEXT"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOrdered(false);
                  onClearCart();
                }}
                className="w-full text-center text-xs font-mono text-zinc-400 hover:text-white pt-2 cursor-pointer"
              >
                START NEW ORDER
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
            {/* Left: Registration & WhatsApp Dispatch Form (Classy Titanium Gunmetal Gloss) */}
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden md:col-span-6 p-6 sm:p-8 rounded-3xl card-metallic-titanium space-y-4"
            >
              {/* Top Specular Chamfer Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
              {/* Anisotropic Light Sweep */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />

              <div className="relative z-10 text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider border-b border-white/10 pb-3">
                BUYER DETAILS
              </div>

              <div className="relative z-10">
                <label className="text-[11px] font-mono uppercase text-zinc-300 font-bold block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="E.G. ALEX CHEN"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0a0b0e] border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="relative z-10">
                <label className="text-[11px] font-mono uppercase text-zinc-300 font-bold block mb-1">
                  YOUR WHATSAPP NUMBER
                </label>
                <input
                  type="tel"
                  placeholder="+91..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0a0b0e] border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="relative z-10">
                <label className="text-[11px] font-mono uppercase text-zinc-300 font-bold block mb-1">
                  VTU USN / STUDENT ID
                </label>
                <input
                  type="text"
                  placeholder="1VA23CS000"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  className="w-full bg-[#0a0b0e] border border-white/15 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="relative z-10 pt-2">
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-mono font-black text-sm uppercase cursor-pointer ${
                    cart.length > 0
                      ? "btn-metallic-gold"
                      : "btn-metallic-titanium opacity-40 cursor-not-allowed"
                  }`}
                >
                  {cart.length > 0
                    ? `ORDER NOW (₹${grandTotal}) →`
                    : "SELECT ITEMS FIRST"}
                </button>
              </div>
            </form>

            {/* Right Column: Bag Summary Manifest + Merch Combos Card */}
            <div className="md:col-span-6 space-y-6">
              {/* Bag Summary Manifest (Classy Titanium Gunmetal Gloss) */}
              <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl card-metallic-titanium space-y-4">
                {/* Top Specular Chamfer Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                {/* Anisotropic Light Sweep */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider">
                    BAG SUMMARY ({cart.length})
                  </span>
                  {cart.length > 1 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-xs font-mono text-red-400 hover:text-red-300 hover:underline cursor-pointer"
                    >
                      CLEAR ADD-ONS
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="relative z-10 py-8 text-center space-y-4">
                    <div className="text-sm font-mono text-zinc-400">YOUR BAG IS EMPTY</div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={onAddMembership}
                        className="w-full py-4 px-4 rounded-xl btn-metallic-gold font-mono font-black text-xs uppercase cursor-pointer"
                      >
                        + ADD CLUB MEMBERSHIP (COMPULSORY BASE) — ₹200
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-3 max-h-64 overflow-y-auto pr-1">
                    {cart.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs shadow-inner"
                      >
                        <div className="truncate pr-2">
                          <div className="font-bold text-white truncate">{c.item.name}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {c.item.isMembership && (
                              <span className="text-[10px] font-mono text-[#FFD60A] font-bold">
                                MANDATORY BASE
                              </span>
                            )}
                            {c.item.isCombo && (
                              <span className="text-[10px] font-mono text-[#FFD60A] font-bold">
                                COMBO PACK
                              </span>
                            )}
                            {!c.item.isMembership && !c.item.isCombo && (
                              <span className="text-[10px] font-mono text-zinc-400 font-bold">
                                ADD-ON
                              </span>
                            )}
                            {c.size && (
                              <span className="text-[10px] font-mono text-zinc-400">SIZE: {c.size}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono font-bold text-[#FFD60A] text-sm">
                            ₹{c.item.price * c.quantity}
                          </span>
                          {!c.item.isMembership ? (
                            <button
                              type="button"
                              onClick={() => onRemoveItem(c.id)}
                              className="text-zinc-400 hover:text-red-400 text-sm font-mono px-1 cursor-pointer"
                            >
                              ×
                            </button>
                          ) : (
                            <span className="text-[9px] font-mono text-[#FFD60A] font-bold border border-[#FFD60A]/40 px-1.5 py-0.5 rounded bg-[#FFD60A]/10">
                              MANDATORY
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-mono text-zinc-300 font-bold uppercase">TOTAL:</span>
                  <span className="text-3xl font-black text-[#FFD60A] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    ₹{grandTotal}
                  </span>
                </div>

                <div className="relative z-10 text-[10px] font-mono text-zinc-400 border-t border-white/5 pt-2">
                  * Club membership (₹200) is compulsory and covers ID Card, Lanyard, Totebag & Pen.
                </div>
              </div>

              {/* Merch Combos Rectangle (Redirects to /merch/combos) */}
              <Link
                href="/merch/combos"
                className="group relative overflow-hidden p-6 sm:p-7 rounded-3xl card-metallic-gold block text-left transition-all duration-300 hover:scale-[1.01] hover:border-[#FFD60A] hover:shadow-[0_16px_50px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                {/* Specular Chamfer Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFF3C2]/90 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_25%_0%,rgba(255,225,140,0.14)_0%,rgba(212,175,55,0.03)_50%,transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.05] pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFD60A]/20 border border-[#FFD60A]/40 text-[#FFD60A] font-mono text-[10px] font-black uppercase tracking-wider">
                      CURATED PACKS
                    </span>
                    <span className="font-mono text-xs text-[#FFD60A] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      VIEW ALL COMBOS →
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FFD60A] transition-colors">
                      EXPLORE MERCH COMBOS
                    </h3>
                    <p className="text-xs font-mono text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                      Essential ₹349, Student ₹599, Premium ₹799, Apparel ₹999, and ALL-IN PACK ₹1234. Save up to ₹311!
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-300 font-bold">5 CURATED PACKS</span>
                    <span className="text-[#FFD60A] font-bold">DISCOVER BUNDLES ↗</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
