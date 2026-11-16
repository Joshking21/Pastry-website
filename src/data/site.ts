// Business configuration - Single source of truth for all business details.
// Never hard-code any of these values elsewhere.

export interface SiteConfig {
  name: string;
  tagline: string;
  ownerName: string;
  ownerFirstName: string;
  city: string;
  state: string;
  country: string;
  whatsappNumber: string; // international format without +
  instagramHandle: string;
  instagramUrl: string;
  deliveryAreas: string;
  orderNoticePastries: string;
  orderNoticeCakes: string;
  openingHours: string;
  openingHoursStructured: {
    days: string[];
    opens: string;
    closes: string;
  };
  address: string; // PLACEHOLDER: owner to confirm exact kitchen / pickup location
  siteUrl: string; // PLACEHOLDER: set to the real domain after deploying
  heroHeadline: [string, string];
  whatsappGreetings: {
    hero: string;
    floating: string;
    contact: string;
    customCake: string;
    cartPrefix: string;
  };
  currency: {
    symbol: string;
    code: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Ifeyinwa Pastries",
  tagline: "BAKED WITH LOVE · JOS, NIGERIA",
  ownerName: "Ifeyinwa Juliet",
  ownerFirstName: "Juliet",
  city: "Jos",
  state: "Plateau State",
  country: "Nigeria",
  whatsappNumber: "2348130993731",
  instagramHandle: "@IfeyinwaPastries",
  instagramUrl: "https://instagram.com/IfeyinwaPastries",
  deliveryAreas: "Within Jos, Plateau State and nationwide; pickup available",
  orderNoticePastries: "24 hours for pastries",
  orderNoticeCakes: "3 days for cakes",
  openingHours: "Mon–Sat, 8am–7pm",
  openingHoursStructured: {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
    opens: "08:00",
    closes: "19:00",
  },
  address: "Jos, Plateau State, Nigeria (Kitchen pickup available upon order confirmation)", // PLACEHOLDER: owner to confirm
  siteUrl: "https://ifeyinwapastries.com", // PLACEHOLDER: set to real domain after deploying
  heroHeadline: ["FRESH FROM", "JULIET'S OVEN"],
  whatsappGreetings: {
    hero: "Hello Juliet! I visited your website and would like to order fresh pastries 🧁",
    floating: "Hello Juliet! I'd like to ask a question or place an order 🧁",
    contact: "Hello Juliet! I would like to place an order from your bakery website 🧁",
    customCake: "Hello Juliet! 🎂 I would like to request a custom cake:",
    cartPrefix: "Hello! I'd like to place an order 🧁",
  },
  currency: {
    symbol: "₦",
    code: "NGN",
  },
};

export const trustPoints = [
  {
    icon: "Flame",
    title: "Baked Fresh Daily",
    description: "Every order is baked fresh for your delivery date.",
  },
  {
    icon: "Clock",
    title: "Made to Order",
    description: "Prepared fresh upon receipt of order notice.",
  },
  {
    icon: "Truck",
    title: "Delivery Available",
    description: "Carefully dispatched or available for local pickup.",
  },
  {
    icon: "PartyPopper",
    title: "Party & Event Orders",
    description: "Small chops platters and celebration cakes for gatherings.",
  },
];
