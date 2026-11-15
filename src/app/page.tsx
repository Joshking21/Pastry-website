"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { MenuSection } from "@/components/MenuSection";
import { PartyPackBuilder } from "@/components/PartyPackBuilder";
import { CustomCakeSection } from "@/components/CustomCakeSection";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <CartProvider>
      {/* Desktop follow cursor */}
      <CustomCursor />

      {/* Main Page Layout */}
      <div className="relative min-h-screen flex flex-col justify-between">
        
        {/* 1. Sticky Header */}
        <Navbar />

        <main className="flex-1">
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. Trust Strip */}
          <TrustStrip />

          {/* 4. Bakery Menu & Product Details Modal */}
          <MenuSection />

          {/* 5. Party Pack Interactive Builder */}
          <PartyPackBuilder />

          {/* 6. Custom Cake Request */}
          <CustomCakeSection />

          {/* 7. About the Baker */}
          <AboutSection />

          {/* 8. Kitchen Moments Gallery & Lightbox */}
          <GallerySection />

          {/* 9. Customer Reviews */}
          <ReviewsSection />

          {/* 10. Frequently Asked Questions */}
          <FaqSection />

          {/* 11. Contact & Final CTA */}
          <ContactSection />
        </main>

        {/* 12. Footer */}
        <Footer />

        {/* Slide-out Cart Drawer / Bottom Sheet */}
        <CartDrawer />

        {/* Persistent Floating WhatsApp Action */}
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
