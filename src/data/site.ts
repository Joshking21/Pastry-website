// Site configuration - All business details can be edited here in one place.

export interface SiteConfig {
  name: string;
  tagline: string;
  ownerName: string;
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
  address: string;
  currency: {
    symbol: string;
    code: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Ifeyinwa Pastries",
  tagline: "BAKED WITH LOVE · JOS, NIGERIA",
  ownerName: "Ifeyinwa Juliet",
  city: "Jos",
  state: "Plateau State",
  country: "Nigeria",
  whatsappNumber: "2348130993731",
  instagramHandle: "@IfeyinwaPastries",
  instagramUrl: "https://instagram.com/IfeyinwaPastries",
  deliveryAreas: "Within Jos, Plateau State and nationwide; pickup available",
  orderNoticePastries: "24 hours for pastries",
  orderNoticeCakes: "3 days for custom cakes",
  openingHours: "Mon–Sat, 8am–7pm",
  address: "Rayfield, Jos, Plateau State, Nigeria",
  currency: {
    symbol: "₦",
    code: "NGN",
  },
};

export const trustPoints = [
  {
    icon: "Flame",
    title: "Baked Fresh Daily",
    description: "Every single batch is baked fresh right on the morning of delivery.",
  },
  {
    icon: "Clock",
    title: "Made to Order",
    description: "Never frozen or day-old. Wholesome, premium ingredients only.",
  },
  {
    icon: "Truck",
    title: "Delivery in Jos & Beyond",
    description: "Swift doorstep dispatch across Jos and nationwide delivery options.",
  },
  {
    icon: "PartyPopper",
    title: "Party & Event Orders",
    description: "Custom party trays, small chops boxes & celebration cakes ready for crowds.",
  },
];
