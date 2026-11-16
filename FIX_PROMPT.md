# FIX: Ifeyinwa Pastries website — finish the images, fix the slop, verify in a real browser

You are picking up an existing Next.js project in this folder. A previous run was given `PROMPT.md` and **did not finish the job**. It reported success, but the site is not shippable. Your task is to fix it properly and **prove** it is fixed by checking the running site in a real browser.

Read this whole file before you touch anything. Then read `PROMPT.md` (the original brief: it is still the source of truth for design, sections and behaviour) and open every screenshot in `inspo/`.

---

## 0. What went wrong last time (an honest audit)

### 0.1 The images were never generated. They are fakes.

`scripts/generate_assets.py` used Python/PIL to **draw** placeholder shapes and called them product photos:

- **15 of the 16 "product cut-outs" are flat coloured ovals** with a ring of dots and a white strip with the product name printed on it in tiny default font (open `public/images/products/cupcakes.png`: it is a pink oval saying "FROSTED CUPCAKES (BOX OF 6)").
- **All 9 scene images** (`baker.jpg`, `gallery-1…6.jpg`, `og-image.jpg`, `bg-texture.jpg`) are a beige gradient covered in white blurred circles, a thin brown frame and a caption box. No photo at all. The "baker" image has no person in it.
- **Only one real image exists**: a genuine transparent cut-out of a broken-open meat pie. It was then **copied under three filenames**: `hero-meat-pie.png`, `meat-pie.png` and `meat-pie-open.png` are byte-identical (same MD5). It is also 1024×1024, not the required 1400×1400.
- `public/images/IMAGE_PROMPTS.md` claims "All images generated for this project follow the specifications". That is false.
- In `src/data/menu.ts`, 14 of 15 products have `detailImage` set to the **same file** as `image`, so the detail view shows the same picture twice, labelled "Whole & Sliced View".

### 0.2 The code ignores large parts of the brief

| Problem | Where |
|---|---|
| **431 hard-coded hex colours** (`text-[#3B2418]`, `bg-[#A8324A]`…) even though tokens already exist in `globals.css` `@theme` (`text-heading`, `bg-accent`, etc.) | every component |
| Product detail **exit animation can never run**: the component does `if (!product) return null` *before* `<AnimatePresence>`, so it unmounts instantly. Its container has `layoutId="product-card-…"` that matches nothing | `ProductDetailModal.tsx` |
| Detail view is a **boxed, bordered card floating over a blurred dark backdrop**. The brief and `inspo/04` show the detail taking over the menu area on the same light surface, other products sliding away, image travelling left, text sliding in from the right | `ProductDetailModal.tsx`, `MenuSection.tsx` |
| **Hero → products slide transition** (brief §2 Motion 1, `inspo/06`) not implemented; the link just calls `scrollIntoView` | `Hero.tsx` |
| **Star ratings rendered** (brief explicitly says *no star ratings*) | `ReviewsSection.tsx:52` |
| Review placeholders given **invented locations** ("Rayfield, Jos", "Bukuru, Jos") | `ReviewsSection.tsx` |
| **`✓` text glyphs used as icons** (brief: use `lucide-react`, no emoji/glyph icons) | `Hero.tsx:84-90` |
| **Glassmorphism** (`backdrop-blur-*`) used in 8 places (brief: avoid glassmorphism) | `Navbar`, `Hero`, `CartDrawer`, `ProductDetailModal`, `GallerySection` |
| **Invented business facts** not supplied by the owner: address "Rayfield", delivery neighbourhood list in the FAQ, domain `ifeyinwapastries.com`, "No preservatives", "Party & bulk discounts", product weights like "approx. 180g" | `site.ts`, `FaqSection.tsx`, `layout.tsx`, `Hero.tsx`, `menu.ts` |
| Hero claims **"Same-day baking"**, which contradicts the owner's **24-hour order notice** | `Hero.tsx:84` |
| Business details **hard-coded outside `site.ts`**: "Juliet", "JULIET'S OVEN", "Jos", `₦1,200`, WhatsApp greeting texts, JSON-LD opening hours | `Hero`, `CartDrawer`, `ContactSection`, `CustomCakeSection`, `FloatingWhatsApp`, `layout.tsx` |
| Uses `alert()` for form validation | `CartDrawer.tsx:50,55` |
| Undefined classes: `animate-scale-in`, `scrollbar-none` (not Tailwind v4 built-ins, never defined) | `Navbar.tsx:105`, `MenuSection.tsx:107` |
| Whole page marked `"use client"` (kills server rendering for no reason) | `src/app/page.tsx` |
| `background-attachment: fixed` + `repeat` on a texture that does not tile: janky on mobile Safari and shows seams | `globals.css` |
| Mobile quality bar broken: card descriptions are `text-xs` (12px, brief says 16px min body on mobile); quantity stepper buttons are 28px (`w-7 h-7`) and the Add pill ~32px tall (brief says 44px tap targets) | `MenuSection.tsx`, `ProductDetailModal.tsx` |
| Carousel cards use divider lines and a weak `-mt-3` overlap; in `inspo/02` the image clearly overlaps the bottom of the big name, with no borders | `MenuSection.tsx` |

