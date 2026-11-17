import React, { useEffect, useRef } from "react";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { flyToCart } from "@/lib/flyToCart";

interface ProductDetailProps {
  product: MenuItem;
  onClose: () => void;
  triggerElementRef?: React.RefObject<HTMLElement | null>;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  triggerElementRef,
}) => {
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);
  const desktopImgRef = useRef<HTMLDivElement | null>(null);
  const mobileImgRef = useRef<HTMLDivElement | null>(null);

  // Keep the latest onClose in a ref so the effect below runs once per open,
  // not on every parent re-render (that used to steal focus after each "Add").
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const currentQty = getItemQuantity(product.id);

  const handleAdd = (imgWrap: HTMLDivElement | null) => {
    flyToCart(imgWrap?.querySelector("img"), product.image);
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  // Escape to close everywhere. On mobile the detail is a full-screen sheet, so
  // there we also lock page scroll and trap focus. On desktop it sits inline in
  // the menu, so the page must stay scrollable.
  useEffect(() => {
    const isMobileSheet = window.matchMedia("(max-width: 767px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (isMobileSheet) document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      (isMobileSheet ? mobileCloseBtnRef : closeBtnRef).current?.focus({ preventScroll: true });
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (isMobileSheet && e.key === "Tab" && mobileSheetRef.current) {
        const focusables = mobileSheetRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      if (isMobileSheet) document.body.style.overflow = prevOverflow;
      // Return focus to the triggering card if it is still in the page
      const trigger = triggerElementRef?.current;
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [triggerElementRef]);

  return (
    <div
      role="region"
      aria-labelledby={`product-title-${product.id}`}
      className="relative w-full z-30"
    >
      {/* DESKTOP & TABLET VIEW (md:): In-place on the same light surface, taking over menu area without dark backdrop */}
      <div className="hidden md:block w-full min-h-[580px] relative py-4">
        {/* Round 48px outlined ✕ close button at top right */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-2 right-2 z-40 size-12 rounded-full border border-heading/30 bg-bg hover:border-heading hover:bg-surface text-heading flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Close product details"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Shared Layout Image Flight + Secondary Sliced View */}
          <div className="col-span-6 flex flex-col items-center justify-center relative">
            {/* Main Product Image (Travelling via layoutId) */}
            <motion.div
              ref={desktopImgRef}
              layoutId={`product-image-${product.id}`}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center z-10"
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                loading="eager"
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/products/hero-meat-pie.png";
                }}
              />
            </motion.div>

            {/* If detailImage exists, display below and slightly offset as in inspo/04 */}
            {product.detailImage && product.detailImage !== product.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative -mt-16 sm:-mt-20 ml-16 w-full max-w-[340px] aspect-square flex items-center justify-center z-20"
              >
                <img
                  src={product.detailImage}
                  alt={`${product.name} sliced view showing filling`}
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.22)] select-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Right Column: Text, Specs Row, Price & Quantity Stepper */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="col-span-6 flex flex-col justify-center text-left pr-6 lg:pr-12"
          >
            {/* Category and tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-caramel">
                {product.category}
              </span>
              {product.tag && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-caramel text-caramel">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Giant condensed title */}
            <h2
              id={`product-title-${product.id}`}
              className="font-heading text-4xl lg:text-6xl text-heading leading-[0.93] tracking-[0.03em] uppercase"
            >
              {product.name}
            </h2>

            {/* Description */}
            <p className="mt-4 text-base text-text leading-relaxed max-w-lg">
              {product.description}
            </p>

            {/* What's Inside row styled like inspo/04 nutrition columns: Caramel condensed label with value below */}
            <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4">
              {product.inside.filling && (
                <div>
                  <span className="block font-heading text-xs text-caramel tracking-wider">
                    FILLING
                  </span>
                  <span className="block text-xs sm:text-sm text-text font-medium mt-1 leading-snug">
                    {product.inside.filling}
                  </span>
                </div>
              )}

              {product.inside.size && (
                <div>
                  <span className="block font-heading text-xs text-caramel tracking-wider">
                    SIZE
                  </span>
                  <span className="block text-xs sm:text-sm text-text font-medium mt-1 leading-snug">
                    {product.inside.size}
                  </span>
                </div>
              )}

              {product.inside.pack && (
                <div>
                  <span className="block font-heading text-xs text-caramel tracking-wider">
                    PACK
                  </span>
                  <span className="block text-xs sm:text-sm text-text font-medium mt-1 leading-snug">
                    {product.inside.pack}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions: Large thin-weight price + quantity stepper + Add pill */}
            <div className="mt-10 pt-6 border-t border-border flex items-center justify-between gap-6">
              {/* Thin weight Naira Price (rendered as one string in one font per Job 2.5) */}
              <span className="font-heading text-4xl lg:text-5xl font-light tracking-tight text-heading">
                ₦{product.price.toLocaleString("en-NG")}
              </span>

              {/* Add pill or 44px stepper */}
              {currentQty > 0 ? (
                <div className="flex items-center gap-2 bg-surface rounded-full p-1 border border-border shadow-xs">
                  <button
                    onClick={() => updateQuantity(product.id, currentQty - 1)}
                    className="size-11 rounded-full bg-bg hover:bg-bg/80 text-heading flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-heading text-xl px-3 text-heading min-w-[2rem] text-center">
                    {currentQty}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, currentQty + 1)}
                    className="size-11 rounded-full bg-accent text-on-accent hover:bg-accent-hover flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAdd(desktopImgRef.current)}
                  className="inline-flex items-center gap-2 px-8 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-on-accent font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer btn-shine"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </motion.button>
              )}
            </div>

          </motion.div>

        </div>
      </div>

      {/* MOBILE FULL-SCREEN SHEET (<768px). Portalled to <body> so it sits above the
          header and the floating WhatsApp button instead of inside the menu's stacking context. */}
      {createPortal(
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        ref={mobileSheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-title-mobile-${product.id}`}
        className="md:hidden fixed inset-0 z-50 bg-bg overflow-y-auto flex flex-col justify-between"
      >
        <div>
          {/* Mobile Header with ✕ close button */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-bg/95 border-b border-border">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-caramel">
              {product.category}
            </span>
            <button
              ref={mobileCloseBtnRef}
              onClick={onClose}
              className="size-11 rounded-full border border-heading/30 bg-bg flex items-center justify-center text-heading cursor-pointer"
              aria-label="Close product details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Image */}
          <div className="p-6 flex flex-col items-center justify-center">
            <div ref={mobileImgRef} className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                loading="eager"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(59,36,24,0.2)]"
              />
            </div>

            {product.detailImage && product.detailImage !== product.image && (
              <div className="relative -mt-12 ml-10 w-full max-w-[220px] aspect-square flex items-center justify-center">
                <img
                  src={product.detailImage}
                  alt={`${product.name} sliced view`}
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(59,36,24,0.2)]"
                />
              </div>
            )}
          </div>

          {/* Mobile Details */}
          <div className="p-6 pb-28">
            <h2
              id={`product-title-mobile-${product.id}`}
              className="font-heading text-3xl sm:text-4xl text-heading leading-tight"
            >
              {product.name}
            </h2>

            <p className="mt-3 text-base text-text leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
              {product.inside.filling && (
                <div>
                  <span className="block font-heading text-xs text-caramel">FILLING</span>
                  <span className="block text-sm text-text font-medium mt-0.5">
                    {product.inside.filling}
                  </span>
                </div>
              )}
              {product.inside.size && (
                <div>
                  <span className="block font-heading text-xs text-caramel">SIZE</span>
                  <span className="block text-sm text-text font-medium mt-0.5">
                    {product.inside.size}
                  </span>
                </div>
              )}
              {product.inside.pack && (
                <div>
                  <span className="block font-heading text-xs text-caramel">PACK</span>
                  <span className="block text-sm text-text font-medium mt-0.5">
                    {product.inside.pack}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Bottom Bar with price and 44px Add button / stepper */}
        <div className="sticky bottom-0 z-20 p-4 bg-surface border-t border-border flex items-center justify-between">
          <span className="font-heading text-3xl font-light text-heading">
            ₦{product.price.toLocaleString("en-NG")}
          </span>

          {currentQty > 0 ? (
            <div className="flex items-center gap-2 bg-bg rounded-full p-1 border border-border">
              <button
                onClick={() => updateQuantity(product.id, currentQty - 1)}
                className="size-11 rounded-full bg-surface text-heading flex items-center justify-center cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading text-lg px-2 text-heading min-w-[1.5rem] text-center">
                {currentQty}
              </span>
              <button
                onClick={() => updateQuantity(product.id, currentQty + 1)}
                className="size-11 rounded-full bg-accent text-on-accent flex items-center justify-center cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAdd(mobileImgRef.current)}
              className="inline-flex items-center gap-2 px-7 min-h-[44px] rounded-full bg-accent text-on-accent font-medium text-sm tracking-wide cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order</span>
            </motion.button>
          )}
        </div>
      </motion.div>,
      document.body
      )}
    </div>
  );
};
