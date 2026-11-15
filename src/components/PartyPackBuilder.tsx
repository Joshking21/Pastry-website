"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart, formatNaira } from "@/context/CartContext";
import { Check, ShoppingBag, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface PackSize {
  id: string;
  pieces: number;
  label: string;
  basePrice: number;
  popular?: boolean;
}

const PACK_SIZES: PackSize[] = [
  { id: "50", pieces: 50, label: "50 PIECES", basePrice: 15000 },
  { id: "100", pieces: 100, label: "100 PIECES", basePrice: 28000, popular: true },
  { id: "200", pieces: 200, label: "200 PIECES", basePrice: 54000 },
];

const PACK_ITEMS = [
  { id: "puff-puff", name: "Golden Puff-Puff Balls", extra: 0 },
  { id: "samosa", name: "Crispy Beef Samosas", extra: 1000 },
  { id: "spring-roll", name: "Vegetable Spring Rolls", extra: 800 },
  { id: "gizzard", name: "Peppered Gizzard Skewers", extra: 2500 },
  { id: "mini-sausage", name: "Mini Sausage Bites", extra: 1200 },
  { id: "chicken-wings", name: "Glazed BBQ Chicken Wings", extra: 3000 },
];

export const PartyPackBuilder: React.FC = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PackSize>(PACK_SIZES[1]);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "puff-puff",
    "samosa",
    "spring-roll",
    "gizzard",
  ]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Calculate live price based on size + selected premium additions
  const extraCost = selectedItems.reduce((acc, id) => {
    const item = PACK_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.extra * (selectedSize.pieces / 50) : 0);
  }, 0);

  const totalPrice = Math.round(selectedSize.basePrice + extraCost);

  const handleAddPack = () => {
    const selectedNames = selectedItems
      .map((id) => PACK_ITEMS.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    addItem({
      id: `party-pack-${selectedSize.pieces}-${Date.now()}`,
      name: `Small Chops Party Pack (${selectedSize.pieces} Pcs)`,
      price: totalPrice,
      image: "/images/products/small-chops.png",
      options: `Items included: ${selectedNames}`,
    });

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#A8324A", "#B7793F", "#FAF6F0"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="party-packs" className="py-16 md:py-24 bg-[#F1EAE0]/50 border-t border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#B7793F]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B7793F]">
              INTERACTIVE BUILDER
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase">
            BUILD YOUR PARTY PACK
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E625A]">
            Planning a birthday, church event, or office meetup in Jos? Choose your pack size,
            select your favourite small chops, and add it right to your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <Image
                src="/images/products/small-chops.png"
                alt="Small Chops Party Pack spread"
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.2)]"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3B2418]">
                {selectedSize.pieces} PIECE CELEBRATION TRAY
              </span>
              <p className="text-xs text-[#6E625A] mt-1">
                Delivered piping hot in insulated foil platters
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Selectors */}
          <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8DED1] shadow-lg">
            
            {/* Step 1: Pack Size Selector */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-[0.18em] font-bold text-[#3B2418] mb-3">
                1. SELECT PACK SIZE
              </label>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {PACK_SIZES.map((pack) => {
                  const isSelected = selectedSize.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedSize(pack)}
                      className={`relative p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#A8324A] bg-[#A8324A]/5 shadow-xs"
                          : "border-[#E8DED1] bg-[#F1EAE0]/40 hover:border-[#B7793F]"
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#B7793F] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                          POPULAR
                        </span>
                      )}
                      <span className="block font-heading text-lg sm:text-2xl text-[#3B2418]">
                        {pack.pieces} PCS
                      </span>
                      <span className="block text-xs font-medium text-[#6E625A] mt-1">
                        From {formatNaira(pack.basePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Items checklist */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-[0.18em] font-bold text-[#3B2418] mb-3">
                2. CHOOSE YOUR CHOP SELECTION (TICK ALL YOU LIKE)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PACK_ITEMS.map((item) => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#B7793F] bg-[#FAF6F0] shadow-xs"
                          : "border-[#E8DED1] bg-[#F1EAE0]/30 hover:border-[#E8DED1]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-[#A8324A] border-[#A8324A] text-white"
                              : "border-[#3B2418]/30 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#2E2520]">
                          {item.name}
                        </span>
                      </div>
                      {item.extra > 0 && (
                        <span className="text-[11px] font-semibold text-[#B7793F]">
                          +{formatNaira(item.extra * (selectedSize.pieces / 50))}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Calculation & Add to order */}
            <div className="pt-6 border-t border-[#E8DED1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#6E625A] block">
                  Estimated Total for {selectedSize.pieces} Pieces
                </span>
                <span className="font-heading text-3xl sm:text-4xl text-[#3B2418]">
                  {formatNaira(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleAddPack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Pack to Order</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
