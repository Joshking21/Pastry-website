import React from "react";
import { siteConfig } from "@/data/site";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface/40 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait Image */}
          <Reveal from="left" className="lg:col-span-5 relative flex justify-center">
            {/* Tilted accent card peeking out behind the portrait */}
            <div
              aria-hidden="true"
              className="absolute w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent/80 to-caramel/80 rotate-6 translate-x-3"
            />
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-xl bg-bg group">
              <img
                src="/images/baker.jpg"
                alt={`${siteConfig.ownerName} baking`}
                width={1000}
                height={1250}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.98] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/products/hero-meat-pie.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/90">
                  FOUNDER &amp; HEAD BAKER
                </span>
                <p className="font-heading text-2xl sm:text-3xl tracking-wide">
                  {siteConfig.ownerName}
                </p>
                <p className="text-base text-white/85 mt-1">
                  Baking in {siteConfig.city}, {siteConfig.state}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Story */}
          <Reveal from="right" delay={0.1} className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent">
                THE STORY BEHIND THE CRUST
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase leading-[0.95]">
              BAKED WITH LOVE, DEVOTION &amp; REAL BUTTER
            </h2>

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

          </Reveal>

        </div>
      </div>
    </section>
  );
};
