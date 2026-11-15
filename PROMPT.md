# Build: a pastry shop website for a home baker in Nigeria

You are building a complete, production-ready website for a small pastry business run by a home baker in Nigeria. Customers will find it through WhatsApp status, Instagram and word of mouth, mostly **on their phones**. The site has one job: **make people hungry, then make ordering effortless.**

Build everything inside this folder. Generate the images too (see "Images" below).

---

## 0. Business details (filled in by the owner; use placeholders if blank)

| Field | Value |
|---|---|
| Business name | `Ifeyinwa Pastries ` |
| Owner's name | `Ifeyinwa Juliet` |
| City / area | `Jos, Plateau State, Nigeria]` |
| WhatsApp number (international, no +) | `[2348130993731]` |
| Instagram handle | `[@IfeyinwaPastries]` |
| Delivery areas | `[e.g. Within Jos, Plateau State and nationwide; pickup available]` |
| Order notice needed | `[e.g. 24 hours for pastries, 3 days for cakes]` |
| Opening hours | `[e.g. Mon–Sat, 8am–7pm]` |
| Design references I like | `[paste 1–2 links from land-book.com / lapa.ninja / dribbble]` |

If a field still shows `[BRACKETS]`, keep a clearly marked placeholder in **one config file** (`src/data/site.ts`) so the owner can change it in one place. Never hard-code these values anywhere else.

---

## 1. Tech stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation (subtle, never slow)
- `next/image` for every image, `next/font` for fonts
- No backend and no database. Orders go to **WhatsApp**.
- Must deploy to Vercel with zero config: `npm run build` must pass with no errors or type errors.

Project structure:
```
src/
  app/            layout.tsx, page.tsx, globals.css
  components/     one file per section + small UI pieces
  data/
    site.ts       business details from section 0
    menu.ts       all products, prices, categories
public/
  images/         all generated images
```

---

## 2. Design direction: follow the screenshots in `inspo/`

**Open and study every image in `inspo/` before writing any code.** They are screenshots of a bakery e-commerce concept, recorded in this order:

| File | What it shows |
|---|---|
| `01-hero.png` | The hero: huge headline on the left, one large round loaf on the right, flour dust drifting across a dark surface |
| `02-product-carousel.png` | The product carousel: three products in a row, each with name, image, description, price and "Add" button |
| `03-carousel-sliding.png` | The carousel mid-slide: cards move horizontally, the next card peeks in at the edge |
| `04-product-detail-open.png` | A product opened: image (whole + cut/sliced) on the left, details on the right, round ✕ close button |
| `05-detail-transition.png` | The transition between carousel and detail view: the product image travels into place while the text slides in |
| `06-carousel-entering.png` | A card sliding in from the right as the carousel appears |

**Recreate its layout, typography and motion. Do not copy its brand:** no "Vinny's Bakery" name, logo, wording or bread products. Our products are Nigerian pastries and our brand is from section 0.

> ⚠️ **Colour change:** the reference is dark. **Our site is LIGHT.** Keep everything else (the composition, the floating cut-out products, the big condensed headings, the carousel and detail animations), but put it all on a light, warm, flour-dusted surface.

**What to take from the reference (adapted to light):**
- **Background:** a **light, warm off-white surface**: pale marble or light stone, or a lightly floured baking counter, with very faint flour dust and texture. Keep it subtle so the page reads as clean and bright. This is one generated texture image (`bg-texture.jpg`) used site-wide, sitting over a solid `--bg` colour so the page still looks right before it loads.
- **Products float on the light surface.** Each pastry image is a **cut-out with a transparent background** (PNG/WebP), with a soft, warm drop shadow underneath so it looks like it's resting on the counter. No photos in boxes, no cards with borders.
- **Type:**
  - Headings: a tall, **bold condensed uppercase sans**, e.g. *Bebas Neue*, *Anton* or *Oswald (700)*, in **deep cocoa brown**. In the hero, the second line (or one key word) can be in **caramel** for warmth. Very large in the hero (it should fill about half the width on desktop).
  - Product names sit **above** the product image, and the image slightly **overlaps** the bottom of the name.
  - Body: a clean sans in dark warm brown-grey, small but readable (16px minimum on mobile).
  - Prices: large and **light/thin weight**, e.g. `₦1,500`, with the ₦ sign smaller than the digits.
