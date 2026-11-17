import React, { useState, useEffect } from "react";
import { siteConfig, customerReviews } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu as MenuIcon, X, Instagram, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("menu");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBounced, setCartBounced] = useState(false);

  // Bounce cart icon when totalCount increments
  useEffect(() => {
    if (totalCount > 0) {
      setCartBounced(true);
      const timer = setTimeout(() => setCartBounced(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  // Track scroll position for header shrink
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Single IntersectionObserver for scroll-spy (Job 2.2)
  useEffect(() => {
    const sectionIds = [
      "menu",
      "party-packs",
      "custom-cakes",
      "about",
      "gallery",
      "faq",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Map unlinked section (gallery) to nearest preceding nav item (about)
            const mappedId = id === "gallery" ? "about" : id;
            setActiveSection(mappedId);
            if (window.location.hash !== `#${mappedId}`) {
              window.history.replaceState(null, "", `#${mappedId}`);
            }
          }
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Consistent nav links for both Header and Footer (Job 2.5)
  const navLinks = [
    { name: "MENU", href: "#menu", id: "menu" },
    { name: "PARTY PACKS", href: "#party-packs", id: "party-packs" },
    { name: "CUSTOM CAKES", href: "#custom-cakes", id: "custom-cakes" },
    { name: "ABOUT", href: "#about", id: "about" },
    ...(customerReviews.length > 0 ? [{ name: "REVIEWS", href: "#reviews", id: "reviews" }] : []),
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-bg/95 backdrop-blur-md shadow-md border-b border-border/80"
          : "bg-bg/95 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar on desktop: Socials, Full Logo + Tagline, Cart */}
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-0 opacity-0 overflow-hidden py-0 border-b-0" : "py-3 sm:py-3.5 border-b border-border/60"
          }`}
        >
          {/* Top Left: Social links */}
          <div className="flex items-center gap-3 w-1/3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors flex items-center justify-center text-xs tracking-wider min-h-[44px] min-w-[44px]"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span className="hidden sm:inline font-medium ml-1.5">INSTAGRAM</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors flex items-center justify-center text-xs tracking-wider min-h-[44px] min-w-[44px]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline font-medium ml-1.5">WHATSAPP</span>
            </a>
          </div>

          {/* Center Brand Title & Tagline (Desktop expanded) */}
          <div className="text-center w-1/3 flex flex-col items-center justify-center">
            <a href="#" className="group inline-flex flex-col items-center justify-center min-h-[44px]">
              <span className="font-heading text-2xl sm:text-3xl lg:text-4xl text-heading tracking-[0.08em] whitespace-nowrap block transition-transform group-hover:scale-[1.02]">
                {siteConfig.name}
              </span>
              <span className="hidden sm:block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-caramel mt-0.5 whitespace-nowrap">
                {siteConfig.tagline}
              </span>
            </a>
          </div>

          {/* Top Right: Cart Button */}
          <div className="flex items-center justify-end gap-3 w-1/3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 min-h-[44px] min-w-[44px] text-heading hover:text-accent transition-colors flex items-center justify-end gap-2 group cursor-pointer"
              aria-label={`Cart with ${totalCount} items`}
            >
              <motion.div
                animate={cartBounced ? { scale: [1, 1.35, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <ShoppingBag className="w-5 h-5 text-heading group-hover:text-accent transition-colors" />
                {totalCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </motion.div>
              <span className="hidden md:inline font-heading text-sm text-heading tracking-wider">
                CART {totalCount > 0 && `(${totalCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Scrolled compact bar / Mobile bar (~64px-72px tall) */}
        <div className={`flex items-center justify-between ${isScrolled ? "py-2.5 sm:py-3" : "py-2.5 md:py-2"}`}>
          
          {/* Logo on compact bar (Visible when scrolled or on mobile) */}
          <div className={`${isScrolled ? "block" : "md:hidden"} flex items-center`}>
            <a href="#" className="font-heading text-xl sm:text-2xl text-heading tracking-[0.08em] whitespace-nowrap min-h-[44px] flex items-center">
              {siteConfig.name}
            </a>
          </div>

          {/* Desktop Nav Links with framer-motion layoutId underline */}
          <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 mx-auto">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs lg:text-[13px] font-semibold tracking-[0.16em] transition-colors py-2.5 min-h-[44px] flex items-center ${
                    isActive ? "text-accent" : "text-heading hover:text-caramel"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side for compact mode on desktop: compact cart icon */}
          {isScrolled && (
            <div className="hidden md:flex items-center justify-end">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 min-h-[44px] min-w-[44px] text-heading hover:text-accent transition-colors flex items-center gap-2 group cursor-pointer"
                aria-label={`Cart with ${totalCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-heading group-hover:text-accent transition-colors" />
                {totalCount > 0 && (
                  <span className="bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Mobile Right: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 min-h-[44px] min-w-[44px] text-heading hover:text-accent transition-colors flex items-center justify-center cursor-pointer"
              aria-label={`Cart with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] text-heading hover:text-accent transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg border-b border-border px-6 py-6 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-lg text-heading hover:text-accent tracking-wider py-2 min-h-[44px] border-b border-border/40 flex items-center justify-between"
                >
                  <span className={activeSection === link.id ? "text-accent" : ""}>
                    {link.name}
                  </span>
                  <span className="text-xs text-caramel font-sans font-normal">→</span>
                </a>
              ))}
              <div className="pt-4 flex items-center justify-between text-xs text-muted">
                <span>{siteConfig.deliveryAreas}</span>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  className="text-accent font-semibold underline min-h-[44px] flex items-center"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
