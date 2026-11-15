"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Flame, Clock, Truck, PartyPopper } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const points = [
    {
      icon: Flame,
      title: "Baked Fresh Daily",
      desc: "Warm from the morning oven, never preserved or day-old.",
    },
    {
      icon: Clock,
      title: "Made to Order",
      desc: `Crafted specifically for you with ${siteConfig.orderNoticePastries} notice.`,
    },
    {
      icon: Truck,
      title: `Delivery in ${siteConfig.city}`,
      desc: "Careful dispatch directly to your home, office or event venue.",
    },
    {
      icon: PartyPopper,
      title: "Party & Bulk Orders",
      desc: "Custom trays of puff-puff, samosas and pies ready for your guests.",
    },
  ];

  return (
    <section className="border-y border-[#E8DED1] bg-[#F1EAE0]/40 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group"
              >
                <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#B7793F]/30 flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <Icon className="w-5 h-5 text-[#B7793F]" />
                </div>
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-[#3B2418] tracking-wider leading-snug">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6E625A] mt-0.5 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