The build passes (`npm run build` is green). **That is not the bar.** The bar is: it looks like `inspo/` adapted to a light warm palette, with real appetising Nigerian pastry photos, and every interaction works on a 360px phone.

---

## 1. Non-negotiable rules for this run

1. **Never draw, paint, render or procedurally generate a "photo"** with PIL, canvas, SVG, CSS gradients or any script. Every image must come from a real image-generation model.
2. **Never copy one image to several filenames.** Every file must be unique.
3. **If you cannot generate images** in this environment, **STOP** and say so plainly in your final message. Do not create placeholders, and do not report success. A half-done honest report is better than a fake "done".
4. **Never claim something works without having seen it work** in the browser (Phase 4). "Build passed" is not verification.
5. **Do not invent business facts.** Anything the owner has not provided goes in `src/data/site.ts` as a clearly marked placeholder, e.g. `// PLACEHOLDER: owner to confirm`.
6. **Don't rewrite what already works.** Cart state, `localStorage` persistence and the WhatsApp message format are fine; keep them.
7. Delete `scripts/generate_assets.py` (it is the placeholder generator) so it can never overwrite real images again.

---

## 2. Phase 1: generate every image for real

### 2.1 How to generate

Use, in this order of preference:

1. Your built-in image-generation tool, if you have one.
2. The Gemini API image model, called from a small script (e.g. `scripts/generate_images.py` or `.mjs`) that reads the key from the `GEMINI_API_KEY` environment variable. **Never write the key into any file.** If the variable is not set, stop and ask the user for it.
3. If neither is available: **stop** (rule 3).

Generate several candidates per image if needed and **look at each result yourself** before keeping it (§2.5).

### 2.2 Product cut-outs: shared style (apply to every product)

Append this exact style block to every product prompt:

> Professional commercial food photography, single product shot, three-quarter view from about 30° above, soft bright natural daylight from the upper left with a gentle fill from the right, shallow but complete focus so the whole product is sharp, true-to-life colours, warm golden-brown tones, glossy where it should be glossy, crumbs and flakes visible, realistic textures, authentic Nigerian home-baked look (not a European patisserie). The product is centred and fills about 75% of the frame width with even margin on all sides and nothing cropped. Plain, flat, seamless **#FAF6F0** warm off-white background, no gradient, no surface, no table, no plate, no board, no napkin, no props, no cast shadow, no reflection, no text, no logo, no watermark, no hands.

**Then make it transparent:**

1. Remove the background with `rembg` (Python, model `birefnet-general` or `isnet-general-use`, alpha matting on) or `@imgly/background-removal-node`.
2. Trim to the subject's bounding box, then place it centred on a transparent canvas of the **exact** target size, with the subject about 80% of the canvas width and the bottom margin about 8% (so the CSS drop-shadow has room).
3. Save as PNG, RGBA. Because the generation background was `#FAF6F0` (the page colour), any faint edge halo will be invisible on the site.
4. **Do not bake a shadow into the image.** The site adds one with CSS `drop-shadow`.

Keep the **existing real meat pie** (`hero-meat-pie.png`, currently 1024×1024) as the **style reference** for colour, light and angle. Every other product should look like it came from the same photoshoot. Regenerate the hero at 1400×1400, or upscale the existing one with a proper AI upscaler (never plain resize-and-blur).

### 2.3 Product cut-outs: the list (`public/images/products/`)

Prompt = subject text below + the shared style block above.

