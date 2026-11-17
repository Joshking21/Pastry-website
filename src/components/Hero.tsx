import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { MENU_ITEMS } from "@/data/menu";
import { FlourDust } from "@/components/FlourDust";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const wordVariants = {
  hidden: { y: "0.6em", opacity: 0, rotate: 8, filter: "blur(8px)" },
  show: { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)" },
};

export const Hero: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const heroMeatPie = MENU_ITEMS.find((item) => item.id === "meat-pie");

  // Pastry leans gently toward the pointer (desktop mice only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const pieX = useTransform(sx, (v) => v * 22);
  const pieY = useTransform(sy, (v) => v * 16);
  const pieRotY = useTransform(sx, (v) => v * 10);
  const pieRotX = useTransform(sy, (v) => v * -8);
  const blobX = useTransform(sx, (v) => v * -30);
  const blobY = useTransform(sy, (v) => v * -24);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsExiting(false), 500);
    }, 200);
  };

  const renderWords = (line: string, baseDelay: number) =>
    line.split(" ").map((word, i) => (
      <motion.span
        key={i}
        variants={wordVariants}
        initial="hidden"
        animate="show"
        transition={{ type: "spring", stiffness: 180, damping: 16, delay: baseDelay + 0.09 * i }}
        className="inline-block mr-3 origin-bottom-left"
      >
        {word}
      </motion.span>
    ));

  return (
    <section
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 lg:py-12 min-h-[calc(100vh-140px)] flex items-center"
    >
      {/* Background flour particles drifting (desktop only) */}
      <FlourDust />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Column: headline and calls to action */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-400 ease-out ${
              isExiting ? "opacity-0 -translate-x-12" : "opacity-100 translate-x-0"
            }`}
          >
            {/* Tagline pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-2 sm:mb-3"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-caramel opacity-60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-caramel" />
              </span>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-muted">
                {siteConfig.tagline}
              </span>
            </motion.div>

            {/* Giant two-line headline: each word springs up into place */}
            <h1 className="font-heading text-[clamp(3.2rem,7.8vw,7.6rem)] leading-[0.92] tracking-[0.03em] uppercase">
              <span className="block text-heading">{renderWords(siteConfig.heroHeadline[0], 0.1)}</span>
              <span className="block text-caramel mt-1">
                {renderWords(siteConfig.heroHeadline[1], 0.35)}
                {/* Hand-drawn underline that draws itself */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="block w-[min(80%,520px)] h-[0.18em] -mt-[0.05em] text-accent"
                >
                  <motion.path
                    d="M4 14 C 60 4, 120 4, 170 10 S 260 18, 296 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 md:mt-5 text-base sm:text-lg text-text max-w-xl font-normal leading-relaxed"
            >
              Every golden pie, flaky sausage roll, and celebratory treat is hand-crafted
              fresh to order. Made with wholesome ingredients and baked to golden perfection.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.75 }}
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
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </a>

              <motion.a
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.04, y: -2 }}
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.whatsappGreetings.hero
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-on-accent font-medium text-sm sm:text-base tracking-wide transition-colors shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order on WhatsApp</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: hero pastry */}
          <div
            className={`lg:col-span-5 relative flex items-center justify-center lg:justify-end lg:-mr-10 transition-all duration-400 ease-out ${
              isExiting ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
            }`}
            style={{ perspective: 1000 }}
          >
            <div className="relative w-full max-w-[460px] lg:max-w-[580px] aspect-square flex items-center justify-center">
              {/* Morphing theme-coloured blobs */}
              <motion.div aria-hidden="true" style={{ x: blobX, y: blobY }} className="absolute inset-[8%] pointer-events-none">
                <div className="absolute inset-0 animate-blob bg-gradient-to-br from-caramel/35 via-accent/20 to-transparent blur-2xl" />
                <div
                  className="absolute inset-[12%] animate-blob bg-gradient-to-tr from-accent/25 to-caramel/10 blur-xl"
                  style={{ animationDelay: "-6s", animationDuration: "18s" }}
                />
              </motion.div>

              {/* Rotating "fresh daily" stamp */}
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 14, delay: 1.1 }}
                className="absolute top-[4%] right-[6%] z-30 size-24 sm:size-28 pointer-events-none"
              >
                <div className="absolute inset-0 rounded-full bg-accent shadow-xl shadow-accent/30" />
                <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-on-accent">
                  <defs>
                    <path id="stamp-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <text fill="currentColor" style={{ fontFamily: "var(--font-heading)", fontSize: 10 }}>
                    {/* textLength = circle circumference (2π·36 ≈ 226) so the ring closes exactly */}
                    <textPath href="#stamp-circle" textLength="222" lengthAdjust="spacingAndGlyphs">
                      BAKED FRESH DAILY • MADE WITH LOVE •
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl">🥧</span>
              </motion.div>

              {/* Pastry: spins in, then floats and leans toward the pointer */}
              <motion.div
                initial={{ scale: 0.55, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 13, delay: 0.25 }}
                style={{ x: pieX, y: pieY, rotateX: pieRotX, rotateY: pieRotY }}
                className="relative w-full h-full"
              >
                <motion.div
                  animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/images/products/hero-meat-pie.png"
                    alt="Golden Nigerian Meat Pie broken open showing minced beef, potato and carrot filling"
                    width={1400}
                    height={1400}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-auto object-contain drop-shadow-[0_24px_30px_rgba(59,36,24,0.25)] select-none"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/products/meat-pie.png";
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Price badge pops in */}
              {heroMeatPie && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 1.3 }}
                  className="absolute bottom-4 left-4 sm:left-8 z-30 bg-bg border border-border shadow-lg px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-heading tracking-wider text-heading">
                    {heroMeatPie.name.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-caramel">
                    ₦{heroMeatPie.price.toLocaleString("en-NG")}
                  </span>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
