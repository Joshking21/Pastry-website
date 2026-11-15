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
    description: "Flaky, buttery golden crust packed with seasoned minced beef, tender potatoes, and diced carrots in rich savoury gravy.",
    image: "/images/products/meat-pie.png",
    detailImage: "/images/products/meat-pie-open.png",
    inside: {
      filling: "Seasoned lean minced beef, potato, carrot, aromatic herbs",
      size: "Regular (approx. 180g)",
      pack: "Single or Box of 6 / 12",
      notes: "Golden egg-washed crust, crimped by hand",
    },
  },
  {
    id: "chicken-pie",
    name: "Creamy Chicken Pie",
    category: "Pastries",
    price: 1500,
    tag: "Bestseller",
    description: "Tender shredded chicken breast in a creamy, peppery thyme-infused gravy wrapped in melt-in-your-mouth pastry.",
    image: "/images/products/chicken-pie.png",
    detailImage: "/images/products/chicken-pie.png",
    inside: {
      filling: "Tender chicken breast, sweet corn, diced veggies in cream sauce",
      size: "Regular (approx. 190g)",
      pack: "Single or Box of 6",
      notes: "Extra flaky shortcrust pastry",
    },
  },
  {
    id: "sausage-roll",
    name: "Flaky Sausage Roll",
    category: "Pastries",
    price: 800,
    description: "Generously spiced beef sausage meat rolled inside dozens of paper-thin layers of golden puff pastry.",
    image: "/images/products/sausage-roll.png",
    detailImage: "/images/products/sausage-roll.png",
    inside: {
      filling: "Pure beef sausage filling seasoned with nutmeg and peppers",
      size: "Generous 7-inch roll",
      pack: "Single or pack of 5",
      notes: "Crisp and golden on every bite",
    },
  },
  {
    id: "fish-roll",
    name: "Crispy Fish Roll",
    category: "Pastries",
    price: 900,
    description: "Crisp, golden-fried rolled pastry loaded with spicy mackerel fish filling, onions and warm Nigerian spices.",
    image: "/images/products/fish-roll.png",
    detailImage: "/images/products/fish-roll.png",
    inside: {
      filling: "Spiced deboned mackerel fish, scotch bonnet & sweet onions",
      size: "Standard roll",
      pack: "Single or pack of 4",
      notes: "Deep golden crunch",
    },
  },
  {
    id: "egg-roll",
    name: "Jumbo Egg Roll",
    category: "Pastries",
    price: 700,
    description: "A whole hard-boiled farm egg snugly enveloped in subtly sweet, golden-fried dough. Warm, hearty and satisfying.",
    image: "/images/products/egg-roll.png",
    detailImage: "/images/products/egg-roll.png",
    inside: {
      filling: "Whole boiled farm fresh egg",
      size: "Jumbo round",
      pack: "Single or pack of 3",
      notes: "Crisp outside, fluffy dough inside",
    },
  },
  {
    id: "doughnuts",
    name: "Sugar-Glazed Doughnuts",
    category: "Pastries",
    price: 3500,
    tag: "Bestseller",
    description: "Pillow-soft, airy ring doughnuts dusted generously in fine granulated sugar or silky vanilla glaze. Pack of 6.",
    image: "/images/products/doughnuts.png",
    detailImage: "/images/products/doughnuts.png",
    inside: {
      filling: "Light brioche-style fluffy dough",
      size: "Medium rings",
      pack: "Box of 6 pieces",
      notes: "Melt-in-your-mouth soft",
    },
  },
  {
    id: "small-chops-party-pack",
    name: "Small Chops Party Pack",
    category: "Small Chops",
    price: 12500,
    tag: "Party favourite",
    description: "The ultimate Nigerian party spread: golden puff-puff, crispy beef samosas, vegetable spring rolls, and spicy peppered gizzard.",
    image: "/images/products/small-chops.png",
    detailImage: "/images/products/small-chops.png",
    inside: {
      filling: "Puff-puff, samosas, spring rolls, peppered gizzard skewers",
      size: "Standard platter (serves 4-6)",
      pack: "40 pieces total assortment",
      notes: "Served with signature sweet chili dip",
    },
  },
  {
    id: "puff-puff-bowl",
    name: "Golden Puff-Puff Bowl",
    category: "Small Chops",
    price: 2500,
    tag: "Party favourite",
    description: "Warm, bouncy, pillowy balls of golden fried yeast dough with hints of nutmeg. Pure nostalgic comfort.",
    image: "/images/products/puff-puff.png",
    detailImage: "/images/products/puff-puff.png",
    inside: {
      filling: "Nutmeg-scented sweet yeast dough",
      size: "Bowl of 25 golden balls",
      pack: "Sharing bowl",
      notes: "Fried fresh upon order",
    },
  },
  {
    id: "celebration-cake",
    name: "Celebration Cake",
    category: "Cakes",
    price: 25000,
    tag: "New",
    description: "Custom multi-layer sponge cake finished in silky Swiss meringue buttercream, floral accents and custom lettering.",
    image: "/images/products/celebration-cake.png",
    detailImage: "/images/products/celebration-cake.png",
    inside: {
      filling: "Choice of Vanilla, Red Velvet, Chocolate or Salted Caramel",
      size: "Starting at 8-inch round (serves 12-15)",
      pack: "Custom boxed with ribbon",
      notes: "Requires 3 days advance notice",
    },
  },
  {
    id: "cupcakes-box",
    name: "Signature Cupcakes",
    category: "Cakes",
    price: 6000,
    description: "Six gourmet cupcakes with tall buttercream swirls, sprinkles, and edible pearls. Mix of red velvet and vanilla bean.",
    image: "/images/products/cupcakes.png",
    detailImage: "/images/products/cupcakes.png",
    inside: {
      filling: "Vanilla bean & red velvet sponges with whipped buttercream",
      size: "Standard cupcakes",
      pack: "Window gift box of 6",
      notes: "Perfect for birthdays & thank-yous",
    },
  },
  {
    id: "banana-bread",
    name: "Moist Banana Bread Loaf",
    category: "Cakes",
    price: 4500,
    tag: "Bestseller",
    description: "Ultra-moist, fragrant loaf made with ripe organic bananas, warm cinnamon, and a crunchy walnut topping.",
    image: "/images/products/banana-bread.png",
    detailImage: "/images/products/banana-bread.png",
    inside: {
      filling: "Real ripe bananas, cinnamon, toasted walnuts",
      size: "Large 9x5 inch loaf (approx. 850g)",
      pack: "Whole loaf (approx. 10 thick slices)",
      notes: "Stays moist for 5 days",
    },
  },
  {
    id: "chin-chin-jar",
    name: "Crunchy Chin Chin",
    category: "Snacks & Treats",
    price: 3000,
    tag: "Bestseller",
    description: "Crispy, crunchy, milky fried pastry bites infused with real grated nutmeg and creamy butter. Highly addictive!",
    image: "/images/products/chin-chin.png",
    detailImage: "/images/products/chin-chin.png",
    inside: {
      filling: "Flour, butter, sweet milk, real nutmeg",
      size: "Medium airtight gift jar (500g)",
      pack: "Sealed reusable jar",
      notes: "Crunchy without being hard",
    },
  },
  {
    id: "cinnamon-rolls",
    name: "Glazed Cinnamon Rolls",
    category: "Snacks & Treats",
    price: 5500,
    tag: "New",
    description: "Four giant brioche rolls swirled with brown sugar cinnamon paste, topped with warm cream cheese drizzle.",
    image: "/images/products/cinnamon-rolls.png",
    detailImage: "/images/products/cinnamon-rolls.png",
    inside: {
      filling: "Brown sugar, Korintje cinnamon, salted butter, cream cheese glaze",
      size: "Jumbo bakery rolls",
      pack: "Box of 4 rolls",
      notes: "Best enjoyed warm",
    },
  },
  {
    id: "cookies-pack",
    name: "Chunky Choc-Chip Cookies",
    category: "Snacks & Treats",
    price: 3200,
    description: "Crisp golden edges, chewy fudge center, loaded with dark Belgian chocolate chunks and flaky sea salt.",
    image: "/images/products/cookies.png",
    detailImage: "/images/products/cookies.png",
    inside: {
      filling: "54% dark chocolate chunks, brown butter, sea salt",
      size: "Large bakery style (85g each)",
      pack: "Pack of 5 cookies",
      notes: "Baked fresh daily",
    },
  },
];
