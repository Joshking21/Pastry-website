import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { MENU_ITEMS } from "@/data/menu";
import { FlourDust } from "@/components/FlourDust";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    }, 200);
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 lg:py-12 min-h-[calc(100vh-140px)] flex items-center">
      {/* Background flour particles drifting (desktop only) */}
      <FlourDust />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Big condensed typography and calls to action */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-400 ease-out ${
              isExiting ? "opacity-0 -translate-x-12" : "opacity-100 translate-x-0"
            }`}
          >
            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 mb-2 sm:mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-caramel" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-muted">
                {siteConfig.tagline}
              </span>
            </motion.div>

            {/* Giant condensed two-line headline with word reveal (Job 4.2) */}
            <h1 className="font-heading text-[clamp(3.2rem,7.8vw,7.6rem)] leading-[0.92] tracking-[0.03em] uppercase">
              <span className="block text-heading">
                {siteConfig.heroHeadline[0].split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block text-caramel mt-1">
                {siteConfig.heroHeadline[1].split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 + 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 md:mt-5 text-base sm:text-lg text-text max-w-xl font-normal leading-relaxed"
            >
              Every golden pie, flaky sausage roll, and celebratory treat is hand-crafted
              fresh to order. Made with wholesome ingredients and baked to golden perfection.
            </motion.p>

            {/* Actions: Underlined CTA link and WhatsApp pill button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="mt-7 md:mt-8 flex flex-wrap items-center gap-5 sm:gap-7"
            >
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

              <motion.a
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappGreetings.hero
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Hero Product Cut-out that bleeds slightly off right edge on desktop */}
          <div
            className={`lg:col-span-5 relative flex items-center justify-center lg:justify-end lg:-mr-10 transition-all duration-400 ease-out ${
              isExiting ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
            }`}
          >
            <div className="relative w-full max-w-[460px] lg:max-w-[580px] aspect-square flex items-center justify-center group">
              {/* Product cutout with gentle float (Job 4.2) */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src="/images/products/hero-meat-pie.png"
                  alt="Golden Nigerian Meat Pie broken open showing minced beef, potato and carrot filling"
                  width={1400}
                  height={1400}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/products/meat-pie.png";
                  }}
                />

                {/* Floating price badge attached safely to the pie wrapper (Job 2.5: avoid collision) */}
                {heroMeatPie && (
                  <div className="absolute bottom-4 left-4 sm:left-8 bg-bg border border-border shadow-md px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-heading tracking-wider text-heading">
                      {heroMeatPie.name.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-caramel">
                      ₦{heroMeatPie.price.toLocaleString("en-NG")}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
