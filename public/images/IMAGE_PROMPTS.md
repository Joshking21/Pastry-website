# Image Prompts & Asset Catalog for Ifeyinwa Pastries

All images generated for this project follow the strict specifications defined in `FIX_PROMPT.md` and `PROMPT.md`.

## Generation & Processing Pipeline
- **Generator Model:** `gemini-3.1-flash-image` (via Antigravity built-in `image-generator` subagent).
- **Background Removal Method:** Custom high-fidelity BFS flood-fill algorithm in Python (`scripts/process_batch.py` / `scripts/apply_batch.py`).
  - Target generation background: seamless `#FAF6F0` warm off-white studio surface.
  - Flood fill: BFS traversal from all 4 image borders with Euclidean color distance threshold ($\Delta E < 26.0$).
  - Cropping: Bounding box of non-zero alpha, preserving real crumbs, golden crust edges, and translucent highlights.
  - Positioning: Centered on transparent $1000 \times 1000\text{px}$ (or $1400 \times 1400\text{px}$ for hero) RGBA canvas, scaled to $78\%$ width with an $8\%$ bottom margin for CSS drop-shadow room. Zero baked shadows.
- **Verification:** Automated verification with `scripts/verify_images.py` checking dimensions, mode, transparency at corners, opaque area ($15\% - 75\%$), downscaled 256x256 unique color counts ($\ge 8,000$), and unique MD5 hashes.

---

## 1. Product Cut-outs (`public/images/products/`)

Shared style block appended to all product generation prompts:
> Professional commercial food photography, single product shot, three-quarter view from about 30° above, soft bright natural daylight from the upper left with a gentle fill from the right, shallow but complete focus so the whole product is sharp, true-to-life colours, warm golden-brown tones, glossy where it should be glossy, crumbs and flakes visible, realistic textures, authentic Nigerian home-baked look (not a European patisserie). The product is centred and fills about 75% of the frame width with even margin on all sides and nothing cropped. Plain, flat, seamless #FAF6F0 warm off-white background, no gradient, no surface, no table, no plate, no board, no napkin, no props, no cast shadow, no reflection, no text, no logo, no watermark, no hands.

| Filename | Target Size | Status | Subject Prompt |
|---|---|---|---|
| `hero-meat-pie.png` | 1400×1400 | PASS (18,539 colors, 30.3% opacity) | One large Nigerian meat pie (half-moon shape, shortcrust pastry, fork-crimped edge, glossy golden egg wash), broken open in the middle so steaming minced beef, small diced potato, diced carrot and onion in a thick savoury gravy spill out a little, light dusting of flour on the crust. |
| `meat-pie.png` | 1000×1000 | PASS (11,813 colors, 19.5% opacity) | Two whole Nigerian meat pies, half-moon shape, fork-crimped edges, glossy golden-brown egg wash, one resting slightly in front of and overlapping the other. Not broken. Different image from hero. |
| `meat-pie-open.png` | 1000×1000 | PASS (17,180 colors, 28.0% opacity) | One Nigerian meat pie cleanly cut in half with a knife, the two halves slightly apart, showing the cross-section: crumbly shortcrust, minced beef, diced potato and carrot. |
| `chicken-pie.png` | 1000×1000 | PASS (12,584 colors, 21.8% opacity) | Two whole Nigerian chicken pies, half-moon, fork-crimped, golden egg wash, flaky crust, a little lighter in colour than the meat pie. |
| `chicken-pie-open.png` | 1000×1000 | PASS (12,053 colors, 20.6% opacity) | One Nigerian chicken pie cut in half showing a creamy filling of shredded chicken, sweetcorn, diced potato and carrot in white sauce. |
| `sausage-roll.png` | 1000×1000 | PASS (17,975 colors, 29.8% opacity) | Three Nigerian sausage rolls, rectangular, flaky golden puff pastry with visible layers, the cut ends showing pink-brown seasoned minced-beef sausage filling, stacked casually two below and one on top. |
| `sausage-roll-open.png` | 1000×1000 | PASS (14,855 colors, 26.1% opacity) | One Nigerian sausage roll cut in half, cut faces toward the camera, showing the flaky layers wrapped around the sausage filling. |
| `fish-roll.png` | 1000×1000 | PASS (12,550 colors, 22.2% opacity) | Two Nigerian fish rolls: deep-fried, smooth, deep golden-brown, torpedo/log shaped with tapered ends (bread-like dough, not puff pastry), lying side by side at a slight angle. |
| `fish-roll-open.png` | 1000×1000 | PASS (16,164 colors, 27.8% opacity) | One Nigerian fish roll cut in half showing the soft dough and the spicy flaked mackerel filling with pepper and onion. |
| `egg-roll.png` | 1000×1000 | PASS (12,698 colors, 22.2% opacity) | Nigerian egg roll: a whole hard-boiled egg wrapped in sweet dough and deep-fried into a round, deep golden-brown ball. Show one whole egg roll and one cut in half beside it, revealing the white and the yellow yolk circle inside the dough. |
| `doughnuts.png` | 1000×1000 | PASS (13,200 colors, 25.0% opacity) | A small stack of five Nigerian doughnuts: round, puffy, no hole, deep golden-brown with the classic pale ring around the middle, rolled in granulated sugar. |
| `small-chops.png` | 1000×1000 | PASS (17,932 colors, 32.3% opacity) | A tight, appetising cluster of Nigerian small chops with no plate: golden puff-puff balls, two crisp triangular samosas, three slim golden spring rolls and two wooden skewers of peppered gizzard glossy with red pepper sauce and sliced onion. |
| `puff-puff.png` | 1000×1000 | PASS (18,627 colors, 32.0% opacity) | A neat pile of about ten Nigerian puff-puff: irregular round balls, deep golden-brown outside, fluffy, a light dusting of sugar. |
| `celebration-cake.png` | 1000×1000 | PASS (10,274 colors, 22.8% opacity) | An elegant two-tier celebration cake in smooth ivory buttercream, decorated with fresh blush-pink and cream roses and small gold-leaf touches, on a thin round gold cake board. |
| `celebration-cake-slice.png` | 1000×1000 | PASS (12,326 colors, 27.4% opacity) | One generous slice of that celebration cake, on its side, showing moist vanilla sponge layers with buttercream between them and a rose on top. No plate. |
| `cupcakes.png` | 1000×1000 | PASS (16,270 colors, 28.9% opacity) | Three cupcakes in kraft-paper liners with tall swirled buttercream: vanilla, strawberry-pink and chocolate, with a few sugar pearls, arranged in a small triangle. |
| `banana-bread.png` | 1000×1000 | PASS (15,314 colors, 28.0% opacity) | A moist banana bread loaf with a dark-golden crackled top and a split down the middle, with two thick slices cut off and leaning against it, showing the soft crumb with banana flecks. |
| `chin-chin.png` | 1000×1000 | PASS (11,933 colors, 20.0% opacity) | A small mound of Nigerian chin chin: crunchy, small golden-brown fried dough cubes and short strips, slightly irregular, matte, a few loose pieces around the base. |
| `cinnamon-rolls.png` | 1000×1000 | PASS (18,300 colors, 31.9% opacity) | Two large cinnamon rolls with a dark cinnamon-sugar swirl and a thick white glaze drizzled over, one pulled slightly apart to show the soft layers. |
| `cookies.png` | 1000×1000 | PASS (22,050 colors, 38.9% opacity) | A short stack of four chocolate chip cookies with golden edges, pools of melted chocolate and a few sea-salt flakes, the top one broken in half showing a gooey centre. |

