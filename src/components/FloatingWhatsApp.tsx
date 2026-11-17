import React from "react";
import { siteConfig } from "@/data/site";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <motion.a
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
          siteConfig.whatsappGreetings.floating
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 min-h-[48px] min-w-[48px] rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
        aria-label="Chat directly on WhatsApp"
      >
        {/* Subtle periodic pulse ring every ~4s, shrunk to <= 1.4x (Job 2.4 & 4.2) */}
        <motion.span
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-whatsapp pointer-events-none"
        />

        <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 fill-white text-transparent shrink-0 relative z-10" />

        {/* Text collapsed to icon-only circle on mobile (Job 2.4) */}
        <div className="hidden sm:flex flex-col text-left relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 leading-none">
            Fast Response
          </span>
          <span className="text-xs font-semibold tracking-wide text-white leading-tight mt-0.5">
            Chat on WhatsApp
          </span>
        </div>
      </motion.a>
    </aside>
  );
};
