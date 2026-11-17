# Ifeyinwa Pastries — Artisan Home Bakery Website

A fast, mobile-first e-commerce website built for **Ifeyinwa Pastries**, an artisan home bakery owned by **Ifeyinwa Juliet** in **Jos, Plateau State, Nigeria**.

The site is built with **Vite + React 19**, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), and Framer Motion. It adopts a warm, light, flour-dusted aesthetic adapted to Nigerian delicacies and daylight commercial food photography. Orders are calculated live and sent directly to **WhatsApp** with formatted order summaries and totals.

---

## Tech Stack & Architecture

- **Bundler & Dev Server**: Vite 6 (`vite`) with `@vitejs/plugin-react`
- **UI Framework**: React 19 (`react`, `react-dom`)
- **Type Checking**: TypeScript 5 (`tsc -b`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`)
- **Animations**: Framer Motion 12 (word reveal, floating pastry, shared layout `layoutId`, spring accordion)
- **Icons**: Lucide React
- **Delight**: Canvas Confetti (dynamically imported on cart and party pack actions)
- **Deployment**: Static SPA (`vite build` outputting directly to `dist/`)

---

## Key Features

1. **Light & Warm Visual Aesthetic**:
   - Subtle flour-dusted stone counter texture matching editorial food photography.
   - Floating product cut-outs with soft contact shadows (`drop-shadow-[0_20px_25px_rgba(59,36,24,0.18)]`).
   - High-contrast typography: bold condensed headings in deep cocoa (`text-heading`), caramel accents (`text-caramel`), and crimson pill buttons (`bg-accent`).
   - Solid surfaces (`bg-bg`, `bg-surface`) with zero glassmorphism or distracting blur.

2. **Interactive Bakery Menu Carousel**:
   - Horizontal slider with category filtering (**All, Pastries, Small Chops, Cakes, Snacks & Treats**).
   - In-place desktop/tablet takeover and mobile bottom sheet with whole & sliced pastry views and structured "What's Inside" specifications.
   - Animated tab indicator using Framer Motion `layoutId`.

3. **Interactive Party Pack Builder**:
   - Choose between **50, 100, or 200 pieces**.
   - Check and uncheck specific items (Puff-Puff, Samosas, Spring Rolls, Peppered Gizzard Skewers, Chicken Wings).
   - Live price calculation and single-click cart addition with celebration confetti.

4. **Custom Cake Request Form**:
   - Occasion selector, required advance notice calculator (min 3 days), flavour profiles, and photo reference links.
   - Generates pre-written WhatsApp enquiry with structured specifications.

5. **WhatsApp Cart & Checkout**:
   - Slide-out basket drawer (bottom sheet on mobile).
   - Delivery vs. pickup toggle, customer address, date/time needed, and kitchen notes.
   - One-click checkout that constructs a clean WhatsApp message and opens `https://wa.me/2348130993731`.
   - LocalStorage cart persistence.

6. **Mobile First & Accessibility**:
   - Full mobile viewport compliance (360px width with zero horizontal scroll).
   - Minimum 44px x 44px tap targets across all interactive buttons, links, and tabs.
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
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```
Serves the `dist/` production build locally.

### 5. Automated Verification Suites
- **Codebase & Slop Audit**:
  ```bash
  python scripts/audit_code.py
  ```
- **Image Cutout & Alpha Audit**:
  ```bash
  python scripts/audit_images.py
  ```
- **Playwright Responsive & Functional QA**:
  ```bash
  node scripts/qa.mjs
  ```
- **Scroll & Sticky Header Verification**:
  ```bash
  node scripts/verify_scroll.mjs
  ```
- **Mobile 360px Tap Target Verification**:
  ```bash
  node scripts/inspect_tap.mjs
  ```

---

## Customization Guide

All business information, menu items, and copy are cleanly separated in `src/data/`:

### 1. Business Identity & Settings (`src/data/site.ts`)
- **Business name**: `siteConfig.name`
- **Owner name**: `siteConfig.ownerName`
- **WhatsApp number**: `siteConfig.whatsappNumber` *(international format, e.g. `2348130993731`)*
- **Address & Delivery Coverage**: `siteConfig.address`, `siteConfig.deliveryAreas`
- **Instagram handle & URL**: `siteConfig.instagramHandle`, `siteConfig.instagramUrl`
- **Customer Reviews**: Populate `customerReviews` array in `siteConfig` when real customer testimonials become available; the Reviews section and nav link stay cleanly hidden until populated.

### 2. Menu, Prices & Items (`src/data/menu.ts`)
- Pastry names, descriptions, and tags (`Bestseller`, `New`, `Party favourite`).
- Prices in Naira (e.g. `price: 1200`).
- "What's Inside" specs: filling, serving size, and packaging options.
- Detail cut-out images (`detailImage`) for sliced/open views.

---

## Production Deployment

This project builds to a pure static Single Page Application in the `dist/` directory.

### Deploying to Vercel, Netlify, or Cloudflare Pages
1. Build command: `npm run build`
2. Output directory: `dist`
3. Node.js version: 18+ or 20+
