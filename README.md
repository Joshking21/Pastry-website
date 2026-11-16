# Ifeyinwa Pastries — Artisan Home Bakery Website

A fast, mobile-first e-commerce website built for **Ifeyinwa Pastries**, an artisan home bakery owned by **Ifeyinwa Juliet** in **Jos, Plateau State, Nigeria**.

The site is built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. It adopts a warm, light, flour-dusted aesthetic adapted to Nigerian delicacies and daylight commercial food photography. Orders are calculated live and sent directly to **WhatsApp** with formatted order summaries and totals.

---

## Key Features

1. **Light & Warm Visual Aesthetic**:
   - Subtle flour-dusted stone counter texture (`#FAF6F0`) matching editorial food photography.
   - Floating product cut-outs with soft, natural drop shadows.
   - High-contrast typography: bold condensed headings in deep cocoa (`text-heading`), caramel accents (`text-caramel`), and crimson pill buttons (`bg-accent`).
   - Solid surfaces (`bg-bg`, `bg-surface`) with zero glassmorphism or distracting blur.

2. **Interactive Bakery Menu Carousel**:
   - Horizontal slider with category filtering (**All, Pastries, Small Chops, Cakes, Snacks & Treats**).
   - In-place desktop/tablet takeover and mobile bottom sheet with shared-layout animation (`layoutId`), whole & sliced pastry views, and structured "What's Inside" specifications.

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

6. **Mobile First & Accessibility**:
   - Full mobile viewport compliance ($360\text{px}$ width with zero horizontal scroll).
   - Minimum $44\text{px} \times 44\text{px}$ tap targets across all interactive buttons, links, and tabs.
   - WCAG AA compliant text contrast ratios ($\ge 4.5:1$) across all body and accent text.
   - Keyboard navigation (Esc to close modals/drawers, focus trapping, semantic headings).
   - Reduced-motion support (`prefers-reduced-motion: reduce`).

---

## How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+
- Python 3.10+ (for asset verification scripts)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Run for Production
```bash
npm run build
npm run start
```

### 4. Verify Image Specification
To run the automated asset verification suite:
```bash
python scripts/verify_images.py
```
This inspects pixel dimensions, color modes, transparency corners, opaque area percentages, downscaled color counts ($\ge 8,000$ unique colors), and unique MD5 hashes.

---

## Image Generation & Processing Pipeline

All product and scene images are genuine photographs generated via `gemini-3.1-flash-image` and processed with custom Python tools:
- **Product Cut-outs**: Generated on seamless `#FAF6F0` studio backgrounds, isolated via BFS border flood-fill ($\Delta E < 26.0$), cropped to bounding box, and positioned on transparent $1000 \times 1000\text{px}$ (or $1400 \times 1400\text{px}$ for hero) RGBA canvases at $78\%$ width with an $8\%$ bottom margin.
- **Background Texture**: Generated and optimized to $2400 \times 1600\text{px}$ with mean brightness $\ge 230$ and standard deviation $\le 12$ for low-contrast readability.
- **Prompts & Models**: Documented in [public/images/IMAGE_PROMPTS.md](file:///c:/Users/Joshking/Desktop/pastry/public/images/IMAGE_PROMPTS.md).

---

## How to Edit Details & Customize

All business information, menu items, and copy have been consolidated into clean TypeScript configuration files:

### 1. Business Identity & Settings (`src/data/site.ts`)
Open `src/data/site.ts` to change:
- **Business name**: `siteConfig.name`
- **Owner name**: `siteConfig.ownerName`
- **WhatsApp number**: `siteConfig.whatsappNumber` *(international format, e.g. `2348130993731`, without `+`)*
- **Address & Delivery Coverage**: `siteConfig.address`, `siteConfig.deliveryAreas`
- **Production Domain**: `siteConfig.siteUrl`
- **Instagram handle & URL**: `siteConfig.instagramHandle`, `siteConfig.instagramUrl`
- **Order notice**: `siteConfig.orderNoticePastries`, `siteConfig.orderNoticeCakes`
- **Opening hours**: `siteConfig.openingHours`

### 2. Menu, Prices & Items (`src/data/menu.ts`)
Open `src/data/menu.ts` to modify:
- Pastry names, descriptions, and tags (`Bestseller`, `New`, `Party favourite`).
- Prices in Naira (e.g. `price: 1200`).
- "What's Inside" specs: filling, serving size, and packaging options.
- Linked open/sliced photos (`detailImage`).

---

## Checklist for the Owner (Placeholders to Personalize)

Before officially launching, review and update the following:

- [ ] **Site URL (`siteUrl`)**: Set `siteConfig.siteUrl` in `src/data/site.ts` to your custom domain (e.g. `https://ifeyinwapastries.com`).
- [ ] **Physical Address (`address`)**: Set `siteConfig.address` in `src/data/site.ts` to your actual bakery kitchen or pickup point in Jos.
- [ ] **WhatsApp Number**: Currently set to `2348130993731` in `src/data/site.ts`. Ensure this phone is active with WhatsApp Business.
- [ ] **Instagram Handle**: Currently set to `@IfeyinwaPastries` in `src/data/site.ts`.
- [ ] **Customer Reviews**: In `src/components/ReviewsSection.tsx`, replace the 3 placeholder review quotes with real testimonials from your WhatsApp status or Instagram DMs.
- [ ] **About Story**: In `src/components/AboutSection.tsx`, refine the 2–3 paragraphs to tell your personal story in your own authentic voice.
- [ ] **Baker Photo**: Replace `public/images/baker.jpg` with a photo of yourself in your kitchen or apron if desired.
- [ ] **Menu Prices**: Review the starting prices in `src/data/menu.ts` to match your current costings.

---

## Deploying to Vercel (Zero Config)

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
