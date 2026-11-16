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
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | Fresh Pastries & Small Chops in ${siteConfig.city}, ${siteConfig.country}`,
  description: `Authentic Nigerian pastries, flaky pies, small chops party packs, and celebration cakes in ${siteConfig.city}, ${siteConfig.state}. Freshly baked to order.`,
  keywords: [
    "Nigerian Meat Pie",
    `Pastries in ${siteConfig.city}`,
    `Small Chops ${siteConfig.city}`,
    `Bakery ${siteConfig.city}`,
    "Celebration Cakes",
    "Puff-Puff",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.ownerName }],
  openGraph: {
    title: `${siteConfig.name} · Fresh Pastries & Small Chops in ${siteConfig.city}`,
    description: `Golden Nigerian meat pies, fluffy puff-puff, small chops party packs, and celebration cakes. Order directly on WhatsApp!`,
    url: siteConfig.siteUrl,
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
    description: `Crispy flaky meat pies, gourmet cakes, and delicious small chops made fresh in ${siteConfig.city}.`,
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
    "image": `${siteConfig.siteUrl}/images/products/hero-meat-pie.png`,
    "description": "Artisan Nigerian home bakery creating fresh meat pies, small chops, flaky pastries, and custom celebration cakes.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.city,
      "addressRegion": siteConfig.state,
      "addressCountry": "NG",
    },
    "telephone": `+${siteConfig.whatsappNumber}`,
    "openingHours": `${siteConfig.openingHoursStructured.days[0]}-${siteConfig.openingHoursStructured.days[siteConfig.openingHoursStructured.days.length - 1]} ${siteConfig.openingHoursStructured.opens}-${siteConfig.openingHoursStructured.closes}`,
    "priceRange": "₦₦",
    "servesCuisine": "Nigerian Pastries & Bakery",
    "url": siteConfig.siteUrl,
  };

  return (
    <html lang="en" className={`${bebasNeue.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
