"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          "Hello Juliet! I'd like to ask a question or place an order 🧁"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
        aria-label="Chat directly on WhatsApp"
      >
        {/* Pulsing indicator ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        <MessageCircle className="w-6 h-6 fill-white text-transparent shrink-0" />

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 leading-none">
            Fast Response
          </span>
          <span className="text-xs font-semibold tracking-wide text-white leading-tight mt-0.5">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
