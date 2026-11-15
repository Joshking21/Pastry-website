"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { MessageCircle, Instagram, Clock, MapPin, Phone } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F1EAE0]/60 border-t border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Big "Ready to Order?" Block */}
        <div
          className="relative bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-[#B7793F]/40 shadow-xl overflow-hidden"
          style={{
            backgroundImage: "url('/images/bg-texture.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "700px auto",
          }}
        >
          {/* Decorative ambient background blur */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B7793F]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading and Action buttons */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#B7793F]">
                WARM PASTRIES AWAIT
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#3B2418] uppercase mt-1 leading-[0.93]">
                READY TO TASTE THE DIFFERENCE?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#2E2520] max-w-lg">
                Whether you need a box of warm flaky meat pies for family breakfast or 200 small
                chops for an upcoming event, we are ready to bake for you.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    "Hello Juliet! I would like to place an order from your bakery website 🧁"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat &amp; Order on WhatsApp</span>
                </a>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#3B2418]/30 hover:border-[#3B2418] bg-[#FAF6F0] text-[#3B2418] font-medium text-sm sm:text-base tracking-wide transition-all hover:bg-[#F1EAE0] cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-[#A8324A]" />
                  <span>Follow @IfeyinwaPastries</span>
                </a>
              </div>
            </div>

            {/* Right Column: Business Hours, Location & Delivery info */}
            <div className="lg:col-span-5 bg-[#F1EAE0]/70 rounded-2xl p-6 sm:p-8 border border-[#E8DED1] space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B7793F]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#B7793F]" />
                </div>
                <div>
                  <h4 className="font-heading text-base text-[#3B2418] tracking-wider">
                    OPENING HOURS
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6E625A] mt-0.5">
                    {siteConfig.openingHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B7793F]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B7793F]" />
                </div>
                <div>
                  <h4 className="font-heading text-base text-[#3B2418] tracking-wider">
                    BAKERY KITCHEN &amp; PICKUP
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6E625A] mt-0.5">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B7793F]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#B7793F]" />
                </div>
                <div>
                  <h4 className="font-heading text-base text-[#3B2418] tracking-wider">
                    DELIVERY COVERAGE
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6E625A] mt-0.5">
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
