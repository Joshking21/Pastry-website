import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealItem } from "@/components/Reveal";

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "How do I place an order?",
      a: `Ordering is straightforward! Add items directly to your basket on this website, or use our interactive party pack builder. When you click "Send Order on WhatsApp", it neatly organizes your full order, delivery address, and notes into a pre-written WhatsApp message. We confirm and schedule your bake once bank transfer is verified.`,
    },
    {
      q: "How far ahead should I order?",
      a: `For daily pastries and snacks, please provide at least ${siteConfig.orderNoticePastries}. For custom celebration cakes and large party packs, we require ${siteConfig.orderNoticeCakes} to prepare fresh fillings, proof the dough, and execute intricate cake designs.`,
    },
    {
      q: "Do you deliver, and what areas do you cover?",
      a: `Yes, we deliver! We cover: ${siteConfig.deliveryAreas}. Kitchen pickup is also available upon order confirmation.`,
    },
    {
      q: "How do I pay?",
      a: "We accept direct bank transfers to our official bakery account. Once your WhatsApp order details are finalized, our payment details are shared. Orders are queued for the oven once transfer confirmation is verified.",
    },
    {
      q: "Can I customise a cake or pastry order?",
      a: "Absolutely! Fill out our Custom Cake section with your occasion, flavour, guest count, and inspiration picture link, or message us directly on WhatsApp with any specific requirements.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-caramel" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-caramel">
              CLEAR ANSWERS
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-2 text-base text-muted">
            Everything you need to know about placing an order, advance notice, and delivery.
          </p>
        </Reveal>

        {/* Accordion List */}
        <Reveal stagger={0.08} className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <RevealItem key={idx}>
              <div
                className={`bg-bg rounded-2xl border overflow-hidden transition-all duration-300 hover:border-caramel/60 ${
                  isOpen ? "border-accent/50 shadow-lg" : "border-border shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 min-h-[48px] text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-heading text-lg sm:text-xl text-heading tracking-wide">
                    {faq.q}
                  </span>
                  <div
                    className={`size-11 rounded-full border border-heading/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-accent text-on-accent border-accent" : "text-heading"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-base text-muted leading-relaxed border-t border-border/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};
