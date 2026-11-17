# TASK: Port Ifeyinwa Pastries to Vite, clean up the slop, fix the images, add life

You are working in an existing **Next.js 15 + React 19 + Tailwind v4 + framer-motion** project in this folder (a one-page pastry shop site for Ifeyinwa Pastries, Jos, Nigeria). Do the four jobs below **in order**, and verify each one in a real browser before you say it is done. Do not report success without proof (screenshots + a clean build).

Before you start, read `PROMPT.md` (the original design brief, still the source of truth for sections, copy, colours and behaviour) and `FIX_PROMPT.md` (an earlier audit; anything in it that is still unfixed is in scope). Look at every image in `inspo/`.

---

## JOB 1 — Convert to a Vite project

Target stack: **Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`) + framer-motion + lucide-react + canvas-confetti**. No Next.js left anywhere.

1. Create `vite.config.ts` (React plugin + `@tailwindcss/vite`), `index.html` at the root, and `src/main.tsx`, which mounts `<App />` inside `CartProvider`.
2. Move `src/app/page.tsx` → `src/App.tsx`. Move the global CSS (`src/app/globals.css`, including the `@theme` tokens) to `src/index.css` and import it in `main.tsx`.
3. Move everything in `src/app/layout.tsx` into `index.html`: `<title>`, meta description, Open Graph tags, favicon and `lang="en"`.
4. Fonts: replace `next/font/google` (Bebas Neue, Plus Jakarta Sans) with `@fontsource/bebas-neue` and `@fontsource-variable/plus-jakarta-sans`, or with a Google Fonts `<link>` in `index.html` that uses `display=swap`. Keep the same CSS variable names so the existing classes still work.
5. Replace every `next/image` `<Image>` with a plain `<img>` with `loading="lazy"` and `decoding="async"`, explicit `width`/`height` (or `aspect-ratio`), and correct `alt` text. The hero image gets `loading="eager"` and `fetchpriority="high"`. Remove `fill`/`sizes`/`priority` props and wrap images in a sized container where `fill` was used.
6. Replace `next/link` (Navbar, Footer) with plain `<a href="#section">`.
7. Remove every `"use client"` directive.
8. `package.json` scripts: `dev: vite`, `build: tsc -b && vite build`, `preview: vite preview`. Remove `next`, `@tailwindcss/postcss` and `@types/node` (unless still needed). Delete `next.config.ts`, `next-env.d.ts`, **both** `postcss.config.js` and `postcss.config.mjs`, `src/app/` and `.next/`. Update `tsconfig.json` to the standard Vite React setup (`tsconfig.app.json` + `tsconfig.node.json`). Update `eslint.config.mjs` so it no longer extends next.
9. Keep `public/` as is (Vite serves it from `/`). Image paths like `/images/products/x.png` stay the same.
10. Update `README.md` with the new commands. Update the Playwright scripts in `scripts/` and `qa/` to target the Vite dev server (`http://localhost:5173`).

**Done when:** `npm install && npm run build` passes with zero TS errors, `npm run dev` serves the full site and the browser console shows no errors.

---

## JOB 2 — Fix the visible bugs (seen in the owner's screenshots at 1920×1080)

### 2.1 Sticky header lets content bleed through
When you scroll, page text shows through the header (e.g. "From intimate birthday treats…" and the custom-cake form labels appear behind the logo and nav). The header is also huge, about 230px tall, and covers a fifth of the screen.
- Give the header a **solid** `bg-background` (or ≥ 95% opacity with `backdrop-blur-md`) once scrolled, plus a soft bottom shadow.
- **Shrink on scroll:** after about 80px, hide the top row (Instagram / WhatsApp / tagline) and scale the logo down so the bar is about 72px tall. Animate it with framer-motion.
- Add `scroll-margin-top` (header height + 16px) to every section, so anchor jumps don't hide headings under the header.

### 2.2 Active nav link and URL hash are wrong
The URL shows `#faq` while the nav highlights "Party Packs" or "Custom Cakes". Rewrite the scroll-spy with **one** `IntersectionObserver` (rootMargin of about `-45% 0px -50% 0px`). The section crossing the middle of the viewport is active. Update the hash with `history.replaceState` (not `location.hash`, which makes the page jump) and update the underline at the same moment. Animate the underline between items with framer-motion `layoutId`.

### 2.3 Stray circle/dot floating on the page
`src/components/CustomCursor.tsx` draws a ring + dot that lingers at random spots (under the "Send Cake Request" button, next to the party-pack cards). It looks like a broken UI element. **Delete the component and its usage.** The site should use the normal cursor.