| File | Size | Subject prompt |
|---|---|---|
| `hero-meat-pie.png` | 1400×1400 | One large Nigerian meat pie (half-moon shape, shortcrust pastry, fork-crimped edge, glossy golden egg wash), broken open in the middle so steaming minced beef, small diced potato, diced carrot and onion in a thick savoury gravy spill out a little, light dusting of flour on the crust. |
| `meat-pie.png` | 1000×1000 | Two whole Nigerian meat pies, half-moon shape, fork-crimped edges, glossy golden-brown egg wash, one resting slightly in front of and overlapping the other. **Not broken.** Must be a different image from the hero. |
| `meat-pie-open.png` | 1000×1000 | One Nigerian meat pie cleanly cut in half with a knife, the two halves slightly apart, showing the cross-section: crumbly shortcrust, minced beef, diced potato and carrot. Different from the hero (clean cut, not broken). |
| `chicken-pie.png` | 1000×1000 | Two whole Nigerian chicken pies, half-moon, fork-crimped, golden egg wash, flaky crust, a little lighter in colour than the meat pie. |
| `chicken-pie-open.png` | 1000×1000 | One Nigerian chicken pie cut in half showing a creamy filling of shredded chicken, sweetcorn, diced potato and carrot in white sauce. |
| `sausage-roll.png` | 1000×1000 | Three Nigerian sausage rolls, rectangular, flaky golden puff pastry with visible layers, the cut ends showing pink-brown seasoned minced-beef sausage filling, stacked casually two below and one on top. |
| `sausage-roll-open.png` | 1000×1000 | One Nigerian sausage roll cut in half, cut faces toward the camera, showing the flaky layers wrapped around the sausage filling. |
| `fish-roll.png` | 1000×1000 | Two Nigerian fish rolls: deep-fried, smooth, deep golden-brown, torpedo/log shaped with tapered ends (bread-like dough, **not** puff pastry), lying side by side at a slight angle. |
| `fish-roll-open.png` | 1000×1000 | One Nigerian fish roll cut in half showing the soft dough and the spicy flaked mackerel filling with pepper and onion. |
| `egg-roll.png` | 1000×1000 | Nigerian egg roll: a whole hard-boiled egg wrapped in sweet dough and deep-fried into a round, deep golden-brown ball. Show one whole egg roll and one cut in half beside it, revealing the white and the yellow yolk circle inside the dough. |
| `doughnuts.png` | 1000×1000 | A small stack of five Nigerian doughnuts: round, puffy, **no hole**, deep golden-brown with the classic pale ring around the middle, rolled in granulated sugar. |
| `small-chops.png` | 1000×1000 | A tight, appetising cluster of Nigerian small chops with no plate: golden puff-puff balls, two crisp triangular samosas, three slim golden spring rolls and two wooden skewers of peppered gizzard glossy with red pepper sauce and sliced onion. |
| `puff-puff.png` | 1000×1000 | A neat pile of about ten Nigerian puff-puff: irregular round balls, deep golden-brown outside, fluffy, a light dusting of sugar. |
| `celebration-cake.png` | 1000×1000 | An elegant two-tier celebration cake in smooth ivory buttercream, decorated with fresh blush-pink and cream roses and small gold-leaf touches, on a thin round gold cake board (the board is allowed; no stand, no table). |
| `celebration-cake-slice.png` | 1000×1000 | One generous slice of that celebration cake, on its side, showing moist vanilla sponge layers with buttercream between them and a rose on top. No plate. |
| `cupcakes.png` | 1000×1000 | Three cupcakes in kraft-paper liners with tall swirled buttercream: vanilla, strawberry-pink and chocolate, with a few sugar pearls, arranged in a small triangle. |
| `banana-bread.png` | 1000×1000 | A moist banana bread loaf with a dark-golden crackled top and a split down the middle, with two thick slices cut off and leaning against it, showing the soft crumb with banana flecks. |
| `chin-chin.png` | 1000×1000 | A small mound of Nigerian chin chin: crunchy, small golden-brown fried dough cubes and short strips, slightly irregular, matte, a few loose pieces around the base. |
| `cinnamon-rolls.png` | 1000×1000 | Two large cinnamon rolls with a dark cinnamon-sugar swirl and a thick white glaze drizzled over, one pulled slightly apart to show the soft layers. |
| `cookies.png` | 1000×1000 | A short stack of four chocolate chip cookies with golden edges, pools of melted chocolate and a few sea-salt flakes, the top one broken in half showing a gooey centre. |