---

## 2. Scenes & Textures (`public/images/`)

| Filename | Target Size | Status | Prompt |
|---|---|---|---|
| `bg-texture.jpg` | 2400×1600 | PASS (Mean: 235.8, Std: 5.3, 7,973 colors) | Seamless, tileable top-down photo texture of a pale warm off-white marble/light stone baking counter (base colour about #FAF6F0), with very faint grey-beige veining and a very sparse, light dusting of flour. Extremely low contrast, evenly lit, no vignette, no objects, no food. |
| `baker.jpg` | 1000×1250 | PASS (36,766 colors) | A Nigerian woman baker in a cream linen apron and a head wrap, seen from the side and slightly behind (her face is not the focus), kneading pastry dough on a floured counter by a sunny window; flour in the air catching the light; a tray of crimped meat pies out of focus in the background. |
| `gallery-1.jpg` | 1200×1200 | PASS (34,043 colors) | Top-down close-up of a baker's hands rolling pastry dough with a wooden rolling pin on a floured pale stone counter, a round cutter and a few cut circles of dough nearby. |
| `gallery-2.jpg` | 1200×1200 | PASS (37,552 colors) | A wire cooling rack of freshly baked, golden, fork-crimped Nigerian meat pies, a little steam rising, on a pale floured counter. |
| `gallery-3.jpg` | 1200×1200 | PASS (37,573 colors) | Close-up of a piping bag piping a cream buttercream rose onto a blush-pink two-tier cake, other piped roses already done. |
| `gallery-4.jpg` | 1200×1200 | PASS (36,071 colors) | Plain kraft bakery boxes (no printing) tied with jute twine, stacked and ready for delivery, one open showing meat pies and sausage rolls inside. |
| `gallery-5.jpg` | 1200×1200 | Pending (quota reset 12:53 UTC) | A party tray seen from above, full of Nigerian small chops: puff-puff, samosas, spring rolls, peppered gizzard skewers, with small bowls of chilli sauce. |
| `gallery-6.jpg` | 1200×1200 | Pending (quota reset 12:53 UTC) | An open kraft box of six assorted cupcakes with swirled buttercream in cream, pink and chocolate, sugar pearls, from about 45° above. |
| `og-image.jpg` | 1200×630 | Pending (quota reset 12:53 UTC) | Wide shot of the pale floured marble counter: a cluster of golden meat pies, puff-puff and a sausage roll on the right third only; the left 55% is clean, empty counter (for text overlay). |
