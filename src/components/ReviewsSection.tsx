import React from "react";
import { MessageSquareQuote } from "lucide-react";
import { customerReviews } from "@/data/site";

export const ReviewsSection: React.FC = () => {
  // If there are no reviews provided yet, do not render this section (per Job 2.5)
  if (!customerReviews || customerReviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-surface/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel">
            WORD OF MOUTH
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-heading uppercase mt-1">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="mt-2 text-base text-muted">
            Feedback from pastry lovers across Jos and beyond.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-bg rounded-2xl p-6 sm:p-8 border border-border shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <MessageSquareQuote className="w-8 h-8 text-caramel/50 mb-3" />
                <p className="text-base text-text italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="font-heading text-lg text-heading">{rev.author}</h3>
                {rev.location && (
                  <span className="text-xs text-muted block mt-0.5">{rev.location}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
