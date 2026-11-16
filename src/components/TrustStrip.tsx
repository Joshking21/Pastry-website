"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Flame, Clock, Truck, PartyPopper } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const points = [
    {
      icon: Flame,
      title: "Baked Fresh Daily",
      desc: "Warm from the morning oven, crafted fresh for each delivery.",
    },
    {
      icon: Clock,
      title: "Made to Order",
      desc: `Crafted with care with ${siteConfig.orderNoticePastries} notice.`,
    },
    {
      icon: Truck,
      title: "Delivery Available",
      desc: `${siteConfig.deliveryAreas}.`,
    },
    {
      icon: PartyPopper,
      title: "Party & Bulk Orders",
      desc: "Custom trays of puff-puff, samosas and pies ready for your guests.",
    },
  ];

  return (
    <section className="border-y border-border bg-surface/50 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 group"
              >
                <div className="w-11 h-11 rounded-full bg-bg border border-border flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <Icon className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h2 className="font-heading text-base sm:text-lg text-heading tracking-wider leading-snug">
                    {pt.title}
                  </h2>
                  <p className="text-base text-muted mt-0.5 leading-relaxed">
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