- **Buttons:** small rounded **pill "Add" buttons** in a muted raspberry/crimson with white text. The secondary hero call-to-action is an **underlined uppercase text link** in cocoa (like "CHOOSE YOUR LOAF" → ours is "SEE WHAT'S BAKING").
- **Header:** brand name centred with a tiny letter-spaced tagline underneath (e.g. "BAKED WITH LOVE · [CITY]"), small social links top-left, search / cart / menu icons top-right. Under it, a centred row of uppercase letter-spaced nav links; the active one is crimson or caramel with a small underline.
- **Palette as tokens** (CSS variables / Tailwind theme):
  - `--bg #FAF6F0` (warm off-white page)
  - `--surface #F1EAE0` (slightly darker cream for panels, the cart drawer and the footer)
  - `--heading #3B2418` (deep cocoa)
  - `--caramel #B7793F` (**large headings and decorative accents only**: too low-contrast for small text)
  - `--text #2E2520`
  - `--muted #6E625A`
  - `--accent #A8324A` (crimson buttons, white text on top)
  - Check contrast: all body text must pass WCAG AA on `--bg`.

**Motion (this is what makes it special):**
1. **Hero → products:** "SEE WHAT'S BAKING" (or scrolling) slides the hero out to the left while the product carousel slides in from the right (see `06`).
2. **Carousel:** horizontal slider with 3 products visible on desktop, 2 on tablet and 1 on phone, with the next item peeking in at the edge. Arrow buttons plus drag/swipe, with smooth spring easing.
3. **Product detail (key interaction):** clicking a product opens the detail view on the same light surface. The product image **travels from its carousel position to the left side** using a Framer Motion shared-layout animation (`layoutId`). The other products slide away and the details fade/slide in on the right (see `04` and `05`). The round ✕ button (and Esc key) reverses it.
4. **Custom cursor on desktop only:** a small cocoa-brown ring that follows the mouse and grows into a larger circle when hovering a product. Hide it on touch devices.
5. Flour dust can drift very slowly in the hero (CSS/canvas particles in a soft warm white/beige, low count, paused when off-screen).
6. Respect `prefers-reduced-motion`: replace slides with simple fades and switch off particles and the custom cursor.

**Adapt it, don't just clone it:**
- **No star ratings.** Show a small caramel-outlined tag instead where relevant: "Bestseller", "New" or "Party favourite".
- **No nutrition table.** In the detail view, show a "What's inside" row instead (e.g. `FILLING: Minced beef, potato, carrot · SIZE: Regular · PACK: Single or 6`), plus a **quantity stepper** and the Add button.
- The reference is a desktop concept. **Our customers are mostly on phones**, so design mobile-first: on a phone, the carousel shows one big swipeable product at a time, and the detail view becomes a full-screen sheet (image on top, details below).
- **Avoid:** dark sections (the whole site stays light), stark pure-white `#FFFFFF` backgrounds (use the warm off-white), glassmorphism, purple gradients, boxy bordered cards, emoji used as icons (use `lucide-react`).

---

## 3. Page sections (single page, in this order)

