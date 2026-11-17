import React, { useState, useRef } from "react";
import { siteConfig } from "@/data/site";
import { Cake, MessageCircle, AlertCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";

/** Earliest bookable date (today + 3 days) as yyyy-mm-dd in local time. */
function minCakeDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function prettyDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export const CustomCakeSection: React.FC = () => {
  const [occasion, setOccasion] = useState("Birthday");
  const [dateNeeded, setDateNeeded] = useState("");
  const [guestCount, setGuestCount] = useState("10 - 20 guests (Standard)");
  const [flavour, setFlavour] = useState("Vanilla Bean & Buttercream");
  const [referenceLink, setReferenceLink] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `${siteConfig.whatsappGreetings.customCake}

• Occasion: ${occasion}
• Date Needed: ${prettyDate(dateNeeded) || "To be discussed"}
• Guest Count: ${guestCount}
• Preferred Flavour: ${flavour}
• Design Notes: ${designNotes || "None"}
${referenceLink ? `• Reference Link: ${referenceLink}` : ""}

Please let me know your availability and pricing!`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="custom-cakes"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual & Story */}
          <Reveal from="left" className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Cake className="w-4 h-4 text-caramel" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-caramel">
                BESPOKE CELEBRATION CAKES
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase">
              CUSTOM CAKES FOR YOUR SPECIAL MOMENTS
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              From intimate birthday treats to tiered celebration cakes, each creation
              is custom designed and baked with quality ingredients.
            </p>

            {/* Advance Order Notice Alert */}
            <div className="mt-6 p-4 rounded-xl bg-bg border border-caramel/40 flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
              <div className="text-xs text-text">
                <strong className="block text-heading font-bold uppercase tracking-wider mb-0.5">
                  Advance Order Notice Required:
                </strong>
                {siteConfig.orderNoticeCakes} for custom designs. Please book early to secure your date.
              </div>
            </div>

            {/* Visual Cake Cutout with parallax and float (Job 3 & 4.2) */}
            <motion.div
              style={{ y: parallaxY }}
              className="mt-8 relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src="/images/products/celebration-cake.png"
                  alt="Two-tier celebration cake with floral accents"
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)] select-none"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/products/hero-meat-pie.png";
                  }}
                />
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Right Column: Custom Request Form */}
          <Reveal from="right" delay={0.1} className="lg:col-span-7 bg-bg rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Occasion */}
                <div>
                  <label htmlFor="cake-occasion" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                    OCCASION
                  </label>
                  <select
                    id="cake-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
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
                  <label htmlFor="cake-date" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                    DATE NEEDED (MIN 3 DAYS)
                  </label>
                  <input
                    id="cake-date"
                    type="date"
                    required
                    min={minCakeDate()}
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Number of People */}
                <div>
                  <label htmlFor="cake-guests" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                    NUMBER OF GUESTS
                  </label>
                  <select
                    id="cake-guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
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
                  <label htmlFor="cake-flavour" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                    FLAVOUR PROFILE
                  </label>
                  <select
                    id="cake-flavour"
                    value={flavour}
                    onChange={(e) => setFlavour(e.target.value)}
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
                  >
                    <option value="Vanilla Bean & Buttercream">Classic Vanilla Bean</option>
                    <option value="Rich Red Velvet with Cream Cheese">Velvety Red Velvet</option>
                    <option value="Chocolate Fudge">Rich Chocolate Fudge</option>
                    <option value="Salted Caramel Swirl">Salted Caramel Buttercream Swirl</option>
                    <option value="Marble">Marble Twist</option>
                  </select>
                </div>
              </div>

              {/* Design Notes */}
              <div>
                <label htmlFor="cake-design" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                  DESIGN NOTES &amp; COLOUR THEME
                </label>
                <textarea
                  id="cake-design"
                  rows={3}
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="e.g. Sage green & champagne gold theme, fresh flowers on top"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
                />
              </div>

              {/* Reference Image link */}
              <div>
                <label htmlFor="cake-ref" className="block text-xs uppercase tracking-wider font-bold text-heading mb-1.5">
                  OPTIONAL INSPIRATION LINK (PINTEREST / INSTAGRAM)
                </label>
                <input
                  id="cake-ref"
                  type="url"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  placeholder="https://instagram.com/p/... or Pinterest pin link"
                  className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-border bg-surface/40 text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent focus:outline-hidden transition-colors"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 min-h-[44px] rounded-full bg-accent hover:bg-accent-hover text-on-accent font-medium text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer btn-shine"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Cake Request on WhatsApp</span>
              </motion.button>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