### 2.4 Leave only one floating WhatsApp element
Check that the floating "Chat on WhatsApp" pill doesn't cover content or CTAs on any viewport (it currently overlaps the 200 PCS card). On mobile, collapse it to an icon-only circle and add bottom padding to the page so it never covers the cart or a form button.

### 2.5 More bugs found by screenshotting the running site (1440×900 and 390×844)
- **Hero right half is blank on first paint.** The hero meat pie only appears about 1–4s after load (slow entrance animation and lazy loading). Load it eagerly, show it within about 300ms and keep the entrance short.
- **Hero has about 150px of dead space** between the nav and the eyebrow text. Tighten it so the hero fits above the fold at 1440×900 with the pie and CTAs visible.
- **The "● GOLDEN MEAT PIE ₦1,200" floating tag collides with the WhatsApp pill** in the bottom-right, and a big pale-green circle (the WhatsApp pulse ring) sits behind both. Move the tag so it is attached to the pie image, and shrink the pulse ring to at most 1.4× the button size.
- **Customer-facing developer notes. Remove all of them:**
  - About: the box "Owner note: You can rewrite this story or swap your portrait in `src/data/site.ts` anytime."
  - Reviews subtitle: "(Owner: replace placeholder quotes below with real feedback)."
  - Review cards: "Customer review goes here, replace with a real one…" / "CUSTOMER NAME" / "Customer location".
  - Footer: "Made for Ifeyinwa Juliet."
  - `grep -rni "owner\|placeholder\|replace with\|goes here" src` must return no visible UI strings.
  - **Do not invent fake reviews.** Put reviews in `src/data/site.ts` as an array. If it's empty, **don't render the Reviews section or its nav link at all**. Leave a code comment explaining how to add them.
- **Scroll-spy is wrong in several places.** While Gallery, Reviews and FAQ are on screen, the nav still highlights "ABOUT". Handle sections that have no nav item (Gallery, FAQ) by keeping the nearest preceding nav item or clearing the highlight; don't leave a wrong one lit. FAQ is in the footer nav but not the header nav; make both navs consistent.
- **Section eyebrows hide under the header.** "WORD OF MOUTH", "VISUAL FEAST", "CLEAR ANSWERS" and "WARM PASTRIES AWAIT" all sit half-visible behind the translucent header when you jump to a section (fixed by 2.1).
- **The WhatsApp pill covers the footer's "Freshly baked with ♥ in…" line.** Add bottom padding to the footer equal to the pill's height + 24px.
- **The mobile header is about 140px tall.** The logo wraps to "IFEYINWA / PASTRIES" over two lines and the tagline over three. On mobile, show the logo on one line (smaller), hide the tagline, and keep the bar at about 64px. The pastry image shows through the mobile header too.
- **Mobile menu cards:** the next card peeks in on the right with clipped text ("Te… pe… fla…"). Either make it a deliberate snap carousel (scroll-snap, peek ≤ 24px, dots or arrows) or stack the cards. The "₦" sign is smaller than and misaligned with the price; render the price as one string in one font.
- **The Next.js dev-tools lightning badge** (bottom-left) will disappear with the Vite migration. Check that nothing else is fixed in that corner.

---

## JOB 3 — Make the images match the background

The product and section images don't belong on the warm cream page. Examples:
- **Custom Cakes section:** the celebration cake sits inside a visible grey/white rectangle with ragged, torn-looking edges.
- **Party Pack section:** the puff-puff/small-chops image has a white slab with jagged edges on its left side.

Fix it like this:
1. Write a small Python script, `scripts/audit_images.py`, that loads every PNG in `public/images/products/` and reports: size, whether it has an alpha channel, the percentage of fully transparent pixels, and whether the 4 corners are transparent. Any "cut-out" whose corners are opaque, or that has semi-opaque grey/white fringe pixels, **fails**.
2. For every failing PNG, remove the background properly with `rembg` (`pip install rembg`, model `isnet-general-use` or `u2net`). Then clean the edges: erode the alpha by 1–2px, feather it by about 1px and remove white/grey halo pixels (de-matte against white). Save as a transparent PNG and a WebP. Overwrite in place so paths don't change.
3. Run the audit again; every cut-out must pass.
4. Give **every** product cut-out the **same** grounding: one soft, warm contact shadow (a CSS `drop-shadow` in the brown token at low opacity, or a blurred ellipse under the item). There should be no boxes, borders or white cards behind cut-outs.
5. For the full-bleed photos (`baker.jpg`, `gallery-*.jpg`, `bg-texture.jpg`), make sure they are real photographs and not generated placeholders (see FIX_PROMPT §0.1). Give them a consistent warm grade: a subtle cream/brown overlay or `sepia(0.08) saturate(0.95)`, so they look like one set. Make every rounded image use the same radius token.
6. Add an `onError` fallback so a missing image shows a tasteful cream placeholder instead of a broken icon.
7. Make sure `menu.ts` doesn't point `image` and `detailImage` at the same file. If a separate detail image doesn't exist, hide the second view instead of showing a duplicate.

