import React, { useState, useRef, useEffect, useCallback } from "react";
import { MENU_ITEMS, CATEGORIES, Category, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { ProductDetail } from "@/components/ProductDetail";
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { flyToCart } from "@/lib/flyToCart";

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  // The carousel element is re-created on every category switch (keyed for the slide
  // animation) and the exiting copy unmounts *after* the new one mounts. A plain object
  // ref would be nulled by that late unmount, killing the arrows, so keep the latest
  // non-null element only.
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselEl, setCarouselEl] = useState<HTMLDivElement | null>(null);
  const setCarouselNode = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      carouselRef.current = node;
      setCarouselEl(node);
    }
  }, []);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const filteredItems =
    selectedCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = carouselEl;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons, carouselEl]);

  const scrollByCard = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector<HTMLElement>("[data-card]");
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const setDragStyles = (dragging: boolean) => {
    const el = carouselRef.current;
    if (!el) return;
    el.style.scrollBehavior = dragging ? "auto" : "";
    el.style.scrollSnapType = dragging ? "none" : "";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 4 && !hasDraggedRef.current) {
      hasDraggedRef.current = true;
      setDragStyles(true);
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onMouseUpOrLeave = () => {
    if (isDraggingRef.current && hasDraggedRef.current) {
      // Re-enable snapping so the track settles neatly on a card
      const el = carouselRef.current;
      setDragStyles(false);
      if (el) {
        const card = el.querySelector<HTMLElement>("[data-card]");
        const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "24") : 0;
        if (step) el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
      }
    }
    isDraggingRef.current = false;
  };

  const closeDetail = useCallback(() => setSelectedProduct(null), []);

  const handleCardClick = (item: MenuItem, element: HTMLElement) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    activeTriggerRef.current = element;
    setSelectedProduct(item);
  };

  const handleAdd = (item: MenuItem, sourceEl?: Element | null) => {
    flyToCart(sourceEl, item.image);
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 md:py-24 relative overflow-hidden">
      <LayoutGroup>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Category Filter Tabs */}
          <Reveal className="flex flex-col items-center text-center mb-10 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel mb-2">
              FRESH FROM THE OVEN
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading tracking-[0.04em] uppercase">
              OUR BAKERY MENU
            </h2>
            <p className="mt-3 text-base text-muted max-w-lg">
              Tap any pastry to inspect the filling, size, and pack options. Add to your basket
              and order effortlessly on WhatsApp.
            </p>

            {/* Category Tabs: Centered uppercase letter-spaced links with layoutId */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-b border-border pb-3">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedProduct(null);
                    }}
                    className={`relative pb-2 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer min-h-[44px] min-w-[44px] px-3.5 inline-flex items-center justify-center ${
                      isActive ? "text-accent" : "text-muted hover:text-heading"
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* If a product is selected on desktop/tablet, show detail view in place! */}
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <ProductDetail
                key={selectedProduct.id}
                product={selectedProduct}
                onClose={closeDetail}
                triggerElementRef={activeTriggerRef}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Carousel Controls */}
                <div className="flex items-center justify-end gap-3 mb-6">
                  <button
                    onClick={() => scrollByCard("left")}
                    disabled={!canScrollLeft}
                    className={`size-11 rounded-full border border-heading/20 bg-bg text-heading flex items-center justify-center transition-all shadow-xs ${
                      canScrollLeft
                        ? "hover:bg-surface active:scale-90 cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    aria-label="Previous pastry card"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollByCard("right")}
                    disabled={!canScrollRight}
                    className={`size-11 rounded-full border border-heading/20 bg-bg text-heading flex items-center justify-center transition-all shadow-xs ${
                      canScrollRight
                        ? "hover:bg-surface active:scale-90 cursor-pointer"
                        : "opacity-30 cursor-not-allowed"
                    }`}
                    aria-label="Next pastry card"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Carousel Track: 3 cards desktop, 2 tablet, 1 mobile with snap */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    ref={setCarouselNode}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUpOrLeave}
                    onMouseLeave={onMouseUpOrLeave}
                    className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none", overflowX: "auto" }}
                  >
                    {filteredItems.map((item, idx) => {
                      const qty = getItemQuantity(item.id);
                      const isAdded = justAddedId === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          data-card
                          initial={{ opacity: 0, y: 40, rotate: idx % 2 ? 2 : -2 }}
                          animate={{ opacity: 1, y: 0, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 22, delay: idx * 0.06 }}
                          whileHover={{ y: -8 }}
                          className="snap-start shrink-0 w-[84vw] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col justify-between group transition-shadow p-2"
                        >
                          <div>
                            {/* Product Name sitting ABOVE the image */}
                            <div className="min-h-[76px] flex flex-col justify-end relative z-10">
                              {item.tag && (
                                <div className="mb-1">
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-caramel text-caramel inline-block">
                                    {item.tag}
                                  </span>
                                </div>
                              )}

                              <button
                                onClick={(e) => handleCardClick(item, e.currentTarget)}
                                className="text-left group/title cursor-pointer w-full min-h-[44px] flex items-center"
                              >
                                <h3 className="font-heading text-[clamp(2rem,3.2vw,2.8rem)] text-heading leading-[0.93] tracking-[0.03em] uppercase group-hover/title:text-accent transition-colors">
                                  {item.name}
                                </h3>
                              </button>
                            </div>

                            {/* Product Cut-out image visibly overlapping bottom third of title */}
                            <div
                              onClick={(e) => handleCardClick(item, e.currentTarget)}
                              className="relative -mt-6 sm:-mt-8 w-full aspect-square flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 z-20"
                            >
                              {/* Themed "plate" that blooms behind the pastry on hover */}
                              <span
                                aria-hidden="true"
                                className="absolute inset-[14%] rounded-full bg-gradient-to-br from-surface to-caramel/25 border border-border scale-75 opacity-60 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
                              />
                              <motion.div
                                layoutId={`product-image-${item.id}`}
                                className="relative w-full h-full flex items-center justify-center"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width={600}
                                  height={600}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-auto max-h-[290px] object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none pointer-events-none"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/images/products/hero-meat-pie.png";
                                  }}
                                />
                              </motion.div>
                            </div>

                            {/* Description below image (16px minimum on mobile) */}
                            <p className="mt-3 text-base text-muted line-clamp-3 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Price and Pill Add Button (Floating without box/border line) */}
                          <div className="mt-6 pt-2 flex items-center justify-between">
                            {/* Thin weight Naira price in one string and font (Job 2.5) */}
                            <span className="font-heading text-3xl font-light tracking-tight text-heading">
                              ₦{item.price.toLocaleString("en-NG")}
                            </span>

                            {/* Button / 44px Stepper with ✓ morph (Job 4.2) */}
                            {qty > 0 ? (
                              <div className="flex items-center gap-2 bg-surface rounded-full p-1 border border-border shadow-xs">
                                <button
                                  onClick={() => updateQuantity(item.id, qty - 1)}
                                  className="size-11 rounded-full bg-bg text-heading flex items-center justify-center transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-heading text-base px-2 text-heading min-w-[1.5rem] text-center">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, qty + 1)}
                                  className="size-11 rounded-full bg-accent text-on-accent hover:bg-accent-hover flex items-center justify-center transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={(e) => handleAdd(item, e.currentTarget.closest("[data-card]")?.querySelector("img"))}
                                className={`inline-flex items-center justify-center gap-1.5 px-6 min-h-[44px] min-w-[76px] rounded-full text-on-accent font-medium text-xs tracking-wider uppercase transition-all btn-shine shadow-xs hover:shadow-md cursor-pointer ${
                                  isAdded ? "bg-whatsapp" : "bg-accent hover:bg-accent-hover"
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Add</span>
                                  </>
                                )}
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </LayoutGroup>
    </section>
  );
};
