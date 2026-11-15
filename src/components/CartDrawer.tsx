"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart, formatNaira } from "@/context/CartContext";
import { siteConfig } from "@/data/site";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Truck, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [dateTimeNeeded, setDateTimeNeeded] = useState("");
  const [notes, setNotes] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    if (!customerName.trim()) {
      alert("Please provide your name so Juliet knows who is ordering!");
      return;
    }

    if (orderType === "delivery" && !address.trim()) {
      alert("Please provide your delivery address in Jos or beyond!");
      return;
    }

    // Format item lines
    const itemLines = items
      .map(
        (i) =>
          `• ${i.quantity} × ${i.name}${i.options ? ` (${i.options})` : ""}: ${formatNaira(
            i.price * i.quantity
          )}`
      )
      .join("\n");

    const message = `Hello! I'd like to place an order 🧁\n\n${itemLines}\n\nTotal: ${formatNaira(
      totalPrice
    )}\nName: ${customerName}\n${
      orderType === "delivery" ? `Delivery to: ${address}` : `Order Type: Self-Pickup at Rayfield Kitchen`
    }\nNeeded: ${dateTimeNeeded || "As soon as fresh"}\n${
      notes ? `Notes: ${notes}` : ""
    }`;

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A8324A", "#B7793F", "#FAF6F0"],
      });
    } catch {
      // ignore
    }

    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#3B2418]/35 backdrop-blur-xs cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer panel: Bottom sheet style on mobile, side drawer on desktop */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl border-l border-[#E8DED1] flex flex-col h-full overflow-hidden"
              style={{
                backgroundImage: "url('/images/bg-texture.jpg')",
                backgroundRepeat: "repeat",
                backgroundSize: "600px auto",
              }}
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-[#E8DED1] bg-[#FAF6F0]/90 backdrop-blur-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#A8324A]/10 flex items-center justify-center text-[#A8324A]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-[#3B2418]">
                      YOUR BASKET ({totalCount})
                    </h3>
                    <span className="text-[11px] text-[#6E625A] block -mt-1">
                      Orders are confirmed and paid via WhatsApp
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#3B2418]/20 bg-[#FAF6F0] hover:bg-[#F1EAE0] text-[#3B2418] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F1EAE0] flex items-center justify-center text-[#B7793F] mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h4 className="font-heading text-2xl text-[#3B2418]">
                      YOUR BASKET IS EMPTY
                    </h4>
                    <p className="text-xs text-[#6E625A] max-w-xs mt-1.5 leading-relaxed">
                      Explore our flaky meat pies, party platters, and sweet treats to start your order.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-2.5 rounded-full bg-[#3B2418] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#A8324A] transition-colors cursor-pointer"
                    >
                      Browse Bakery Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#FAF6F0] rounded-xl p-3.5 border border-[#E8DED1] shadow-xs flex items-center gap-3.5"
                        >
                          {/* Item cutout thumbnail */}
                          <div className="relative w-16 h-16 shrink-0 bg-[#F1EAE0]/50 rounded-lg p-1 flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-base sm:text-lg text-[#3B2418] truncate leading-tight">
                              {item.name}
                            </h4>
                            {item.options && (
                              <p className="text-[11px] text-[#6E625A] truncate mt-0.5">
                                {item.options}
                              </p>
                            )}
                            <div className="text-xs font-semibold text-[#B7793F] mt-1">
                              {formatNaira(item.price * item.quantity)}
                            </div>
                          </div>

                          {/* Quantity stepper + delete */}
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#6E625A] hover:text-[#A8324A] transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center gap-1.5 bg-[#F1EAE0] rounded-full px-1.5 py-0.5 border border-[#B7793F]/30">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 rounded-full bg-[#FAF6F0] text-[#3B2418] flex items-center justify-center text-xs cursor-pointer hover:bg-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-heading text-xs px-1 text-[#3B2418]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 rounded-full bg-[#A8324A] text-white flex items-center justify-center text-xs cursor-pointer hover:bg-[#8D253B]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details Form */}
                    <div className="pt-4 border-t border-[#E8DED1] space-y-3.5">
                      <span className="text-xs uppercase font-bold tracking-wider text-[#3B2418] block">
                        ORDER &amp; DELIVERY DETAILS
                      </span>

                      {/* Delivery vs Pickup Toggle */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderType("delivery")}
                          className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "delivery"
                              ? "border-[#A8324A] bg-[#A8324A]/10 text-[#A8324A]"
                              : "border-[#E8DED1] bg-[#F1EAE0]/40 text-[#6E625A]"
                          }`}
                        >
                          <Truck className="w-4 h-4" />
                          <span>Delivery in Jos</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setOrderType("pickup")}
                          className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "pickup"
                              ? "border-[#A8324A] bg-[#A8324A]/10 text-[#A8324A]"
                              : "border-[#E8DED1] bg-[#F1EAE0]/40 text-[#6E625A]"
                          }`}
                        >
                          <Store className="w-4 h-4" />
                          <span>Self-Pickup</span>
                        </button>
                      </div>

                      {/* Customer Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3B2418] mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Adaobi or Emmanuel"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED1] bg-[#FAF6F0] text-xs text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden"
                        />
                      </div>

                      {/* Address (if delivery) */}
                      {orderType === "delivery" && (
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3B2418] mb-1">
                            DELIVERY ADDRESS (JOS / SURROUNDING) *
                          </label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. 14 Rayfield Road, Opposite Golf Club, Jos"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED1] bg-[#FAF6F0] text-xs text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden"
                          />
                        </div>
                      )}

                      {/* Date & Time Needed */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3B2418] mb-1">
                          DATE &amp; TIME NEEDED
                        </label>
                        <input
                          type="text"
                          value={dateTimeNeeded}
                          onChange={(e) => setDateTimeNeeded(e.target.value)}
                          placeholder="e.g. Tomorrow by 1:00 PM"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED1] bg-[#FAF6F0] text-xs text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden"
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3B2418] mb-1">
                          SPECIAL INSTRUCTIONS / NOTES
                        </label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Extra pepper on gizzard, pack separately"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DED1] bg-[#FAF6F0] text-xs text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer: Total & WhatsApp Order CTA */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#E8DED1] bg-[#F1EAE0]/70 backdrop-blur-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg text-[#3B2418]">ESTIMATED TOTAL</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-light text-[#3B2418]">₦</span>
                      <span className="text-3xl font-light text-[#3B2418]">
                        {totalPrice.toLocaleString("en-NG")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full py-4 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#6E625A] pt-1">
                    <span>Payment verified via bank transfer</span>
                    <button
                      onClick={clearCart}
                      className="hover:text-[#A8324A] transition-colors cursor-pointer"
                    >
                      Clear Basket
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
