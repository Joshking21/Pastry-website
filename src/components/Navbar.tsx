"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu as MenuIcon, X, Instagram, MessageCircle } from "lucide-react";

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("menu");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["menu", "party-packs", "custom-cakes", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "MENU", href: "#menu", id: "menu" },
    { name: "PARTY PACKS", href: "#party-packs", id: "party-packs" },
    { name: "CUSTOM CAKES", href: "#custom-cakes", id: "custom-cakes" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "REVIEWS", href: "#reviews", id: "reviews" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF6F0]/95 backdrop-blur-md shadow-xs border-b border-[#E8DED1]"
          : "bg-[#FAF6F0]/80 backdrop-blur-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Socials (left), Logo (center), Cart & Menu (right) */}
        <div className="flex items-center justify-between py-3.5 border-b border-[#E8DED1]/60">
          {/* Top Left: Social links */}
          <div className="flex items-center gap-4 w-1/3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E625A] hover:text-[#A8324A] transition-colors flex items-center gap-1.5 text-xs tracking-wider"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">INSTAGRAM</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E625A] hover:text-[#A8324A] transition-colors flex items-center gap-1.5 text-xs tracking-wider"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">WHATSAPP</span>
            </a>
          </div>

          {/* Center Brand Title & Tagline */}
          <div className="text-center w-1/3 flex flex-col items-center justify-center">
            <Link href="/" className="group inline-block">
              <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#3B2418] tracking-[0.08em] block transition-transform group-hover:scale-[1.02]">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B7793F] block mt-0.5">
                {siteConfig.tagline}
              </span>
            </Link>
          </div>

          {/* Top Right: Cart & Mobile Menu Toggle */}
          <div className="flex items-center justify-end gap-3 w-1/3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#3B2418] hover:text-[#A8324A] transition-colors flex items-center gap-2 group cursor-pointer"
              aria-label={`Cart with ${totalCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#3B2418] group-hover:text-[#A8324A] transition-colors" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A8324A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline font-heading text-sm text-[#3B2418] tracking-wider">
                CART {totalCount > 0 && `(${totalCount})`}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#3B2418] hover:text-[#A8324A] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Centered Desktop Nav Links row */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 py-2.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-xs lg:text-[13px] font-semibold tracking-[0.16em] transition-colors py-1 ${
                  isActive
                    ? "text-[#A8324A]"
                    : "text-[#3B2418] hover:text-[#B7793F]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A8324A] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#E8DED1] px-6 py-6 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-lg text-[#3B2418] hover:text-[#A8324A] tracking-wider py-1 border-b border-[#E8DED1]/40 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#B7793F] font-sans font-normal">→</span>
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between text-xs text-[#6E625A]">
              <span>Delivery within Jos & nationwide</span>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                className="text-[#A8324A] font-semibold underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
