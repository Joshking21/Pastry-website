// Product catalog and pricing configuration.
// All business details and images are configured here.

export type Category = "All" | "Pastries" | "Small Chops" | "Cakes" | "Snacks & Treats";

export interface MenuItem {
  id: string;
  name: string;
  category: "Pastries" | "Small Chops" | "Cakes" | "Snacks & Treats";
  price: number;
  tag?: "Bestseller" | "New" | "Party favourite";
  description: string;
  image: string;
  detailImage?: string;
  inside: {
    filling?: string;
    size?: string;
    pack?: string;
    notes?: string;
  };
}

export const CATEGORIES: Category[] = [
  "All",
  "Pastries",
  "Small Chops",
  "Cakes",
  "Snacks & Treats",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "meat-pie",
    name: "Golden Meat Pie",
    category: "Pastries",
    price: 1200,
    tag: "Bestseller",
    description: "Flaky, buttery golden crust packed with seasoned minced beef, tender potatoes, and carrots in savoury gravy.",
    image: "/images/products/meat-pie.png",
    detailImage: "/images/products/meat-pie-open.png",
    inside: {
      filling: "Seasoned minced beef, potato, carrot",
      size: "Regular",
      pack: "Single or Box",
      notes: "Golden egg-washed crust, fork-crimped",
    },
  },
  {
    id: "chicken-pie",
    name: "Creamy Chicken Pie",
    category: "Pastries",
    price: 1500,
    tag: "Bestseller",
    description: "Tender shredded chicken in creamy, peppery thyme-infused sauce wrapped in flaky pastry.",
    image: "/images/products/chicken-pie.png",
    detailImage: "/images/products/chicken-pie-open.png",
    inside: {
      filling: "Shredded chicken breast, sweetcorn, vegetables",
      size: "Regular",
      pack: "Single or Box",
      notes: "Golden-baked crust",
    },
  },
  {
    id: "sausage-roll",
    name: "Flaky Sausage Roll",
    category: "Pastries",
    price: 800,
    description: "Seasoned beef sausage meat rolled inside crisp layers of golden puff pastry.",
    image: "/images/products/sausage-roll.png",
    detailImage: "/images/products/sausage-roll-open.png",
    inside: {
      filling: "Seasoned minced beef sausage meat",
      size: "Regular",
      pack: "Single or pack",
      notes: "Flaky layered pastry",
    },
  },
  {
    id: "fish-roll",
    name: "Crispy Fish Roll",
    category: "Pastries",
    price: 900,
    description: "Deep-fried, smooth golden-brown roll filled with spicy flaked fish filling.",
    image: "/images/products/fish-roll.png",
    detailImage: "/images/products/fish-roll-open.png",
    inside: {
      filling: "Spiced flaked mackerel, peppers, onions",
      size: "Regular",
      pack: "Single or pack",
      notes: "Crisp fried roll",
    },
  },
  {
    id: "egg-roll",
    name: "Jumbo Egg Roll",
    category: "Pastries",
    price: 700,
    description: "A whole hard-boiled egg wrapped in sweet dough and deep-fried into a golden ball.",
    image: "/images/products/egg-roll.png",
    inside: {
      filling: "Whole boiled egg inside sweet fried dough",
      size: "Regular",
      pack: "Single or pack",
      notes: "Hearty and satisfying",
    },
  },
  {
    id: "doughnuts",
    name: "Sugar Doughnuts",
    category: "Pastries",
    price: 3500,
    tag: "Bestseller",
    description: "Puffy, golden-brown Nigerian ring doughnuts (no hole), rolled in granulated sugar.",
    image: "/images/products/doughnuts.png",
    inside: {
      filling: "Fluffy yeast dough",
      size: "Pack of 5",
      pack: "Box of 5",
      notes: "Classic sugar dusting",
    },
  },
  {
    id: "small-chops-party-pack",
    name: "Small Chops Party Pack",
    category: "Small Chops",
    price: 12500,
    tag: "Party favourite",
    description: "Authentic Nigerian party spread: golden puff-puff, samosas, spring rolls, and peppered gizzard skewers.",
    image: "/images/products/small-chops.png",
    inside: {
      filling: "Puff-puff, samosas, spring rolls, peppered gizzard",
      size: "Party platter",
      pack: "Assorted platter",
      notes: "Includes pepper sauce",
    },
  },
  {
    id: "puff-puff-bowl",
    name: "Golden Puff-Puff",
    category: "Small Chops",
    price: 2500,
    tag: "Party favourite",
    description: "Warm, bouncy balls of golden fried yeast dough with hints of nutmeg.",
    image: "/images/products/puff-puff.png",
    inside: {
      filling: "Sweet yeast dough with nutmeg",
      size: "Bowl / Pack",
      pack: "Sharing portion",
      notes: "Fried fresh to order",
    },
  },
  {
    id: "celebration-cake",
    name: "Celebration Cake",
    category: "Cakes",
    price: 25000,
    tag: "New",
    description: "Multi-layer celebration cake finished in smooth buttercream with floral accents.",
    image: "/images/products/celebration-cake.png",
    detailImage: "/images/products/celebration-cake-slice.png",
    inside: {
      filling: "Choice of Vanilla, Red Velvet, or Chocolate",
      size: "Tiered cake",
      pack: "Custom boxed",
      notes: "Requires advance order notice",
    },
  },
  {
    id: "cupcakes-box",
    name: "Signature Cupcakes",
    category: "Cakes",
    price: 6000,
    description: "Six cupcakes in kraft liners with tall buttercream swirls and sugar pearls.",
    image: "/images/products/cupcakes.png",
    inside: {
      filling: "Assorted vanilla, strawberry, and chocolate",
      size: "Box of 6",
      pack: "Gift box",
      notes: "Decorated with sugar pearls",
    },
  },
  {
    id: "banana-bread",
    name: "Banana Bread Loaf",
    category: "Cakes",
    price: 4500,
    tag: "Bestseller",
    description: "Moist banana bread loaf with crackled top and sliced loaf presentation.",
    image: "/images/products/banana-bread.png",
    inside: {
      filling: "Ripe bananas, cinnamon",
      size: "Whole loaf",
      pack: "Loaf",
      notes: "Naturally sweet and moist",
    },
  },
  {
    id: "chin-chin-jar",
    name: "Crunchy Chin Chin",
    category: "Snacks & Treats",
    price: 3000,
    tag: "Bestseller",
    description: "Crunchy golden-brown fried dough bites infused with real nutmeg.",
    image: "/images/products/chin-chin.png",
    inside: {
      filling: "Flour, butter, milk, nutmeg",
      size: "Jar / Bag",
      pack: "Airtight packaging",
      notes: "Crisp and crunchy",
    },
  },
  {
    id: "cinnamon-rolls",
    name: "Glazed Cinnamon Rolls",
    category: "Snacks & Treats",
    price: 5500,
    tag: "New",
    description: "Soft cinnamon rolls swirled with brown sugar cinnamon and drizzled with glaze.",
    image: "/images/products/cinnamon-rolls.png",
    inside: {
      filling: "Cinnamon sugar swirl, sweet glaze",
      size: "Pack",
      pack: "Bakery box",
      notes: "Fluffy and sweet",
    },
  },
  {
    id: "cookies-pack",
    name: "Choc-Chip Cookies",
    category: "Snacks & Treats",
    price: 3200,
    description: "Golden cookies with pools of melted chocolate and a hint of sea salt.",
    image: "/images/products/cookies.png",
    inside: {
      filling: "Chocolate chips, butter dough, sea salt",
      size: "Pack",
      pack: "Bakery pouch",
      notes: "Crisp edges, soft centre",
    },
  },
];
