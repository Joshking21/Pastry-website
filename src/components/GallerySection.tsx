import React, { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealItem } from "@/components/Reveal";

interface GalleryImage {
  src: string;
  title: string;
  subtitle: string;
  span?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery-1.jpg",
    title: "Hand-Crafted Dough",
    subtitle: "Rolled to delicate perfection on our floured counter",
    span: "col-span-1 md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    title: "Fresh From The Oven",
    subtitle: "Golden, bubbling meat pies cooling on the rack",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-3.jpg",
    title: "Artisan Cake Piping",
    subtitle: "Silky buttercream flowers and piped rosettes",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Packaged With Care",
    subtitle: "Kraft boxes tied with ribbon for delivery",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-5.jpg",
    title: "Party Tray Platter",
    subtitle: "Puff-puff, crispy samosas & spicy gizzard skewers",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-6.jpg",
    title: "Cupcake Gift Boxes",
    subtitle: "Freshly swirled buttercream cupcake assortment",
    span: "col-span-1 md:col-span-2 md:row-span-1",
  },
];

export const GallerySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const isOpen = activeIdx !== null;

  const prevImage = useCallback(() => {
    setDirection(-1);
    setActiveIdx((i) => (i === null ? i : i > 0 ? i - 1 : GALLERY_IMAGES.length - 1));
  }, []);

  const nextImage = useCallback(() => {
    setDirection(1);
    setActiveIdx((i) => (i === null ? i : i < GALLERY_IMAGES.length - 1 ? i + 1 : 0));
  }, []);

  // Lock scroll + keyboard controls only while the lightbox is open, and restore
  // whatever overflow value was there before (other dialogs may also lock it).
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    const prevOverflow = document.body.style.overflow;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, prevImage, nextImage]);

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel">
            VISUAL FEAST
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase mt-1">
            MOMENTS IN THE KITCHEN
          </h2>
          <p className="mt-2 text-base text-muted">
            A glimpse into our oven batches, careful boxing, and cake styling.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <Reveal stagger={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <RevealItem from="zoom" key={idx} className={img.span || ""}>
            <button
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveIdx(idx);
              }}
              aria-label={`View photo: ${img.title}`}
              className="relative w-full h-full block text-left rounded-2xl overflow-hidden group cursor-pointer border border-border bg-bg shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/products/meat-pie.png";
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 contrast-[1.02] brightness-[0.98]"
              />

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-heading text-xl sm:text-2xl">{img.title}</span>
                    <span className="block text-sm text-white/90 mt-0.5">{img.subtitle}</span>
                  </div>
                  <div className="size-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </button>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Photo viewer">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              className="fixed inset-0 bg-black/80 cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full z-10 bg-bg rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col"
            >
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 z-20 size-11 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Prev / Next controls */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              <div className="relative w-full aspect-[4/3] max-h-[70vh] flex items-center justify-center bg-black/10 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={activeIdx}
                    custom={direction}
                    initial={{ x: `${direction * 60}%`, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: `${direction * -60}%`, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    src={GALLERY_IMAGES[activeIdx].src}
                    alt={GALLERY_IMAGES[activeIdx].title}
                    className="w-full h-full object-contain contrast-[1.02] brightness-[0.98]"
                  />
                </AnimatePresence>
              </div>

              <div className="p-4 sm:p-6 bg-bg border-t border-border">
                <h3 className="font-heading text-2xl text-heading">
                  {GALLERY_IMAGES[activeIdx].title}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {GALLERY_IMAGES[activeIdx].subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
