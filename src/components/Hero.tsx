"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { FlourDust } from "@/components/FlourDust";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 lg:py-28 min-h-[82vh] flex items-center">
      {/* Background flour particles drifting */}
      <FlourDust />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Big condensed typography and calls to action */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B7793F]" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#6E625A]">
                FRESHLY BAKED IN JOS · PLATEAU STATE
              </span>
            </div>

            {/* Giant condensed two-line headline */}
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] leading-[0.92] tracking-[0.03em] uppercase">
              <span className="block text-[#3B2418]">FRESH FROM</span>
              <span className="block text-[#B7793F] mt-1">JULIET&apos;S OVEN</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="mt-6 md:mt-7 text-base sm:text-lg text-[#2E2520]/90 max-w-xl font-normal leading-relaxed">
              Every golden pie, flaky sausage roll, and celebratory treat is hand-crafted
              fresh from scratch in our Jos kitchen. No preservatives, no shortcuts—just pure,
              comforting Nigerian pastry goodness.
            </p>

            {/* Actions: Underlined CTA link and WhatsApp pill button */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
              <a
                href="#menu"
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-2.5 font-heading text-lg sm:text-xl text-[#3B2418] hover:text-[#A8324A] tracking-[0.14em] uppercase transition-colors"
              >
                <span className="border-b-2 border-[#3B2418] group-hover:border-[#A8324A] pb-0.5 transition-colors">
                  SEE WHAT&apos;S BAKING
                </span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Juliet! I visited your website and would like to order fresh pastries 🧁"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust badge under CTA */}
            <div className="mt-8 pt-6 border-t border-[#E8DED1]/70 flex flex-wrap items-center gap-6 text-xs text-[#6E625A]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-[#A8324A]">✓</span> Same-day baking
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-[#A8324A]">✓</span> Doorstep delivery across Jos
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="text-[#A8324A]">✓</span> Party & bulk discounts
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Product Cut-out */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Soft radiant ambient glow behind pastry */}
            <div className="absolute inset-0 -m-8 rounded-full bg-radial from-[#F1EAE0]/80 via-[#FAF6F0]/0 to-transparent blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-square flex items-center justify-center group">
              {/* Product cutout */}
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/products/hero-meat-pie.png"
                  alt="Golden Nigerian Meat Pie broken open showing beef, potato and carrot filling"
                  width={1400}
                  height={1400}
                  priority
                  className="w-full h-auto object-contain drop-shadow-[0_25px_30px_rgba(59,36,24,0.22)] select-none"
                />
              </div>

              {/* Floating feature pill badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-3 right-4 sm:right-8 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#B7793F]/40 shadow-md px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#A8324A] animate-pulse" />
                <span className="text-xs font-heading tracking-wider text-[#3B2418]">
                  SIGNATURE BEEF &amp; POTATO PIE
                </span>
                <span className="text-xs font-semibold text-[#B7793F]">₦1,200</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