1. **Sticky header:** logo/name, links (Menu, Custom Cakes, About, Contact), and a cart button showing the item count. Collapses to a clean mobile menu.
2. **Hero (match the layout of `inspo/01-hero.png`, in light colours):** a huge two-line condensed headline on the left, in cocoa with the second line in caramel (e.g. "FRESH FROM / AUNTY'S OVEN" or "BAKED WARM / EATEN FAST"). Then a short paragraph in dark text, the underlined **"SEE WHAT'S BAKING"** link and a crimson **"Order on WhatsApp"** pill. On the right, one large cut-out hero pastry (a golden meat pie, broken open) resting on the light floured surface with a little flour dust around it.
3. **Trust strip:** 3–4 short points with icons: *Baked fresh daily · Made to order · Delivery in [CITY] · Party orders welcome*.
4. **Menu (the most important section; match `inspo/02`–`05`):**
   - Category filter tabs, as uppercase letter-spaced text links with the active one in crimson with a small underline: **All, Pastries, Small Chops, Cakes, Snacks & Treats**. Switching category re-animates the carousel.
   - Each product in the carousel: big condensed cocoa name, cut-out image overlapping it, a 2–3 line description, an optional tag, the price in **Naira (₦, formatted like ₦1,500)**, and the crimson pill **"Add"** button, which turns into a quantity stepper once added.
   - Clicking a product's image or name opens the **product detail view** described in section 2.
   - Starter menu in `menu.ts` (prices are placeholders the owner will edit):
     - Pastries: Meat Pie, Chicken Pie, Sausage Roll, Fish Roll, Egg Roll, Doughnuts (pack of 6)
     - Small Chops: Small Chops Party Pack (puff-puff, samosa, spring roll, peppered gizzard), Puff-Puff (bowl)
     - Cakes: Celebration Cake (from), Cupcakes (box of 6), Banana Bread loaf
     - Snacks & Treats: Chin Chin (jar), Cinnamon Rolls (pack of 4), Cookies (pack)
5. **Party pack builder:** an interactive picker where the customer chooses a pack size (e.g. 50 / 100 / 200 pieces) and ticks which items go in it. The price updates live, and an "Add pack to order" button adds it to the cart.
6. **Custom cake request:** a short form with occasion, date needed, number of people, flavour, design notes, and an optional reference-image link. Submitting opens WhatsApp with all the details pre-written. Show the order notice from section 0.
7. **About the baker:** a warm short story section with a placeholder portrait image and 2–3 short paragraphs (placeholder text, clearly marked for the owner to rewrite in her own voice).
8. **Gallery:** a masonry or bento grid of 6–8 food photos, with a lightbox on click.
9. **Reviews:** 3 testimonial cards. **Use obvious placeholder text** (e.g. "Customer review goes here, replace with a real one") with placeholder names like "Customer name". Do NOT invent realistic fake reviews.
10. **FAQ:** an accordion. How do I order? How far ahead should I order? Do you deliver? How do I pay? Can I customise a cake?
11. **Contact / final CTA:** big "Ready to order?" block with a WhatsApp button, Instagram link, hours and delivery areas.
12. **Footer:** name, small nav, socials, © year.

---

## 4. Cart and WhatsApp ordering (must work perfectly)

- Cart is a **slide-out drawer** (bottom sheet on mobile). It shows items, quantity steppers, remove buttons, and the total in ₦.
- Persist the cart in `localStorage` (wrap in try/catch so it never crashes).
- Fields in the drawer: customer name, delivery or pickup toggle, address (only if delivery), preferred date/time, notes.
- **"Send order on WhatsApp"** builds a neat, readable message and opens:
  `https://wa.me/<number>?text=<encodeURIComponent(message)>`
  Example message:
  ```
  Hello! I'd like to place an order 🧁

  • 2 × Meat Pie: ₦3,000
  • 1 × Small Chops Party Pack (100 pcs): ₦25,000

  Total: ₦28,000
  Name: Ada
  Delivery to: 12 Wetheral Road
  Needed: Sat 14 Dec, 2pm
  Notes: Extra pepper on the gizzard please
  ```
- A **floating WhatsApp button** stays visible at the bottom-right on all screens.

---

## 5. Quality bar

- **Mobile-first.** Test at 360px wide: no horizontal scroll, tap targets at least 44px, readable text (16px+ body).
- **Fast:** images optimised via `next/image` with proper `sizes`, the hero image `priority`, and everything else lazy.
- **Accessible:** semantic HTML, alt text on every image, visible focus states, good colour contrast, and keyboard-usable cart, tabs, accordion and lightbox.
- **SEO:** proper `<title>` and meta description using the business name and city, Open Graph image, and `LocalBusiness` / `Bakery` JSON-LD in the layout.
- Favicon from the logo.
- Clean, readable code: typed props, no giant files, no unused code.

---

## 6. Images (generate these)

