import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ifeyinwapastries.com"),
  title: `${siteConfig.name} | Fresh Pastries & Small Chops in ${siteConfig.city}, Nigeria`,
  description: `Authentic, golden-baked Nigerian meat pies, buttery pastries, puff-puff party packs, and bespoke celebration cakes in ${siteConfig.city}, ${siteConfig.state}. Fresh from the oven to your doorstep.`,
  keywords: [
    "Nigerian Meat Pie",
    "Pastries in Jos",
    "Small Chops Jos",
    "Bakery Jos Plateau State",
    "Celebration Cakes Nigeria",
    "Puff-Puff",
    "Ifeyinwa Pastries",
  ],
  authors: [{ name: siteConfig.ownerName }],
  openGraph: {
    title: `${siteConfig.name} · Fresh Pastries & Small Chops in ${siteConfig.city}`,
    description: `Golden Nigerian meat pies, fluffy puff-puff, small chops party packs, and celebration cakes. Order directly on WhatsApp!`,
    url: "https://ifeyinwapastries.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} fresh pastries spread`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Fresh Home Baking in ${siteConfig.city}`,
    description: `Crispy flaky meat pies, gourmet cakes, and delicious small chops made fresh daily in ${siteConfig.city}.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": siteConfig.name,
    "image": "https://ifeyinwapastries.com/images/products/hero-meat-pie.png",
    "description": "Artisan Nigerian home bakery creating fresh meat pies, small chops, flaky pastries, and custom celebration cakes.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.city,
      "addressRegion": siteConfig.state,
      "addressCountry": "NG",
    },
    "telephone": `+${siteConfig.whatsappNumber}`,
    "openingHours": "Mo-Sa 08:00-19:00",
    "priceRange": "₦₦",
    "servesCuisine": "Nigerian Pastries & Bakery",
  };

  return (
    <html lang="en" className={`${bebasNeue.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF6F0] text-[#2E2520] font-sans selection:bg-[#B7793F]/20 selection:text-[#3B2418] antialiased">
        {children}
      </body>
    </html>
  );
}
