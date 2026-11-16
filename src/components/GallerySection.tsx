"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const prevImage = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx(activeIdx > 0 ? activeIdx - 1 : GALLERY_IMAGES.length - 1);
    }
  }, [activeIdx]);

  const nextImage = useCallback(() => {
    if (activeIdx !== null) {
      setActiveIdx(activeIdx < GALLERY_IMAGES.length - 1 ? activeIdx + 1 : 0);
    }
  }, [activeIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    if (activeIdx !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIdx, prevImage, nextImage]);

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel">
            VISUAL FEAST
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase mt-1">
            MOMENTS IN THE KITCHEN
          </h2>
          <p className="mt-2 text-base text-muted">
            A glimpse into our oven batches, careful boxing, and cake styling.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-border bg-bg shadow-sm hover:shadow-lg transition-all ${
                img.span || ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay with info - Solid gradient without blur */}
              <div className="absolute inset-0 bg-gradient-to-t from-heading/85 via-heading/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl">{img.title}</h3>
                    <p className="text-base text-white/90 mt-0.5">{img.subtitle}</p>
                  </div>
                  <div className="size-11 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Clean solid overlay without glassmorphism) */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              className="fixed inset-0 bg-heading/80 cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full z-10 bg-bg rounded-2xl overflow-hidden border border-border shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 z-20 size-11 rounded-full bg-heading/60 hover:bg-heading/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-heading/60 hover:bg-heading/80 text-white flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-heading/60 hover:bg-heading/80 text-white flex items-center justify-center cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative w-full aspect-[4/3] max-h-[70vh]">
                <Image
                  src={GALLERY_IMAGES[activeIdx].src}
                  alt={GALLERY_IMAGES[activeIdx].title}
                  fill
                  className="object-contain bg-black/5"
                />
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
