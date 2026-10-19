"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "./SimpleCheckoutTerminal";
import { playCartSound } from "@/lib/merch-audio";

interface MerchCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export function MerchCartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}: MerchCartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceed = () => {
    playCartSound();
    onClose();
    onProceedToCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel (Zero SVGs) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between text-white z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <h3 className="font-black uppercase tracking-tight text-xl leading-tight">
                  SWAG BAG
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  {totalCount} {totalCount === 1 ? "ITEM" : "ITEMS"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                  <div className="text-sm font-mono text-zinc-500 uppercase">BAG IS EMPTY</div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl btn-metallic-gold text-black font-mono font-bold text-xs uppercase cursor-pointer"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-2">
                    <span>ITEMS IN BAG</span>
                    {cart.length > 1 && (
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-red-400 hover:underline cursor-pointer"
                      >
                        [ CLEAR ADD-ONS ]
                      </button>
                    )}
                  </div>

                  {cart.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-2xl card-metallic-titanium flex items-center justify-between gap-3 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-black/80 border border-white/10 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-[#FFD60A]">
                          [#]
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-sm text-white truncate">{c.item.name}</div>
                          {c.item.isMembership && (
                            <div className="text-[10px] font-mono text-[#FFD60A] font-bold mt-0.5">
                              [COMPULSORY BASE // MANDATORY]
                            </div>
                          )}
                          {c.size && (
                            <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                              SIZE: {c.size}
                            </div>
                          )}
                          <div className="text-xs font-mono text-[#FFD60A] font-bold mt-1">
                            ₹{c.item.price * c.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {!c.item.isMembership ? (
                          <button
                            type="button"
                            onClick={() => onRemoveItem(c.id)}
                            className="text-zinc-500 hover:text-red-400 font-mono text-sm px-1 cursor-pointer"
                          >
                            ×
                          </button>
                        ) : (
                          <span className="text-[9px] font-mono text-[#FFD60A] font-bold border border-[#FFD60A]/40 px-1 py-0.5 rounded bg-[#FFD60A]/10">
                            MANDATORY
                          </span>
                        )}

                        <div className="flex items-center bg-black/60 rounded border border-white/10 text-xs">
                          {!c.item.isMembership && (
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(c.id, -1)}
                              className="px-2 py-0.5 text-zinc-400 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                          )}
                          <span className="px-2 font-mono font-bold text-white">{c.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(c.id, 1)}
                            className="px-2 py-0.5 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Proceed */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-black/90 space-y-4">
                <div className="flex justify-between items-baseline text-white font-bold">
                  <span className="font-mono text-xs text-zinc-400 uppercase">TOTAL:</span>
                  <span className="text-2xl font-black text-[#FFD60A]">₹{subtotal}</span>
                </div>

                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full py-4 px-6 rounded-xl btn-metallic-gold text-black font-mono font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  PROCEED TO REGISTER & ORDER →
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
