"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "How do I place an order?",
      a: `Ordering is super simple! Add items directly to your cart on this website, or use the party pack builder. When you click "Send Order on WhatsApp", it neatly organizes your full order, delivery address, and notes into a pre-written WhatsApp message. We reply immediately to confirm payment and dispatch time.`,
    },
    {
      q: "How far ahead should I order?",
      a: `For daily pastries and snacks (meat pies, doughnuts, chin chin), please provide at least ${siteConfig.orderNoticePastries}. For custom celebration cakes and large party packs (100+ pieces), we require ${siteConfig.orderNoticeCakes} to prepare fresh fillings, proof the dough, and execute intricate cake designs.`,
    },
    {
      q: "Do you deliver, and what areas do you cover?",
      a: `Yes, we deliver! We cover ${siteConfig.deliveryAreas}. We dispatch via trusted delivery riders within Jos (Rayfield, Bukuru, Old Airport, Terminus, Lamingo, etc.). Self-pickup from our kitchen is also readily available.`,
    },
    {
      q: "How do I pay?",
      a: "We accept fast direct bank transfers to our official bakery account. Once your WhatsApp order details are finalized, our account information is shared. Orders are queued for the oven once transfer confirmation is verified.",
    },
    {
      q: "Can I customise a cake or pastry order?",
      a: "Absolutely! Fill out our Custom Cake section with your occasion, flavour, guest count, and inspiration picture link, or message us directly on WhatsApp with any specific ingredient requirements or packaging preferences.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#B7793F]" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B7793F]">
              CLEAR ANSWERS
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6E625A]">
            Everything you need to know about placing an order, delivery notice, and payments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E8DED1] overflow-hidden shadow-xs transition-colors hover:border-[#B7793F]/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg sm:text-xl text-[#3B2418] tracking-wide">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#3B2418]/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#A8324A] text-white border-[#A8324A]" : "text-[#3B2418]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#6E625A] leading-relaxed border-t border-[#E8DED1]/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
