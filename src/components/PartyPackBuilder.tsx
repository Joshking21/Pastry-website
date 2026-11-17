import React, { useState, useRef } from "react";
import { useCart, formatNaira } from "@/context/CartContext";
import { Check, ShoppingBag, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { themeColors } from "@/context/ThemeContext";
import { flyToCart } from "@/lib/flyToCart";

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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const packImgRef = useRef<HTMLImageElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const extraCost = selectedItems.reduce((acc, id) => {
    const item = PACK_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.extra * (selectedSize.pieces / 50) : 0);
  }, 0);

  const totalPrice = Math.round(selectedSize.basePrice + extraCost);

  const handleAddPack = () => {
    flyToCart(packImgRef.current, "/images/products/small-chops.png");
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

    import("canvas-confetti")
      .then((mod) => {
        const confetti = mod.default;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: themeColors(),
        });
      })
      .catch(() => {});
  };

  return (
    <section
      id="party-packs"
      ref={sectionRef}
      className="py-16 md:py-24 bg-surface/50 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-caramel" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-caramel">
              INTERACTIVE BUILDER
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase">
            BUILD YOUR PARTY PACK
          </h2>
          <p className="mt-3 text-base text-muted">
            Planning a celebration, office gathering, or event? Choose your pack size,
            select your favourite small chops, and add it right to your basket.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image preview with parallax and soft float (Job 4.2) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              style={{ y: parallaxY }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  ref={packImgRef}
                  src="/images/products/small-chops.png"
                  alt="Small Chops Party Pack spread"
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/products/hero-meat-pie.png";
                  }}
                />
              </motion.div>
            </motion.div>
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-heading">
                {selectedSize.pieces} PIECE CELEBRATION TRAY
              </span>
              <p className="text-base text-muted mt-1">
                Delivered piping hot in insulated packaging
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Selectors */}
          <Reveal from="right" className="lg:col-span-7 bg-bg rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-lg">
            
            {/* Step 1: Pack Size Selector with spring scale and animated border */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.18em] font-bold text-heading mb-3">
                1. SELECT PACK SIZE
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {PACK_SIZES.map((pack) => {
                  const isSelected = selectedSize.id === pack.id;
                  return (
                    <motion.button
                      key={pack.id}
                      whileTap={{ scale: 0.96 }}
                      animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => setSelectedSize(pack)}
                      className={`relative p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer min-h-[44px] ${
                        isSelected
                          ? "border-accent bg-accent/10 ring-2 ring-accent/30 shadow-sm"
                          : "border-border bg-surface/40 hover:border-caramel"
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-on-accent text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                          POPULAR
                        </span>
                      )}
                      <span className="block font-heading text-lg sm:text-2xl text-heading">
                        {pack.pieces} PCS
                      </span>
                      <span className="block text-xs font-medium text-muted mt-1">
                        From {formatNaira(pack.basePrice)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Items checklist */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.18em] font-bold text-heading mb-3">
                2. CHOOSE YOUR CHOP SELECTION (TICK ALL YOU LIKE)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PACK_ITEMS.map((item) => {
                  const isChecked = selectedItems.includes(item.id);
                  return (
                    <motion.button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      whileTap={{ scale: 0.97 }}
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 min-h-[44px] rounded-xl border flex items-center justify-between text-left cursor-pointer transition-all ${
                        isChecked
                          ? "border-caramel bg-bg shadow-xs"
                          : "border-border bg-surface/30 hover:border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-accent border-accent text-on-accent"
                              : "border-heading/30 bg-bg"
                          }`}
                        >
                          <AnimatePresence>
                            {isChecked && (
                              <motion.span
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-text">
                          {item.name}
                        </span>
                      </div>
                      {item.extra > 0 && (
                        <span className="text-[11px] font-semibold text-caramel">
                          +{formatNaira(item.extra * (selectedSize.pieces / 50))}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Price Calculation & Add to order */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted block">
                  Estimated Total for {selectedSize.pieces} Pieces
                </span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.25, color: "var(--color-accent)" }}
                  animate={{ scale: 1, color: "var(--color-heading)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="block origin-left font-heading text-3xl sm:text-4xl text-heading"
                >
                  {formatNaira(totalPrice)}
                </motion.span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddPack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-on-accent font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer btn-shine"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Pack to Order</span>
              </motion.button>
            </div>

          </Reveal>
        </div>

      </div>
    </section>
  );
};