Generate every image below and save it to `public/images/` with the exact filename. There are **two kinds**:

**A. Product cut-outs** (`public/images/products/`, saved as **PNG or WebP with a transparent background**). These float on the light site background, so they must have no table, plate or backdrop. Use this style for every one:

> Professional studio food photograph of [SUBJECT], isolated product cut-out, three-quarter view from slightly above, soft bright natural daylight from the upper left, crisp detail, golden-brown and appetising, realistic, Nigerian home-baking style, **transparent background**, no plate, no text, no props.

If the image tool can't output transparency, generate it on a plain flat **#FAF6F0** warm off-white background (the same colour as the site, so any leftover edge blends in), then remove the background (e.g. with `@imgly/background-removal-node` or `rembg`) and save as a transparent PNG/WebP.

| Filename | Size | Subject |
|---|---|---|
| `hero-meat-pie.png` | 1400×1400 | One large golden Nigerian meat pie, broken open showing the minced beef, potato and carrot filling, a light dusting of flour |
| `meat-pie.png` | 1000×1000 | Two golden Nigerian meat pies with crimped edges |
| `meat-pie-open.png` | 1000×1000 | A Nigerian meat pie cut in half showing the filling (used in the detail view) |
| `chicken-pie.png` | 1000×1000 | Flaky chicken pie, cut open, creamy chicken filling |
| `sausage-roll.png` | 1000×1000 | Three flaky golden sausage rolls stacked |
| `fish-roll.png` | 1000×1000 | Two Nigerian fish rolls, golden and crisp |
| `egg-roll.png` | 1000×1000 | A Nigerian egg roll cut in half showing the boiled egg inside |
| `doughnuts.png` | 1000×1000 | A small stack of sugar-dusted Nigerian doughnuts |
| `small-chops.png` | 1000×1000 | A small pile of puff-puff, samosa, spring rolls and peppered gizzard |
| `puff-puff.png` | 1000×1000 | A pile of golden puff-puff balls, lightly sugared |
| `celebration-cake.png` | 1000×1000 | Elegant two-tier buttercream celebration cake with fresh flowers |
| `cupcakes.png` | 1000×1000 | Three frosted cupcakes with swirled buttercream |
| `banana-bread.png` | 1000×1000 | A banana bread loaf with two slices cut off beside it |
| `chin-chin.png` | 1000×1000 | A small heap of crunchy golden chin chin |
| `cinnamon-rolls.png` | 1000×1000 | Two glazed cinnamon rolls, one pulled slightly apart |
| `cookies.png` | 1000×1000 | A short stack of chocolate chip cookies, one broken |

**B. Scenes and textures** (`public/images/`, JPG/WebP):

| Filename | Size | Subject |
|---|---|---|
| `bg-texture.jpg` | 2400×1600 | Top-down view of a pale warm off-white marble or light stone baking counter (around `#FAF6F0`) with a very light, sparse dusting of flour and soft even daylight. Subtle and low-contrast, so text stays readable on top. No food, no text. It must tile or cover cleanly. |
| `baker.jpg` | 1000×1250 | Placeholder: a Nigerian woman in an apron working dough in a bright, airy kitchen with soft daylight, shot from the side or behind so the face is not the focus |
| `gallery-1.jpg` … `gallery-6.jpg` | 1200×1200 | Bright, airy close-ups on the same light floured counter: dough being rolled, pies fresh from the oven, a cake being piped, boxes packed for delivery, a party tray, cupcakes |
| `og-image.jpg` | 1200×630 | Light floured counter with a few pastries on the right and empty space on the left for text |

If you cannot generate images in this environment, **create the folder, use tasteful solid-colour placeholders with the same filenames**, and write every image prompt above into `public/images/IMAGE_PROMPTS.md` so they can be generated elsewhere and dropped in.

---

## 7. When you finish

1. Run `npm run build` and fix every error.
2. Write a short `README.md` covering how to run it, how to edit the business details (`src/data/site.ts`), how to edit the menu and prices (`src/data/menu.ts`), how to swap images, and how to deploy to Vercel.
3. List anything still using a placeholder so the owner knows what to replace.
