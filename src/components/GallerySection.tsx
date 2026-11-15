"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
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
    subtitle: "Silky Swiss buttercream flowers and piped rosettes",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/gallery-4.jpg",
    title: "Packaged With Care",
    subtitle: "Sealed kraft boxes tied with ribbon for dispatch",
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
    subtitle: "Freshly swirled vanilla bean & red velvet sponges",
    span: "col-span-1 md:col-span-2 md:row-span-1",
  },
];

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    if (activeImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeImage]);

  return (
    <section id="gallery" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793F]">
            VISUAL FEAST
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase mt-1">
            MOMENTS IN THE KITCHEN
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E625A]">
            A glimpse into the daily oven batches, careful boxing, and bespoke cake styling.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-[#E8DED1] bg-[#FAF6F0] shadow-sm hover:shadow-lg transition-all ${
                img.span || ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2418]/80 via-[#3B2418]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-xl sm:text-2xl">{img.title}</h4>
                    <p className="text-xs text-white/80 mt-0.5">{img.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full z-10 bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#E8DED1] shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[4/3] max-h-[70vh]">
                <Image
                  src={activeImage.src}
                  alt={activeImage.title}
                  fill
                  className="object-contain bg-black/5"
                />
              </div>

              <div className="p-4 sm:p-6 bg-[#FAF6F0] border-t border-[#E8DED1]">
                <h3 className="font-heading text-2xl text-[#3B2418]">
                  {activeImage.title}
                </h3>
                <p className="text-sm text-[#6E625A] mt-1">
                  {activeImage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
