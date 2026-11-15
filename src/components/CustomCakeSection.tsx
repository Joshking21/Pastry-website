"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Calendar, Cake, Users, MessageCircle, AlertCircle } from "lucide-react";

export const CustomCakeSection: React.FC = () => {
  const [occasion, setOccasion] = useState("Birthday");
  const [dateNeeded, setDateNeeded] = useState("");
  const [guestCount, setGuestCount] = useState("10 - 20 guests");
  const [flavour, setFlavour] = useState("Vanilla Bean & Red Velvet");
  const [referenceLink, setReferenceLink] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello Juliet! 🎂 I would like to request a custom cake:

• Occasion: ${occasion}
• Date Needed: ${dateNeeded || "To be discussed"}
• Guest Count: ${guestCount}
• Preferred Flavour: ${flavour}
• Design Notes: ${designNotes || "None"}
${referenceLink ? `• Reference Inspiration: ${referenceLink}` : ""}

Please let me know your availability and pricing!`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section id="custom-cakes" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Cake className="w-4 h-4 text-[#B7793F]" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B7793F]">
                BESPOKE CELEBRATION CAKES
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase">
              CUSTOM CAKES FOR YOUR SPECIAL MOMENTS
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#6E625A] leading-relaxed">
              From intimate birthday treats to extravagant tiered wedding cakes, each creation
              is custom designed, baked with fresh farm eggs and real dairy butter, and finished
              with velvety Swiss buttercream or fondant.
            </p>

            {/* Notice Alert from Section 0 */}
            <div className="mt-6 p-4 rounded-xl bg-[#FAF6F0] border border-[#B7793F]/40 flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-[#B7793F] shrink-0 mt-0.5" />
              <div className="text-xs text-[#2E2520]">
                <strong className="block text-[#3B2418] font-bold uppercase tracking-wider mb-0.5">
                  Advance Order Notice Required:
                </strong>
                {siteConfig.orderNoticeCakes} for custom designs. Please book early to secure your date.
              </div>
            </div>

            {/* Visual Cake Cutout */}
            <div className="mt-8 relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center">
              <Image
                src="/images/products/celebration-cake.png"
                alt="Two-tier celebration cake with floral accents"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)]"
              />
            </div>
          </div>

          {/* Right Column: Custom Request Form */}
          <div className="lg:col-span-7 bg-[#FAF6F0] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8DED1] shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Occasion */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                    OCCASION
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                  >
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Wedding">Wedding / Traditional Marriage</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Graduation">Graduation / Milestone</option>
                    <option value="Bridal/Baby Shower">Bridal / Baby Shower</option>
                    <option value="Just Because">Just Because / Sweet Treat</option>
                  </select>
                </div>

                {/* Date Needed */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                    DATE NEEDED (MIN 3 DAYS)
                  </label>
                  <input
                    type="date"
                    required
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Number of People */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                    NUMBER OF GUESTS
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                  >
                    <option value="4 - 8 guests (Mini)">4 - 8 guests (6-inch Mini)</option>
                    <option value="10 - 20 guests (Standard)">10 - 20 guests (8-inch)</option>
                    <option value="25 - 40 guests (Medium)">25 - 40 guests (10-inch)</option>
                    <option value="50+ guests (2-Tier)">50+ guests (2-Tier)</option>
                    <option value="100+ guests (3-Tier)">100+ guests (3-Tier Showstopper)</option>
                  </select>
                </div>

                {/* Flavour */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                    FLAVOUR PROFILE
                  </label>
                  <select
                    value={flavour}
                    onChange={(e) => setFlavour(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                  >
                    <option value="Vanilla Bean & Buttercream">Classic Madagascar Vanilla Bean</option>
                    <option value="Rich Red Velvet with Cream Cheese">Velvety Red Velvet with Cream Cheese</option>
                    <option value="Decadent Belgian Chocolate Fudge">Decadent Belgian Chocolate Fudge</option>
                    <option value="Salted Caramel Swirl">Salted Caramel Buttercream Swirl</option>
                    <option value="Marble (Vanilla & Chocolate)">Marble (Vanilla & Chocolate Twist)</option>
                    <option value="Fruit Cake / Rich Boozy Cake">Traditional Rich Fruit Cake</option>
                  </select>
                </div>
              </div>

              {/* Design Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                  DESIGN NOTES &amp; COLOUR THEME
                </label>
                <textarea
                  rows={3}
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="e.g. Sage green & champagne gold theme, fresh white roses on top, 'Happy 30th Birthday Chidinma' in gold lettering"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                />
              </div>

              {/* Reference Image link */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#3B2418] mb-1.5">
                  OPTIONAL INSPIRATION LINK (PINTEREST / INSTAGRAM)
                </label>
                <input
                  type="url"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  placeholder="https://instagram.com/p/... or Pinterest pin link"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DED1] bg-[#F1EAE0]/40 text-sm text-[#2E2520] focus:border-[#A8324A] focus:outline-hidden transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#A8324A] hover:bg-[#8D253B] text-white font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Cake Request on WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
