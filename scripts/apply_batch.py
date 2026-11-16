import os
from collections import deque
from PIL import Image
import numpy as np

BRAIN_DIR = r"C:\Users\Joshking\.gemini\antigravity\brain\7659b602-4571-4e40-8161-59740ff21276"
PRODUCTS_OUT = os.path.join("public", "images", "products")
IMAGES_OUT = os.path.join("public", "images")

os.makedirs(PRODUCTS_OUT, exist_ok=True)
os.makedirs(IMAGES_OUT, exist_ok=True)

# 1. Product cutouts
products = [
    ("banana_bread_1794815613342.jpg", "banana-bread.png", 28.0),
    ("nigerian_chin_chin_1794815656066.jpg", "chin-chin.png", 26.0),
    ("cinnamon_rolls_1794815666849.jpg", "cinnamon-rolls.png", 26.0),
    ("chocolate_chip_cookies_1794815683043.jpg", "cookies.png", 26.0),
    ("nigerian_chicken_pie_1794815698301.jpg", "chicken-pie-open.png", 28.0),
    ("nigerian_sausage_roll_1794815709475.jpg", "sausage-roll-open.png", 26.0),
    ("nigerian_fish_roll_1794815729062.jpg", "fish-roll-open.png", 26.0),
    ("celebration_cake_png_1794815725154.jpg", "celebration-cake-slice.png", 28.0),
]

def process_product(src_name, target_name, threshold):
    src = os.path.join(BRAIN_DIR, src_name)
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[:2]

    corners = [arr[0,0,:3], arr[0,-1,:3], arr[-1,0,:3], arr[-1,-1,:3]]
    bg_color = np.median(corners, axis=0)
    diff = np.linalg.norm(arr[:, :, :3].astype(float) - bg_color.astype(float), axis=2)

    candidate_bg = diff < threshold
    visited = np.zeros((h, w), dtype=bool)
    q = deque()

    for x in range(w):
        if candidate_bg[0, x]: visited[0, x] = True; q.append((0, x))
        if candidate_bg[h-1, x]: visited[h-1, x] = True; q.append((h-1, x))
    for y in range(h):
        if candidate_bg[y, 0]: visited[y, 0] = True; q.append((y, 0))
        if candidate_bg[y, w-1]: visited[y, w-1] = True; q.append((y, w-1))

    while q:
        y, x = q.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and candidate_bg[ny, nx]:
                visited[ny, nx] = True
                q.append((ny, nx))

    arr[visited, 3] = 0

    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 0)
    if len(ys) == 0:
        print(f"ERROR: {target_name} empty mask")
        return
    min_y, max_y = ys.min(), ys.max()
    min_x, max_x = xs.min(), xs.max()

    cropped = Image.fromarray(arr).crop((min_x, min_y, max_x + 1, max_y + 1))
    cw, ch = cropped.size

    target_w, target_h = 1000, 1000
    scale = min((target_w * 0.78) / cw, (target_h * 0.78) / ch)
    nw, nh = int(cw * scale), int(ch * scale)
    resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    offset_x = (target_w - nw) // 2
    offset_y = target_h - nh - int(target_h * 0.08)
    canvas.paste(resized, (offset_x, offset_y), resized)

    out_path = os.path.join(PRODUCTS_OUT, target_name)
    canvas.save(out_path, format="PNG", optimize=True)
    print(f"Saved {out_path}")

for src_name, target_name, th in products:
    process_product(src_name, target_name, th)

# 2. bg-texture.jpg
def process_bg_texture():
    src = os.path.join(BRAIN_DIR, "baking_counter_texture_1794815745124.jpg")
    im = Image.open(src)
    arr = np.array(im, dtype=np.float32)

    tiled = np.tile(arr, (2, 3, 1))[:1600, :2400]
    y, x = np.mgrid[0:1600, 0:2400]

    v1 = np.sin(x / 180.0) * 5.0 + np.cos(y / 140.0) * 4.0
    v2 = np.sin((x + y) / 220.0) * 4.0 + np.cos((x - y) / 190.0) * 3.0
    v3 = np.cos(x / 110.0) * 3.5 + np.sin(y / 95.0) * 4.5

    tiled[:, :, 0] += v1
    tiled[:, :, 1] += v2
    tiled[:, :, 2] += v3

    tiled = tiled - np.mean(tiled) + 235.0
    tiled = np.clip(tiled, 0, 255).astype(np.uint8)

    res = Image.fromarray(tiled)
    out_path = os.path.join(IMAGES_OUT, "bg-texture.jpg")
    res.save(out_path, format="JPEG", quality=95)
    print(f"Saved {out_path}")

process_bg_texture()

# 3. Scenes: crop center
def crop_center_save(src_name, target_name, target_w, target_h):
    src = os.path.join(BRAIN_DIR, src_name)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = max(target_w / w, target_h / h)
    nw, nh = int(w * scale), int(h * scale)
    im_resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - target_w) // 2
    top = (nh - target_h) // 2
    cropped = im_resized.crop((left, top, left + target_w, top + target_h))
    out_path = os.path.join(IMAGES_OUT, target_name)
    cropped.save(out_path, format="JPEG", quality=95)
    print(f"Saved {out_path}")

scenes = [
    ("nigerian_baker_pastry_dough_1794815749894.jpg", "baker.jpg", 1000, 1250),
    ("baker_rolling_pastry_dough_1794815760470.jpg", "gallery-1.jpg", 1200, 1200),
    ("nigerian_meat_pies_cooling_rack_1794815774189.jpg", "gallery-2.jpg", 1200, 1200),
    ("buttercream_rose_cake_piping_1794815781670.jpg", "gallery-3.jpg", 1200, 1200),
]

for src_name, target_name, tw, th in scenes:
    crop_center_save(src_name, target_name, tw, th)

print("Batch processing complete!")

