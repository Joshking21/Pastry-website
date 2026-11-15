"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { MENU_ITEMS, CATEGORIES, Category, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Tabs */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793F] mb-2">
            FRESH FROM THE OVEN
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] tracking-[0.04em] uppercase">
            OUR BAKERY MENU
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E625A] max-w-lg">
            Tap any pastry to inspect the filling, size, and pack options. Add to your cart
            and checkout effortlessly on WhatsApp.
          </p>

          {/* Category Tabs: Centered uppercase letter-spaced links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-b border-[#E8DED1] pb-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative pb-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer ${
                    isActive ? "text-[#A8324A]" : "text-[#6E625A] hover:text-[#3B2418]"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#A8324A] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Slider Controls (Top-right or inline) */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-[#6E625A] font-medium tracking-wider uppercase">
            Showing {filteredItems.length} delicacies · Swipe or scroll
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              className="w-10 h-10 rounded-full border border-[#3B2418]/25 bg-[#FAF6F0] hover:bg-[#F1EAE0] text-[#3B2418] flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
              aria-label="Previous pastries"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="w-10 h-10 rounded-full border border-[#3B2418]/25 bg-[#FAF6F0] hover:bg-[#F1EAE0] text-[#3B2418] flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
              aria-label="Next pastries"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track: 3 cards on desktop, 2 on tablet, 1 on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            ref={carouselRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="snap-start shrink-0 w-[84vw] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col justify-between group"
                  data-cursor-hover
                >
                  <div>
                    {/* Top Tag & Product Name sitting ABOVE the image */}
                    <div className="min-h-[78px] flex flex-col justify-end">
                      {item.tag && (
                        <div className="mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#B7793F] text-[#B7793F] inline-block">
                            {item.tag}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="text-left group/title cursor-pointer"
                      >
                        <h3 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] text-[#3B2418] leading-[0.95] tracking-[0.03em] uppercase group-hover/title:text-[#A8324A] transition-colors">
                          {item.name}
                        </h3>
                      </button>
                    </div>

                    {/* Product Cut-out image slightly overlapping the title base */}
                    <div
                      onClick={() => setSelectedProduct(item)}
                      className="relative -mt-3 w-full aspect-square flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    >
                      <motion.div
                        layoutId={`product-image-${item.id}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={600}
                          height={600}
                          className="w-full h-auto max-h-[290px] object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none pointer-events-none"
                        />
                      </motion.div>
                    </div>

                    {/* Description below image */}
                    <p className="mt-2 text-xs sm:text-sm text-[#6E625A] line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price and Crimson Pill Add Button */}
                  <div className="mt-5 pt-4 border-t border-[#E8DED1]/70 flex items-center justify-between">
                    {/* Thin weight Naira price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm sm:text-base font-light text-[#3B2418]">₦</span>
                      <span className="text-2xl sm:text-3xl font-light tracking-tight text-[#3B2418]">
                        {item.price.toLocaleString("en-NG")}
                      </span>
                    </div>

                    {/* Button / Stepper */}
                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-[#F1EAE0] rounded-full p-1 border border-[#B7793F]/40 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="w-7 h-7 rounded-full bg-[#FAF6F0] hover:bg-[#FAF6F0]/80 text-[#3B2418] flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-heading text-sm px-1.5 text-[#3B2418]">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="w-7 h-7 rounded-full bg-[#A8324A] text-white hover:bg-[#8D253B] flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-xs tracking-wider transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
