"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart, formatNaira } from "@/context/CartContext";
import { siteConfig } from "@/data/site";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Truck, Store, AlertCircle } from "lucide-react";
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

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  // Close on Escape key and restore body overflow
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    let hasError = false;
    setNameError("");
    setAddressError("");

    if (!customerName.trim()) {
      setNameError(`Please provide your name so ${siteConfig.ownerFirstName} knows who is ordering.`);
      hasError = true;
      nameInputRef.current?.focus();
    }

    if (orderType === "delivery" && !address.trim()) {
      setAddressError(`Please provide your delivery address in ${siteConfig.city} or nationwide.`);
      if (!hasError) {
        addressInputRef.current?.focus();
      }
      hasError = true;
    }

    if (hasError) return;

    const itemLines = items
      .map(
        (i) =>
          `• ${i.quantity} × ${i.name}${i.options ? ` (${i.options})` : ""}: ${formatNaira(
            i.price * i.quantity
          )}`
      )
      .join("\n");

    const message = `${siteConfig.whatsappGreetings.cartPrefix}\n\n${itemLines}\n\nTotal: ${formatNaira(
      totalPrice
    )}\nName: ${customerName}\n${
      orderType === "delivery"
        ? `Delivery to: ${address}`
        : `Order Type: Self-Pickup (${siteConfig.address})`
    }\nNeeded: ${dateTimeNeeded || "As soon as fresh"}\n${
      notes ? `Notes: ${notes}` : ""
    }`;

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["rgb(168, 50, 74)", "rgb(183, 121, 63)", "rgb(250, 246, 240)"],
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
          {/* Solid subtle backdrop without blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-heading/40 cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer panel: Bottom sheet style on mobile, side drawer on desktop */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-bg shadow-2xl border-l border-border flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-border bg-bg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-11 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-heading">
                      YOUR BASKET ({totalCount})
                    </h3>
                    <span className="text-[11px] text-muted block -mt-1">
                      Orders are confirmed and arranged via WhatsApp
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="size-11 rounded-full border border-heading/20 bg-bg hover:bg-surface text-heading flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="size-16 rounded-full bg-surface flex items-center justify-center text-caramel mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h4 className="font-heading text-2xl text-heading">
                      YOUR BASKET IS EMPTY
                    </h4>
                    <p className="text-sm text-muted max-w-xs mt-1.5 leading-relaxed">
                      Explore our flaky meat pies, party platters, and sweet treats to start your order.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 min-h-[44px] rounded-full bg-heading text-white text-xs font-semibold tracking-wider uppercase hover:bg-accent transition-colors cursor-pointer flex items-center justify-center"
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
                          className="bg-bg rounded-xl p-3.5 border border-border shadow-xs flex items-center gap-3.5"
                        >
                          {/* Item cutout thumbnail */}
                          <div className="relative w-16 h-16 shrink-0 bg-surface/50 rounded-lg p-1 flex items-center justify-center">
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
                            <h4 className="font-heading text-base sm:text-lg text-heading truncate leading-tight">
                              {item.name}
                            </h4>
                            {item.options && (
                              <p className="text-[11px] text-muted truncate mt-0.5">
                                {item.options}
                              </p>
                            )}
                            <div className="text-xs font-semibold text-caramel mt-1">
                              {formatNaira(item.price * item.quantity)}
                            </div>
                          </div>

                          {/* Quantity stepper + delete with 44px tap targets */}
                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted hover:text-accent transition-colors p-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-1.5 bg-surface rounded-full px-1.5 py-0.5 border border-border">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="size-8 rounded-full bg-bg text-heading flex items-center justify-center text-xs cursor-pointer hover:bg-white"
                                aria-label="Decrease item quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-heading text-sm px-1.5 text-heading min-w-[1.2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="size-8 rounded-full bg-accent text-white flex items-center justify-center text-xs cursor-pointer hover:bg-accent-hover"
                                aria-label="Increase item quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details Form */}
                    <div className="pt-4 border-t border-border space-y-3.5">
                      <span className="text-xs uppercase font-bold tracking-wider text-heading block">
                        ORDER &amp; DELIVERY DETAILS
                      </span>

                      {/* Delivery vs Pickup Toggle */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderType("delivery")}
                          className={`p-3 min-h-[44px] rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "delivery"
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-surface/40 text-muted"
                          }`}
                        >
                          <Truck className="w-4 h-4" />
                          <span>Delivery</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setOrderType("pickup")}
                          className={`p-3 min-h-[44px] rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "pickup"
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border bg-surface/40 text-muted"
                          }`}
                        >
                          <Store className="w-4 h-4" />
                          <span>Pickup</span>
                        </button>
                      </div>

                      {/* Customer Name with inline error validation */}
                      <div>
                        <label htmlFor="customer-name" className="block text-[11px] font-bold uppercase tracking-wider text-heading mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          id="customer-name"
                          ref={nameInputRef}
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            if (nameError) setNameError("");
                          }}
                          placeholder="e.g. Adaobi or Emmanuel"
                          aria-invalid={!!nameError}
                          aria-describedby={nameError ? "name-error-msg" : undefined}
                          className={`w-full px-3.5 py-3 min-h-[44px] rounded-xl border bg-bg text-sm text-text focus:outline-hidden ${
                            nameError ? "border-accent ring-1 ring-accent" : "border-border focus:border-accent"
                          }`}
                        />
                        {nameError && (
                          <p id="name-error-msg" className="mt-1 text-xs text-accent flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{nameError}</span>
                          </p>
                        )}
                      </div>

                      {/* Address (if delivery) with inline error validation */}
                      {orderType === "delivery" && (
                        <div>
                          <label htmlFor="customer-address" className="block text-[11px] font-bold uppercase tracking-wider text-heading mb-1">
                            DELIVERY ADDRESS ({siteConfig.city.toUpperCase()} / NATIONWIDE) *
                          </label>
                          <input
                            id="customer-address"
                            ref={addressInputRef}
                            type="text"
                            required
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              if (addressError) setAddressError("");
                            }}
                            placeholder={`e.g. Street Address in ${siteConfig.city}`}
                            aria-invalid={!!addressError}
                            aria-describedby={addressError ? "address-error-msg" : undefined}
                            className={`w-full px-3.5 py-3 min-h-[44px] rounded-xl border bg-bg text-sm text-text focus:outline-hidden ${
                              addressError ? "border-accent ring-1 ring-accent" : "border-border focus:border-accent"
                            }`}
                          />
                          {addressError && (
                            <p id="address-error-msg" className="mt-1 text-xs text-accent flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{addressError}</span>
                            </p>
                          )}
                        </div>
                      )}

                      {/* Date & Time Needed */}
                      <div>
                        <label htmlFor="customer-datetime" className="block text-[11px] font-bold uppercase tracking-wider text-heading mb-1">
                          DATE &amp; TIME NEEDED
                        </label>
                        <input
                          id="customer-datetime"
                          type="text"
                          value={dateTimeNeeded}
                          onChange={(e) => setDateTimeNeeded(e.target.value)}
                          placeholder="e.g. Tomorrow by 1:00 PM"
                          className="w-full px-3.5 py-3 min-h-[44px] rounded-xl border border-border bg-bg text-sm text-text focus:border-accent focus:outline-hidden"
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label htmlFor="customer-notes" className="block text-[11px] font-bold uppercase tracking-wider text-heading mb-1">
                          SPECIAL INSTRUCTIONS / NOTES
                        </label>
                        <input
                          id="customer-notes"
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Extra pepper on gizzard, pack separately"
                          className="w-full px-3.5 py-3 min-h-[44px] rounded-xl border border-border bg-bg text-sm text-text focus:border-accent focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer: Total & WhatsApp Order CTA */}
              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-border bg-surface/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg text-heading">ESTIMATED TOTAL</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-light text-heading">₦</span>
                      <span className="text-3xl font-light text-heading">
                        {totalPrice.toLocaleString("en-NG")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full min-h-[48px] py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                    <span>Payment verified via bank transfer</span>
                    <button
                      onClick={clearCart}
                      className="hover:text-accent transition-colors cursor-pointer min-h-[32px] flex items-center"
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
