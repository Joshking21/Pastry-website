# Ifeyinwa Pastries — Artisan Home Bakery Website

A fast, mobile-first e-commerce website built for **Ifeyinwa Pastries**, a home bakery in **Jos, Plateau State, Nigeria**.

The site is designed with a warm, light, flour-dusted aesthetic (inspired by modern European bakery e-commerce, adapted to high-contrast warm daylight and Nigerian delicacies). Orders are calculated live and sent directly to **WhatsApp** with formatted order summaries.

---

## 🌟 Key Features

1. **Light & Warm Visual Aesthetic**:
   - Subtle flour-dusted stone counter texture (`#FAF6F0`).
   - Floating product cut-outs with soft, natural drop shadows.
   - High-contrast typography: bold condensed headings in deep cocoa (`#3B2418`) and caramel accents (`#B7793F`).
   - Muted crimson pill buttons (`#A8324A`).
2. **Interactive Bakery Menu Carousel**:
   - Horizontal slider with category filtering (**All, Pastries, Small Chops, Cakes, Snacks & Treats**).
   - Product detail modal with shared-layout animation (`layoutId`), whole & sliced pastry views, and detailed "What's Inside" specs.
3. **Interactive Party Pack Builder**:
   - Choose between **50, 100, or 200 pieces**.
   - Check and uncheck specific items (Puff-Puff, Samosas, Spring Rolls, Peppered Gizzard Skewers, Chicken Wings).
   - Live price calculation and single-click cart addition.
4. **Custom Cake Request Form**:
   - Occasion selector, required advance notice calculator (min 3 days), flavour profiles, and photo reference links.
   - Generates pre-written WhatsApp enquiry.
5. **WhatsApp Cart & Checkout**:
   - Slide-out basket drawer (bottom sheet on mobile).
   - Delivery vs. pickup toggle, customer address, date/time needed, and kitchen notes.
   - One-click checkout that constructs a clean WhatsApp message and opens `https://wa.me/2348130993731`.
   - LocalStorage cart persistence.
6. **Mobile First & Micro-interactions**:
   - Floating WhatsApp button for instant enquiries.
   - Desktop custom cursor with interactive element expansions.
   - Gentle floating flour dust canvas animation.
   - Full keyboard accessibility and reduced-motion support.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ How to Edit Details & Customize

All business information, menu items, and copy have been consolidated into clean TypeScript configuration files so you never need to touch complex layout code:

### 1. Editing Business Details (`src/data/site.ts`)
Open `src/data/site.ts` to change:
- **Business name**: `siteConfig.name`
- **Owner name**: `siteConfig.ownerName`
- **WhatsApp number**: `siteConfig.whatsappNumber` *(international format, e.g. `2348130993731`, without `+`)*
- **City & State**: `siteConfig.city`, `siteConfig.state`
- **Instagram handle & URL**: `siteConfig.instagramHandle`, `siteConfig.instagramUrl`
- **Delivery areas & Order notice**: `siteConfig.deliveryAreas`, `siteConfig.orderNoticePastries`, `siteConfig.orderNoticeCakes`
- **Opening hours**: `siteConfig.openingHours`

### 2. Editing Menu, Prices & Items (`src/data/menu.ts`)
Open `src/data/menu.ts` to modify:
- Pastry names, descriptions, and tags (`Bestseller`, `New`, `Party favourite`).
- Prices in Naira (e.g. `price: 1200`).
- "What's Inside" specs: filling, serving size, and packaging options.
- Add new products to any of the categories: `Pastries`, `Small Chops`, `Cakes`, `Snacks & Treats`.

### 3. Swapping Images (`public/images/`)
All images are located in `public/images/`:
- **Product cut-outs**: in `public/images/products/` as transparent PNGs (e.g. `meat-pie.png`, `chicken-pie.png`, `puff-puff.png`).
- **Baker portrait**: `public/images/baker.jpg`.
- **Kitchen gallery**: `public/images/gallery-1.jpg` to `gallery-6.jpg`.
- **Background texture**: `public/images/bg-texture.jpg`.
- Prompt guidelines for generating new assets are documented in `public/images/IMAGE_PROMPTS.md`.

---

## 📋 Checklist for the Owner (Placeholders to Personalize)

Before officially launching, review and update the following:

- [ ] **WhatsApp Number**: Currently set to `2348130993731` in `src/data/site.ts`. Ensure this phone is active with WhatsApp Business.
- [ ] **Instagram Handle**: Currently set to `@IfeyinwaPastries` in `src/data/site.ts`.
- [ ] **Customer Reviews**: In `src/components/ReviewsSection.tsx`, replace the 3 placeholder review quotes with real testimonials from your WhatsApp status or Instagram DMs.
- [ ] **About Story**: In `src/components/AboutSection.tsx`, refine the 2–3 paragraphs to tell your personal story in your own authentic voice.
- [ ] **Baker Photo**: Replace `public/images/baker.jpg` with a photo of yourself in your kitchen or apron.
- [ ] **Menu Prices**: Review the starting prices in `src/data/menu.ts` to match your current costings.

---

## 🚢 Deploying to Vercel (Zero Config)

1. Push this repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "Initial bakery release"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**. The site will build and deploy in under 60 seconds with SSL enabled.
