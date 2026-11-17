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

  // Repeat items for seamless marquee
  const marqueeItems = [...points, ...points, ...points];

  return (
    <section className="border-y border-border bg-surface/50 py-6 sm:py-7 overflow-hidden relative">
      {/* Slow infinite marquee (Job 4.2) */}
      <div className="marquee-wrap flex select-none">
        <div className="animate-marquee flex items-center gap-8 sm:gap-14 shrink-0 pr-8 sm:pr-14">
          {marqueeItems.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 shrink-0 group"
              >
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:border-accent">
                  <Icon className="w-4 h-4 text-caramel" />
                </div>
                <div className="whitespace-nowrap">
                  <span className="font-heading text-base sm:text-lg text-heading tracking-wider leading-snug block">
                    {pt.title}
                  </span>
                  <span className="text-xs sm:text-sm text-muted mt-0.5 leading-relaxed block">
                    {pt.desc}
                  </span>
                </div>
                <span className="text-caramel/40 ml-4 font-heading text-xs">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
