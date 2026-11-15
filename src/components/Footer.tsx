"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Instagram, MessageCircle, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F1EAE0] border-t border-[#E8DED1] text-[#2E2520] pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#E8DED1]">
          
          {/* Logo & Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl sm:text-4xl text-[#3B2418] tracking-[0.06em]">
                {siteConfig.name}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B7793F] mt-0.5">
                {siteConfig.tagline}
              </span>
            </Link>
            <p className="text-xs text-[#6E625A] mt-2 max-w-sm">
              Artisan Nigerian pastries, flaky pies, small chops &amp; bespoke cakes in {siteConfig.city}.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#3B2418]">
            <a href="#menu" className="hover:text-[#A8324A] transition-colors">
              Menu
            </a>
            <a href="#party-packs" className="hover:text-[#A8324A] transition-colors">
              Party Packs
            </a>
            <a href="#custom-cakes" className="hover:text-[#A8324A] transition-colors">
              Custom Cakes
            </a>
            <a href="#about" className="hover:text-[#A8324A] transition-colors">
              About
            </a>
            <a href="#faq" className="hover:text-[#A8324A] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[#A8324A] transition-colors">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#3B2418]/20 bg-[#FAF6F0] hover:bg-[#FAF6F0]/80 text-[#3B2418] flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#3B2418]/20 bg-[#FAF6F0] hover:bg-[#FAF6F0]/80 text-[#3B2418] flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E625A] gap-4">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved. Made for {siteConfig.ownerName}.
          </p>
          <p className="flex items-center gap-1">
            Freshly baked with <Heart className="w-3.5 h-3.5 text-[#A8324A] fill-[#A8324A]" /> in {siteConfig.city}, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
};
