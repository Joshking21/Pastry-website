"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: "Customer Name",
      location: "Jos, Plateau State",
      text: "Customer review goes here, replace with a real one. The owner can paste authentic feedback received via WhatsApp or Instagram right here.",
    },
    {
      name: "Customer Name",
      location: "Rayfield, Jos",
      text: "Customer review goes here, replace with a real one. Share what regular customers say about the meat pie crust and timely party pack deliveries.",
    },
    {
      name: "Customer Name",
      location: "Bukuru, Jos",
      text: "Customer review goes here, replace with a real one. Perfect place to showcase a happy bride's celebration cake testimonial.",
    },
  ];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#F1EAE0]/30 border-t border-[#E8DED1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B7793F]">
            WORD OF MOUTH
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#3B2418] uppercase mt-1">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6E625A]">
            Real feedback from pastry lovers across Jos and beyond. (Owner: replace placeholder quotes below).
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border border-[#E8DED1] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B7793F] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B7793F]" />
                  ))}
                </div>

                <MessageSquareQuote className="w-8 h-8 text-[#B7793F]/40 mb-3" />

                <p className="text-sm sm:text-base text-[#2E2520] italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DED1]">
                <h4 className="font-heading text-lg text-[#3B2418]">{rev.name}</h4>
                <span className="text-xs text-[#6E625A] block mt-0.5">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
