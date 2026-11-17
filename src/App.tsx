import React from "react";
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

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <MenuSection />
        <PartyPackBuilder />
        <CustomCakeSection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
