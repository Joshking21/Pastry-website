"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Heart, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#F1EAE0]/40 border-t border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#B7793F]/30 shadow-xl bg-[#FAF6F0]">
              <Image
                src="/images/baker.jpg"
                alt={`${siteConfig.ownerName} baking in Jos`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2418]/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FAF6F0]">
                  FOUNDER &amp; HEAD BAKER
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl tracking-wide">
                  {siteConfig.ownerName}
                </h3>
                <p className="text-xs text-[#FAF6F0]/90 mt-1">
                  Baking from Rayfield, Jos · Plateau State
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Warm story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#A8324A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8324A]">
                THE STORY BEHIND THE CRUST
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase leading-[0.95]">
              BAKED WITH LOVE, DEVOTION &amp; REAL BUTTER
            </h2>

            {/* Clearly marked paragraphs for the owner to customize */}
            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#2E2520] leading-relaxed">
              <p>
                Welcome to <strong>{siteConfig.name}</strong>! What started in my cozy kitchen
                in Jos as a passion for perfecting the flakiest Nigerian meat pie has blossomed
                into a beloved bakery serving homes, corporate events, and celebrations across Plateau State.
              </p>

              <p>
                I believe good food starts with honest ingredients. Every single pie is hand-crimped
                with generous cuts of seasoned beef and fresh potatoes. We don&apos;t use shortcuts,
                artificial flavours, or store-bought fillings. When you open a box from our kitchen,
                you are tasting the warmth of a true home-cooked delicacy.
              </p>

              <p className="text-xs sm:text-sm text-[#6E625A] italic border-l-2 border-[#B7793F] pl-4 py-1">
                &ldquo;Baking isn&apos;t just about recipes; it&apos;s about sharing joy, comfort,
                and celebrating life&apos;s biggest moments one warm bite at a time.&rdquo;
              </p>
            </div>

            {/* Note badge for owner */}
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#6E625A] bg-[#FAF6F0] p-3 rounded-xl border border-[#E8DED1]">
              <Sparkles className="w-4 h-4 text-[#B7793F] shrink-0" />
              <span>
                <strong>Owner note:</strong> You can easily rewrite this story or swap your portrait
                in <code className="text-[#3B2418] font-mono bg-white px-1 py-0.5 rounded">src/data/site.ts</code> anytime.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
