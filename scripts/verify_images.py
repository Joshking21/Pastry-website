import os
import hashlib
import sys
import numpy as np
from PIL import Image

PRODUCTS = [
    ("hero-meat-pie.png", (1400, 1400)),
    ("meat-pie.png", (1000, 1000)),
    ("meat-pie-open.png", (1000, 1000)),
    ("chicken-pie.png", (1000, 1000)),
    ("chicken-pie-open.png", (1000, 1000)),
    ("sausage-roll.png", (1000, 1000)),
    ("sausage-roll-open.png", (1000, 1000)),
    ("fish-roll.png", (1000, 1000)),
    ("fish-roll-open.png", (1000, 1000)),
    ("egg-roll.png", (1000, 1000)),
    ("doughnuts.png", (1000, 1000)),
    ("small-chops.png", (1000, 1000)),
    ("puff-puff.png", (1000, 1000)),
    ("celebration-cake.png", (1000, 1000)),
    ("celebration-cake-slice.png", (1000, 1000)),
    ("cupcakes.png", (1000, 1000)),
    ("banana-bread.png", (1000, 1000)),
    ("chin-chin.png", (1000, 1000)),
    ("cinnamon-rolls.png", (1000, 1000)),
    ("cookies.png", (1000, 1000)),
]

SCENES = [
    ("bg-texture.jpg", (2400, 1600)),
    ("baker.jpg", (1000, 1250)),
    ("gallery-1.jpg", (1200, 1200)),
    ("gallery-2.jpg", (1200, 1200)),
    ("gallery-3.jpg", (1200, 1200)),
    ("gallery-4.jpg", (1200, 1200)),
    ("gallery-5.jpg", (1200, 1200)),
    ("gallery-6.jpg", (1200, 1200)),
    ("og-image.jpg", (1200, 630)),
]

def get_md5(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def verify():
    print(f"{'Filename':<30} | {'Dim':<12} | {'Mode':<5} | {'Unique Colors':<14} | {'Opacity %':<10} | {'Status'}")
    print("-" * 90)
    
    seen_hashes = {}
    failed = False
    
    # 1. Products
    for fn, (ew, eh) in PRODUCTS:
        path = os.path.join("public", "images", "products", fn)
        if not os.path.exists(path):
            print(f"{fn:<30} | MISSING FILE | FAIL")
            failed = True
            continue
            
        md5 = get_md5(path)
        if md5 in seen_hashes:
            print(f"{fn:<30} | DUPLICATE MD5 with {seen_hashes[md5]} | FAIL")
            failed = True
        else:
            seen_hashes[md5] = fn
            
        try:
            with Image.open(path) as im:
                w, h = im.size
                mode = im.mode
                
                # Check dimensions
                dim_ok = (w == ew and h == eh)
                
                # Check mode
                mode_ok = (mode == "RGBA")
                
                # Check corners
                im_rgba = im.convert("RGBA")
                arr = np.array(im_rgba)
                corners = [arr[0, 0, 3], arr[0, -1, 3], arr[-1, 0, 3], arr[-1, -1, 3]]
                corners_ok = all(c == 0 for c in corners)
                
                # Opaque area %
                alpha = arr[:, :, 3]
                opaque_pct = (np.sum(alpha > 200) / (w * h)) * 100
                opaque_ok = (15.0 <= opaque_pct <= 75.0)
                
                # Colors downscaled
                small = im_rgba.resize((256, 256), Image.Resampling.BILINEAR)
                s_arr = np.array(small)
                s_alpha = s_arr[:, :, 3]
                opaque_pixels = s_arr[s_alpha > 200][:, :3]
                
                if len(opaque_pixels) > 0:
                    unique_colors = len(np.unique(opaque_pixels, axis=0))
                else:
                    unique_colors = 0
                colors_ok = (unique_colors >= 8000)
                
                status = "PASS" if (dim_ok and mode_ok and corners_ok and opaque_ok and colors_ok) else "FAIL"
                if status == "FAIL":
                    failed = True
                print(f"{fn:<30} | {w}x{h:<8} | {mode:<5} | {unique_colors:<14} | {opaque_pct:>6.1f}%    | {status}")
        except Exception as e:
            print(f"{fn:<30} | ERROR: {e} | FAIL")
            failed = True
            
    # 2. Scenes
    for fn, (ew, eh) in SCENES:
        path = os.path.join("public", "images", fn)
        if not os.path.exists(path):
            print(f"{fn:<30} | MISSING FILE | FAIL")
            failed = True
            continue
            
        md5 = get_md5(path)
        if md5 in seen_hashes:
            print(f"{fn:<30} | DUPLICATE MD5 with {seen_hashes[md5]} | FAIL")
            failed = True
        else:
            seen_hashes[md5] = fn
            
        try:
            with Image.open(path) as im:
                w, h = im.size
                mode = im.mode
                dim_ok = (w == ew and h == eh)
                
                small = im.convert("RGB").resize((256, 256), Image.Resampling.BILINEAR)
                s_arr = np.array(small)
                unique_colors = len(np.unique(s_arr.reshape(-1, 3), axis=0))
                
                if fn == "bg-texture.jpg":
                    arr = np.array(im.convert("L"))
                    mean_b = np.mean(arr)
                    std_b = np.std(arr)
                    bg_ok = (mean_b >= 230 and std_b <= 12 and unique_colors >= 1500)
                    status = "PASS" if (dim_ok and bg_ok) else "FAIL"
                else:
                    colors_ok = (unique_colors >= 8000)
                    status = "PASS" if (dim_ok and colors_ok) else "FAIL"
                    
                if status == "FAIL":
                    failed = True
                print(f"{fn:<30} | {w}x{h:<8} | {mode:<5} | {unique_colors:<14} | {'N/A':<10} | {status}")
        except Exception as e:
            print(f"{fn:<30} | ERROR: {e} | FAIL")
            failed = True
            
    print("-" * 90)
    if failed:
        print("VERIFICATION FAILED: Some images do not meet the specification.")
        sys.exit(1)
    else:
        print("VERIFICATION PASSED: All images match specifications.")
        sys.exit(0)

if __name__ == "__main__":
    verify()

