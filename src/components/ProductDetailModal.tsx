"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menu";
import { useCart, formatNaira } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addItem, getItemQuantity, updateQuantity } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [product, onClose]);

  if (!product) return null;

  const currentQty = getItemQuantity(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop on light warm surface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3B2418]/30 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Sheet / Container */}
        <motion.div
          layoutId={`product-card-${product.id}`}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF6F0] rounded-2xl md:rounded-3xl shadow-2xl border border-[#E8DED1] z-10 flex flex-col md:flex-row overflow-hidden"
          style={{
            backgroundImage: "url('/images/bg-texture.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "600px auto",
          }}
        >
          {/* Round Close Button in upper right corner */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full border border-[#3B2418]/30 bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] hover:border-[#3B2418] text-[#3B2418] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Product Cut-out Images (Whole + Cut/Open) */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col items-center justify-center bg-[#F1EAE0]/30 border-b md:border-b-0 md:border-r border-[#E8DED1]">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
            >
              <Image
                src={product.detailImage || product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.2)] select-none"
                priority
              />
            </motion.div>

            {/* Optional second mini angle or preview */}
            {product.detailImage && product.detailImage !== product.image && (
              <div className="mt-4 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl border border-[#B7793F]/40 p-1 bg-[#FAF6F0]">
                  <Image
                    src={product.image}
                    alt={`${product.name} whole`}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-16 h-16 rounded-xl border-2 border-[#A8324A] p-1 bg-[#FAF6F0]">
                  <Image
                    src={product.detailImage}
                    alt={`${product.name} open`}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-[#6E625A] uppercase">
                  Whole &amp; Sliced View
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Title, Details, What's Inside, Price & Add Stepper */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B7793F]">
                  {product.category}
                </span>
                {product.tag && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#B7793F] text-[#B7793F]">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Huge condensed title */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#3B2418] leading-[0.95] tracking-[0.04em]">
                {product.name}
              </h2>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-[#2E2520] leading-relaxed">
                {product.description}
              </p>

              {/* What's Inside row (replaces generic nutrition table) */}
              <div className="mt-6 pt-6 border-t border-[#E8DED1] space-y-3">
                <h4 className="text-xs uppercase tracking-[0.16em] font-bold text-[#3B2418]">
                  WHAT&apos;S INSIDE &amp; SPECS
                </h4>

                <div className="grid grid-cols-1 gap-2.5 text-xs text-[#2E2520]">
                  {product.inside.filling && (
                    <div className="flex items-start gap-2 bg-[#F1EAE0]/50 p-2.5 rounded-lg border border-[#E8DED1]/70">
                      <span className="font-bold text-[#3B2418] uppercase tracking-wider shrink-0">
                        FILLING:
                      </span>
                      <span className="text-[#6E625A]">{product.inside.filling}</span>
                    </div>
                  )}

                  {product.inside.size && (
                    <div className="flex items-start gap-2 bg-[#F1EAE0]/50 p-2.5 rounded-lg border border-[#E8DED1]/70">
                      <span className="font-bold text-[#3B2418] uppercase tracking-wider shrink-0">
                        SIZE:
                      </span>
                      <span className="text-[#6E625A]">{product.inside.size}</span>
                    </div>
                  )}

                  {product.inside.pack && (
                    <div className="flex items-start gap-2 bg-[#F1EAE0]/50 p-2.5 rounded-lg border border-[#E8DED1]/70">
                      <span className="font-bold text-[#3B2418] uppercase tracking-wider shrink-0">
                        PACK:
                      </span>
                      <span className="text-[#6E625A]">{product.inside.pack}</span>
                    </div>
                  )}

                  {product.inside.notes && (
                    <div className="flex items-start gap-2 bg-[#F1EAE0]/50 p-2.5 rounded-lg border border-[#E8DED1]/70">
                      <span className="font-bold text-[#3B2418] uppercase tracking-wider shrink-0">
                        NOTE:
                      </span>
                      <span className="text-[#6E625A]">{product.inside.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Price and Add Button / Quantity Stepper */}
            <div className="mt-8 pt-6 border-t border-[#E8DED1] flex items-center justify-between gap-4">
              {/* Thin weight Naira Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-light text-[#3B2418]">₦</span>
                <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#3B2418]">
                  {product.price.toLocaleString("en-NG")}
                </span>
              </div>

              {/* Add Button or Stepper */}
              {currentQty > 0 ? (
                <div className="flex items-center gap-3 bg-[#F1EAE0] rounded-full p-1 border border-[#B7793F]/40">
                  <button
                    onClick={() => updateQuantity(product.id, currentQty - 1)}
                    className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#FAF6F0]/80 text-[#3B2418] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-heading text-lg px-2 text-[#3B2418]">
                    {currentQty}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, currentQty + 1)}
                    className="w-9 h-9 rounded-full bg-[#A8324A] text-white hover:bg-[#8D253B] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
