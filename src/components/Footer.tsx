"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Instagram, MessageCircle, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border text-text pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-border">
          
          {/* Logo & Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl sm:text-4xl text-heading tracking-[0.06em]">
                {siteConfig.name}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-caramel mt-0.5">
                {siteConfig.tagline}
              </span>
            </Link>
            <p className="text-base text-muted mt-2 max-w-sm">
              Artisan Nigerian pastries, flaky pies, small chops &amp; celebration cakes in {siteConfig.city}.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-heading">
            <a href="#menu" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              Menu
            </a>
            <a href="#party-packs" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              Party Packs
            </a>
            <a href="#custom-cakes" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              Custom Cakes
            </a>
            <a href="#about" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              About
            </a>
            <a href="#faq" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              FAQ
            </a>
            <a href="#contact" className="hover:text-accent transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="size-11 rounded-full border border-heading/20 bg-bg hover:bg-surface text-heading flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="size-11 rounded-full border border-heading/20 bg-bg hover:bg-surface text-heading flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-base text-muted gap-4">
          <p className="text-base text-muted">
            © {currentYear} {siteConfig.name}. All rights reserved. Made for {siteConfig.ownerName}.
          </p>
          <p className="text-base text-muted flex items-center gap-1">
            Freshly baked with <Heart className="w-4 h-4 text-accent fill-accent" /> in {siteConfig.city}, {siteConfig.country}.
          </p>
        </div>
      </div>
    </footer>
  );
};
