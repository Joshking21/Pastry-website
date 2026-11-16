"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Heart, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface/40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-xl bg-bg">
              <Image
                src="/images/baker.jpg"
                alt={`${siteConfig.ownerName} baking`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-bg">
                  FOUNDER &amp; HEAD BAKER
                </span>
                <p className="font-heading text-2xl sm:text-3xl tracking-wide">
                  {siteConfig.ownerName}
                </p>
                <p className="text-base text-bg/90 mt-1">
                  Baking in {siteConfig.city}, {siteConfig.state}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent">
                THE STORY BEHIND THE CRUST
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase leading-[0.95]">
              BAKED WITH LOVE, DEVOTION &amp; REAL BUTTER
            </h2>

            {/* Clearly marked paragraphs for the owner to customize */}
            <div className="mt-6 space-y-4 text-base text-text leading-relaxed">
              <p>
                Welcome to <strong>{siteConfig.name}</strong>! What started in my kitchen
                as a passion for perfecting the flakiest Nigerian meat pie has grown
                into a home bakery serving families, offices, and celebrations across {siteConfig.city} and beyond.
              </p>

              <p>
                Every pie is hand-crimped with seasoned beef and vegetables. We take pride
                in genuine home-baking, creating treats that bring warmth and comfort to your table.
              </p>

              <p className="text-base text-muted italic border-l-2 border-caramel pl-4 py-1">
                &ldquo;Baking isn&apos;t just about recipes; it&apos;s about sharing joy, comfort,
                and celebrating life&apos;s special moments together.&rdquo;
              </p>
            </div>

            {/* Note badge for owner */}
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted bg-bg p-3 rounded-xl border border-border">
              <Sparkles className="w-4 h-4 text-caramel shrink-0" />
              <span>
                <strong>Owner note:</strong> You can rewrite this story or swap your portrait
                in <code className="text-heading font-mono bg-surface px-1 py-0.5 rounded">src/data/site.ts</code> anytime.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
