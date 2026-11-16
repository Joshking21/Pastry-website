"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { MENU_ITEMS } from "@/data/menu";
import { FlourDust } from "@/components/FlourDust";
import { ArrowRight, MessageCircle } from "lucide-react";

export const Hero: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const heroMeatPie = MENU_ITEMS.find((item) => item.id === "meat-pie");

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      const menuEl = document.getElementById("menu");
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => setIsExiting(false), 500);
    }, 250);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:py-28 min-h-[82vh] flex items-center">
      {/* Background flour particles drifting */}
      <FlourDust />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Big condensed typography and calls to action */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-500 ease-out ${
              isExiting ? "opacity-0 -translate-x-20" : "opacity-100 translate-x-0"
            }`}
          >
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-caramel" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-muted">
                {siteConfig.tagline}
              </span>
            </div>

            {/* Giant condensed two-line headline filling ~half viewport width on desktop */}
            <h1 className="font-heading text-[clamp(3.5rem,8.5vw,8.5rem)] leading-[0.92] tracking-[0.03em] uppercase">
              <span className="block text-heading">{siteConfig.heroHeadline[0]}</span>
              <span className="block text-caramel mt-1">{siteConfig.heroHeadline[1]}</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="mt-5 md:mt-6 text-base sm:text-lg text-text max-w-xl font-normal leading-relaxed">
              Every golden pie, flaky sausage roll, and celebratory treat is hand-crafted
              fresh to order. Made with wholesome ingredients and baked to golden perfection.
            </p>

            {/* Actions: Underlined CTA link and WhatsApp pill button */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
              <a
                href="#menu"
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-2.5 font-heading text-lg sm:text-xl text-heading hover:text-accent tracking-[0.14em] uppercase transition-colors min-h-[44px]"
              >
                <span className="border-b-2 border-heading group-hover:border-accent pb-0.5 transition-colors">
                  SEE WHAT&apos;S BAKING
                </span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappGreetings.hero
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Product Cut-out that bleeds slightly off right edge on desktop */}
          <div
            className={`lg:col-span-5 relative flex items-center justify-center lg:justify-end lg:-mr-12 transition-all duration-500 ease-out ${
              isExiting ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
            }`}
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[620px] aspect-square flex items-center justify-center group">
              {/* Product cutout */}
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/products/hero-meat-pie.png"
                  alt="Golden Nigerian Meat Pie broken open showing minced beef, potato and carrot filling"
                  width={1400}
                  height={1400}
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 620px"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_30px_rgba(59,36,24,0.22)] select-none"
                />
              </div>

              {/* Solid clean pill badge without glassmorphism */}
              {heroMeatPie && (
                <div className="absolute -bottom-2 right-4 sm:right-8 bg-bg border border-border shadow-md px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-heading tracking-wider text-heading">
                    {heroMeatPie.name.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-caramel">
                    ₦{heroMeatPie.price.toLocaleString("en-NG")}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
