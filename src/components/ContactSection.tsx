"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { MessageCircle, Instagram, Clock, MapPin, Phone } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-surface/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Big "Ready to Order?" Block */}
        <div className="relative bg-bg rounded-3xl p-8 sm:p-12 md:p-16 border border-border shadow-xl overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading and Action buttons */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-caramel">
                WARM PASTRIES AWAIT
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-heading uppercase mt-1 leading-[0.93]">
                READY TO TASTE THE DIFFERENCE?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text max-w-lg">
                Whether you need a box of warm flaky meat pies or small
                chops for an upcoming event, we are ready to bake for you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    siteConfig.whatsappGreetings.contact
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-base tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat &amp; Order on WhatsApp</span>
                </a>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 min-h-[44px] rounded-full border border-heading/30 hover:border-heading bg-bg text-heading font-medium text-base tracking-wide transition-all hover:bg-surface cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-accent" />
                  <span>Follow {siteConfig.instagramHandle}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Business Hours, Location & Delivery info */}
            <div className="lg:col-span-5 bg-surface/70 rounded-2xl p-6 sm:p-8 border border-border space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-heading tracking-wider">
                    OPENING HOURS
                  </h3>
                  <p className="text-base text-muted mt-0.5">
                    {siteConfig.openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-heading tracking-wider">
                    BAKERY KITCHEN &amp; PICKUP
                  </h3>
                  <p className="text-base text-muted mt-0.5">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-heading tracking-wider">
                    DELIVERY COVERAGE
                  </h3>
                  <p className="text-base text-muted mt-0.5">
                    {siteConfig.deliveryAreas}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