---

## JOB 4 — Slop audit + make it lively

### 4.1 Slop audit (go through EVERY file in `src/`)
- Replace hard-coded hex colours (`text-[#3B2418]`, `bg-[#A8324A]`…) with the `@theme` tokens. `grep -rn "\[#" src` should return 0 results.
- Remove dead code, unused imports, unused components, `console.log`s and commented-out blocks. Delete stale files in the repo root that no longer apply.
- Make spacing consistent: one section vertical-padding scale and one max-width container. Make headings use the same type scale everywhere.
- Fix text overlap and awkward wrapping (e.g. the "Advance order notice required" callout in Custom Cakes overlaps when the header passes over it).
- Make the form inputs in Custom Cakes and Party Packs use the same style (height, radius, focus ring in the accent colour, placeholder contrast ≥ 4.5:1).
- Remove anything the brief forbids (star ratings, invented review locations, etc.; see FIX_PROMPT §0.2).
- Make every button and link keyboard-focusable with a visible focus ring.

### 4.2 Animations (tasteful, not noisy; all of them must respect `prefers-reduced-motion`)
Build a small reusable `<Reveal>` wrapper (framer-motion `whileInView`, `once: true`, `amount: 0.2`) and use it for consistency.
- **Section entrances:** the eyebrow, heading and body fade up in sequence (stagger 0.08s, y 24→0, about 0.6s, ease `[0.22, 1, 0.36, 1]`).
- **Hero:** the main pastry floats gently (y ±8px, 6s loop, slight rotate ±2°). Headline words reveal one by one on load. CTAs scale in.
- **Product images in Custom Cakes / Party Packs:** slight scroll parallax (`useScroll` + `useTransform`, ±30px) and a soft float.
- **Menu cards:** stagger in when a tab changes (`AnimatePresence mode="popLayout"`). On hover, the card lifts 4px, the image scales to 1.05 and rotates 2°, and the shadow deepens.
- **Category tabs and nav:** a sliding pill/underline via `layoutId`.
- **Add to cart:** the button morphs to a ✓ for 1.2s, the cart icon in the header bounces and the item-count badge pops (scale 1→1.3→1).
- **Party pack size cards:** spring scale on select, and an animated border/glow on the selected one. The running total counts up and down (animated number).
- **Trust strip:** a slow infinite marquee.
- **Reviews:** cards drift in from alternating sides.
- **FAQ:** smooth height animation on open/close, and the chevron rotates.
- **Floating WhatsApp:** a gentle pulse ring every ~4s (not constant).
- **Buttons:** micro press (`whileTap={{ scale: 0.97 }}`).
- Keep it at 60fps: animate only `transform`/`opacity` and never layout properties on scroll.

---

## VERIFICATION (required before you finish)

1. `npm run build`: zero errors, zero warnings you introduced.
2. Run the dev server and use Playwright to take full-page and per-section screenshots at **360×800, 768×1024 and 1440×900**. Save them to `qa/screenshots/` (overwrite the old ones).
3. Open the screenshots and check each one against this list:
   - [ ] No content shows through the header; the header shrinks on scroll
   - [ ] The active nav item and URL hash match the visible section
   - [ ] No stray cursor ring/dot anywhere
   - [ ] Every product image is a clean cut-out on the cream background: no boxes, no white/grey fringe, same shadow style
   - [ ] The WhatsApp pill covers nothing important
   - [ ] No horizontal scroll at 360px
   - [ ] `grep -rn "next/" src` and `grep -rn "\[#" src` both return nothing
   - [ ] Animations run, and are disabled with reduced motion (test with Playwright `reducedMotion: 'reduce'`)
4. Run Lighthouse on the production preview (`npm run preview`). Performance ≥ 90 and Accessibility ≥ 95 on mobile.
5. Write a short `PROGRESS.md` update listing what changed, with before/after screenshot paths and anything you could NOT fix and why.

Do not claim something is fixed unless a screenshot shows it fixed.