Then update `src/data/menu.ts`:

- Point `detailImage` at the `*-open` / `*-slice` files above for meat pie, chicken pie, sausage roll, fish roll and celebration cake.
- For every other product, **remove `detailImage`** (do not set it to the same file as `image`).

### 2.4 Scenes and textures (`public/images/`)

Shared style for all scenes (not the texture):

> Bright, airy, natural daylight photograph, warm and soft, light cream and caramel palette that matches #FAF6F0, editorial food-magazine quality, realistic, shot in a Nigerian home kitchen. No text, no logos, no watermark, no brand names on packaging. Any people are Black Nigerian, natural and unposed, with anatomically correct hands.

| File | Size | Prompt |
|---|---|---|
| `bg-texture.jpg` | 2400×1600 | **Seamless, tileable** top-down photo texture of a pale warm off-white marble/light stone baking counter (base colour about #FAF6F0), with very faint grey-beige veining and a very sparse, light dusting of flour. Extremely low contrast, evenly lit, no vignette, no objects, no food. It must tile with no visible seams. |
| `baker.jpg` | 1000×1250 (portrait) | A Nigerian woman baker in a cream linen apron and a head wrap, seen from the side and slightly behind (her face is **not** the focus), kneading pastry dough on a floured counter by a sunny window; flour in the air catching the light; a tray of crimped meat pies out of focus in the background. |
| `gallery-1.jpg` | 1200×1200 | Top-down close-up of a baker's hands rolling pastry dough with a wooden rolling pin on a floured pale stone counter, a round cutter and a few cut circles of dough nearby. |
| `gallery-2.jpg` | 1200×1200 | A wire cooling rack of freshly baked, golden, fork-crimped Nigerian meat pies, a little steam rising, on a pale floured counter. |
| `gallery-3.jpg` | 1200×1200 | Close-up of a piping bag piping a cream buttercream rose onto a blush-pink two-tier cake, other piped roses already done. |
| `gallery-4.jpg` | 1200×1200 | Plain kraft bakery boxes (no printing) tied with jute twine, stacked and ready for delivery, one open showing meat pies and sausage rolls inside. |
| `gallery-5.jpg` | 1200×1200 | A party tray seen from above, full of Nigerian small chops: puff-puff, samosas, spring rolls, peppered gizzard skewers, with small bowls of chilli sauce. |
| `gallery-6.jpg` | 1200×1200 | An open kraft box of six assorted cupcakes with swirled buttercream in cream, pink and chocolate, sugar pearls, from about 45° above. |
| `og-image.jpg` | 1200×630 | Wide shot of the pale floured marble counter: a cluster of golden meat pies, puff-puff and a sausage roll on the **right third** only; the **left 55% is clean, empty counter** (for text overlay). |

Note for `bg-texture.jpg`: in `globals.css`, either tile it (only if it is truly seamless) or use it once with `background-size: cover` on a fixed full-screen pseudo-element (`body::before { position: fixed; inset: 0; z-index: -1; … }`). **Remove `background-attachment: fixed`.**

### 2.5 Look at every image yourself before keeping it

Open each final file and **reject and regenerate** it if any of these are true:

- It is the wrong food (e.g. the fish roll looks like a sausage roll, the egg roll has no egg, the Nigerian doughnuts have holes, the meat pie looks like a Cornish pasty with a twisted crimp).
- There is any text, letters, a logo or a watermark.
- There is a plate, table, surface, board (except the cake board), hands, a cast shadow or a checkerboard pattern baked into the pixels.
- Part of the product is cut off at the edge, or it is tiny in the frame.
- There are visible halos, jagged edges or holes punched through the food by background removal.
- People have deformed hands or faces, or extra fingers.
- It does not match the others in light, angle and colour.

### 2.6 Automated image check (must pass)

Create `scripts/verify_images.py` and run it. It must **exit non-zero** on any failure and print a table of results. It checks:

1. Every file listed in §2.3 and §2.4 exists.
2. Exact pixel dimensions match the tables.
3. **No two files have the same MD5 hash.**
4. Products: mode is RGBA; all four corner pixels have alpha 0; the opaque area (alpha > 200) is between 15% and 75% of the canvas.
5. "Is it a real photo?": downscale to 256×256 and count distinct RGB colours (products: opaque pixels only). Require **≥ 8,000**. For reference, the fake placeholders score about 2,000 and the real meat pie about 23,000.
6. `bg-texture.jpg`: mean brightness ≥ 230 (0–255) and standard deviation ≤ 12 (so text stays readable), and at least 1,500 distinct colours.

Then rewrite `public/images/IMAGE_PROMPTS.md` so it lists the **exact** prompts you actually used, the model, and the background-removal method. Do not claim anything you did not do.

---

## 3. Phase 2: fix the code

Work file by file. After each group of changes, run `npm run build`.

### 3.1 Design tokens (all components)

- Replace **every** hex literal in `src/components/**` and `src/app/page.tsx` with the theme tokens defined in `globals.css` (`bg-bg`, `bg-surface`, `text-heading`, `text-caramel`, `text-text`, `text-muted`, `bg-accent`, `hover:bg-accent-hover`, `border-border`, with `/opacity` modifiers where needed).
- **Acceptance:** `grep -rE "#[0-9A-Fa-f]{6}" src/components src/app/page.tsx` returns **nothing**.
- Remove every `backdrop-blur-*`. Use solid `bg-bg` or `bg-surface` (the sticky header can be `bg-bg/95` with no blur).
- Define `animate-scale-in` in `globals.css` (a short scale+fade keyframe) or remove its use. Hide the carousel scrollbar with a real utility (`[&::-webkit-scrollbar]:hidden` plus `scrollbar-width: none`) instead of the non-existent `scrollbar-none`.

### 3.2 `src/data/site.ts` is the only place for business facts

Add and use: `ownerFirstName` ("Juliet", used in greetings and the hero), `heroHeadline` (two lines), `siteUrl` (`// PLACEHOLDER: set to the real domain after deploying`), structured `openingHours` usable by the JSON-LD, and `whatsappGreetings` for the hero, floating button, contact and custom-cake messages.

- Remove the invented address "Rayfield": set `address` to a clearly marked placeholder.
- Remove the invented neighbourhood list from the FAQ answer; use only `siteConfig.deliveryAreas`.
- `layout.tsx`: use `siteConfig.siteUrl` for `metadataBase`, OG `url` and the JSON-LD `image`/`url`; build `openingHours` from `site.ts`.
- **Acceptance:** `grep -rniE "juliet|rayfield|bukuru|jos" src/components src/app` returns nothing (everything comes from `siteConfig`).

### 3.3 `src/data/menu.ts`

- Remove invented specifics the owner never gave (exact gram weights like "approx. 180g", "no preservatives"). Use neutral wording such as `size: "Regular"`, and add a top-of-file comment that prices and specs are placeholders for the owner to confirm.
- Image paths as in §2.3.

### 3.4 `src/app/page.tsx`

Remove `"use client"`. The page is a server component that renders client components (`CartProvider` is already a client component).

### 3.5 `Hero.tsx` (match `inspo/01`, light version)

- Headline: two lines from `siteConfig.heroHeadline`, cocoa then caramel, filling about half the viewport width on desktop (`clamp()`-based font size, e.g. `clamp(3.5rem, 9vw, 9rem)`) with tight leading.
- Remove the "Same-day baking", "Party & bulk discounts" and `✓` row entirely (the Trust Strip section already covers this). If you keep any icon row, use `lucide-react` icons and only claims taken from `site.ts`.
- Remove the blurred floating price badge, or make it a solid `bg-bg` pill whose name and price come from `MENU_ITEMS` (no hard-coded `₦1,200`).
- The hero pie should be **large** and partly bleed off the right edge on desktop, like the loaf in `inspo/01`, with flour dust drifting around it.
- **Hero → menu transition (brief §2 Motion 1, `inspo/06`):** clicking "SEE WHAT'S BAKING" slides the hero content out to the left (x: 0 → −80px, opacity → 0, about 400ms) while smooth-scrolling to `#menu`, and the menu cards enter **from the right** with a stagger (x: 120px → 0, spring). Also trigger the card entrance with `whileInView` (`once: true`) for users who just scroll. With `prefers-reduced-motion`, use plain fades.

### 3.6 `MenuSection.tsx`: the carousel (match `inspo/02` and `inspo/03`)

- No borders or divider lines on cards (remove `border-t` above the price). Products float on the surface.
- Name **above** the image, very large condensed cocoa type (around `clamp(2rem, 3.2vw, 3rem)`), and the image **visibly overlaps the bottom third of the name**: the image sits on top (higher z-index), pulled up by about 30–40% of the name's height.
- Visible cards: 3 on desktop (≥1024px), 2 on tablet, 1 on phone, with the next card **peeking** at the edge on every size.
- Keep native scroll-snap for touch. Add **mouse drag-to-scroll** on desktop. Prev/next arrows scroll by exactly one card, and are **disabled** at the start and end.
- Remove the "Showing N delicacies · Swipe or scroll" filler.
- Description: `text-base` (16px) on mobile.
- Tap targets: Add pill at least 44px tall; stepper buttons at least 44×44px (`size-11`).
- Changing category re-animates the cards (exit left, new cards enter from the right, staggered).

### 3.7 Product detail view (match `inspo/04` and `inspo/05`). Rebuild it.

Rebuild `ProductDetailModal.tsx` (rename it `ProductDetail.tsx`) as follows:

- **Structure:** in `MenuSection`, wrap with `<LayoutGroup>` and render `<AnimatePresence>{selected && <ProductDetail key={selected.id} … />}</AnimatePresence>`. No early `return null` above `AnimatePresence`.
- **Desktop/tablet (≥768px):** the detail view **replaces the carousel in place, inside the menu section, on the same light textured surface**. No dark backdrop, no blur, no bordered card. The other cards slide out (left and right) and fade.
- **Image travel:** the clicked card's image and the detail's main image share `layoutId={"product-image-" + id}`, so the image **flies from its card position to the left column**. Make sure only one element with that `layoutId` is rendered at a time (hide the card's own image while it is selected).
- **Left column:** the main image large (whole product). If `detailImage` exists, show it **below and slightly offset**, as large as the main image, like the whole loaf plus slices in `inspo/04`. No tiny 64px thumbnails.
- **Right column** (slides in from the right after the image arrives, about 150ms delay): category and tag, huge condensed name, description, then a **"What's inside" row styled like the nutrition row in `inspo/04`**: 2–4 columns, each with a small caramel condensed label (FILLING / SIZE / PACK) and the value underneath. No grey boxed pills. Then a large thin-weight price with a smaller ₦, the quantity stepper and the crimson Add pill.
- **Round ✕ close button** at the top right (outlined circle, 48px), plus the **Esc** key. Closing reverses the animation: the image flies back into its card and the cards slide back.
- **Phone (<768px):** a full-screen sheet that slides up from the bottom, image on top, details below, sticky bottom bar with price + stepper/Add, ✕ at the top right.
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the name, focus moves to ✕ on open, Tab is trapped inside, focus returns to the card that opened it, and body scroll lock restores the **previous** overflow value (not `"unset"`).

### 3.8 Everything else

- `ReviewsSection.tsx`: remove the stars and the `Star` import. Locations become `"Customer location"`. Keep the obvious placeholder text.
- `CartDrawer.tsx`: replace `alert()` with inline error messages under the fields (`aria-invalid`, `aria-describedby`), and focus the first invalid field. Validation messages use `siteConfig.ownerFirstName`.
- `GallerySection.tsx`: the lightbox stays, but remove the blur. Keyboard: Esc closes, ← → navigate. Use `alt` text that describes each new photo.
- `AboutSection.tsx`: uses the real `baker.jpg`. Remove the invented "Rayfield". Keep the "owner: rewrite in your own voice" marker.
- `Navbar.tsx`: keep the centred brand + tagline, socials on the left and cart on the right; the centred nav row underneath on desktop. Active link in crimson with a small underline. No blur.
- `README.md`: update the image section (how they were generated, `verify_images.py`) and the placeholder checklist (add `siteUrl` and `address`). Remove the emoji headings.

---

## 4. Phase 3: check the LIVE site in a real browser (mandatory)

Do not skip this phase. Do not mark anything done from reading code alone.

### 4.1 Run it

```bash
npm run build      # must pass with zero errors and zero type errors
npm run start      # serves the production build on http://localhost:3000
```

Use the production build, not just `next dev`.

### 4.2 Open it in a real browser and screenshot it

Use your browser tool. If you don't have one, install Playwright (`npm i -D playwright && npx playwright install chromium`) and write `scripts/qa.mjs` to drive Chromium.

Capture at **three viewports**: **360×800** (phone), **768×1024** (tablet) and **1440×900** (desktop). Save screenshots to `qa/screenshots/<viewport>-<step>.png`:

1. Full page, top to bottom.
2. Hero on first load (wait for fonts and images).
3. Menu carousel at rest, and mid-scroll after clicking the next arrow.
4. Each category tab (All, Pastries, Small Chops, Cakes, Snacks & Treats).
5. Product detail **open** for Meat Pie (has a detail image) and for Puff-Puff (has none). On desktop, also capture a frame **mid-transition** (about 200ms after the click) to prove the image travels.
6. Cart drawer with 3 different items added, then the filled-in delivery form.
7. Custom cake form filled in.
8. Gallery lightbox open.
9. FAQ with one item open.

### 4.3 Functional checks (record pass/fail for each)

- [ ] Every image on the page loads (no 404s in the network log, no broken-image icons). List the network requests for `/images/` and their status codes.
- [ ] **Zero** console errors or warnings (React key warnings and hydration warnings count as failures).
- [ ] At 360px: `document.documentElement.scrollWidth === 360` (no horizontal scroll) on the page **and** with the detail sheet and the cart open.
- [ ] Every button and link has a bounding box at least 44×44px at 360px (script it: query all `button, a, [role=button]` and list any that fail).
- [ ] Body text is computed at 16px or more at 360px.
- [ ] Add → stepper appears → + / − change the quantity → the header cart count updates → reload the page → the cart is still there (`localStorage`).
- [ ] "Send order on WhatsApp" builds the right URL: intercept `window.open` / the link and print the decoded message. It must match the format in `PROMPT.md` §4 with correct ₦ totals.
- [ ] Custom cake submit produces a correct, pre-filled WhatsApp URL (print it decoded).
- [ ] Party pack builder: changing size and ticking items updates the price live; "Add pack to order" puts it in the cart.
- [ ] Product detail: opens on click and on Enter, closes on ✕ and Esc, the closing animation plays (the element is still in the DOM about 100ms after closing), and focus returns to the card.
- [ ] With `prefers-reduced-motion: reduce` emulated: no sliding, no particles, no custom cursor; everything still works.
- [ ] Custom cursor appears on desktop only, and not when emulating touch.
- [ ] Lighthouse (mobile) on the production build: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95. Report the actual numbers.
- [ ] `view-source`: `<title>`, meta description, OG image and the `Bakery` JSON-LD are present and use `site.ts` values.

### 4.4 Visual checks (look at your screenshots)

Put `inspo/01`, `02` and `04` next to your desktop screenshots and check honestly:

- [ ] The hero reads like `inspo/01`: huge two-line condensed headline on the left, one big pastry on the right, flour dust, on a **light** surface.
- [ ] The carousel reads like `inspo/02`: three products floating, big names with images overlapping them, thin large prices, small crimson Add pills. No boxes, no borders.
- [ ] The detail view reads like `inspo/04`: product images on the left, big name and details on the right, round ✕. Same light surface, not a modal card over a dark blur.
- [ ] All products look like one consistent photoshoot (same light, same angle, similar scale on screen).
- [ ] Nothing looks like a placeholder anywhere on the page.
- [ ] Nothing overlaps or is cut off at 360px or 768px; the header doesn't wrap awkwardly.

**If anything fails: fix it, rebuild, and re-run all of Phase 3.** Repeat until every box passes.

### 4.5 If the site is deployed

If a deployed URL exists (e.g. on Vercel), run §4.2–4.4 again against that URL after deploying, because image optimisation and caching behave differently in production. Do not deploy or push unless the user asks you to.

---

## 5. Phase 4: report back

Write `qa/QA_REPORT.md` containing:

1. The output of `scripts/verify_images.py`.
2. Every checkbox from §4.3 and §4.4 with PASS/FAIL and a one-line note. Embed or link the relevant screenshot for each.
3. Lighthouse scores, with the actual numbers.
4. What is still a placeholder for the owner (`siteUrl`, `address`, reviews, about text, prices).
5. **Anything you could not do or could not verify, stated plainly.**

Your final chat message must be a short summary of the above. Say "done" only if every check passed. If any did not, list them first.
