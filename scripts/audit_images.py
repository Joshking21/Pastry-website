import os
import glob
from PIL import Image

def audit_products():
    print("=== AUDIT PRODUCT IMAGES (CUTOUTS & TRANSPARENCY) ===")
    product_images = glob.glob("public/images/products/*.png")
    if not product_images:
        print("ERROR: No PNGs found in public/images/products/")
        return False

    all_passed = True
    for img_path in sorted(product_images):
        basename = os.path.basename(img_path)
        try:
            with Image.open(img_path) as im:
                w, h = im.size
                mode = im.mode
                if mode != "RGBA":
                    print(f"[FAIL] {basename}: mode is {mode}, not RGBA!")
                    all_passed = False
                    continue

                # Check corners
                corners = [
                    (0, 0),
                    (w - 1, 0),
                    (0, h - 1),
                    (w - 1, h - 1)
                ]
                corner_alphas = [im.getpixel(pt)[3] for pt in corners]
                bad_corners = [a for a in corner_alphas if a > 10]

                # Check edge transparency (% of border pixels that are fully or mostly transparent)
                top_edge = [im.getpixel((x, 0))[3] for x in range(w)]
                bottom_edge = [im.getpixel((x, h - 1))[3] for x in range(w)]
                left_edge = [im.getpixel((0, y))[3] for y in range(h)]
                right_edge = [im.getpixel((w - 1, y))[3] for y in range(h)]
                border_alphas = top_edge + bottom_edge + left_edge + right_edge
                non_transparent_border = sum(1 for a in border_alphas if a > 20)
                border_pct = (non_transparent_border / len(border_alphas)) * 100

                # Check overall alpha distribution
                alpha_channel = im.split()[3]
                zero_alpha = sum(1 for p in alpha_channel.getdata() if p == 0)
                total_pixels = w * h
                transparent_pct = (zero_alpha / total_pixels) * 100

                if bad_corners or border_pct > 5.0 or transparent_pct < 10.0:
                    print(f"[FAIL] {basename} ({w}x{h}): corner alphas {corner_alphas}, border non-trans {border_pct:.1f}%, total transparent {transparent_pct:.1f}%")
                    all_passed = False
                else:
                    print(f"[PASS] {basename} ({w}x{h}): corners transparent {corner_alphas}, {transparent_pct:.1f}% alpha cutout, clean edges")
        except Exception as e:
            print(f"[ERROR] {basename}: {e}")
            all_passed = False

    return all_passed

def audit_full_bleed():
    print("\n=== AUDIT FULL BLEED PHOTOS ===")
    photos = [
        "public/images/baker.jpg",
        "public/images/og-image.jpg",
        "public/images/gallery-1.jpg",
        "public/images/gallery-2.jpg",
        "public/images/gallery-3.jpg",
        "public/images/gallery-4.jpg",
        "public/images/gallery-5.jpg",
        "public/images/gallery-6.jpg",
    ]
    all_passed = True
    for p in photos:
        if not os.path.exists(p):
            print(f"[FAIL] Missing file: {p}")
            all_passed = False
        else:
            size_kb = os.path.getsize(p) / 1024
            with Image.open(p) as im:
                print(f"[PASS] {p}: {im.size[0]}x{im.size[1]} ({size_kb:.1f} KB)")
    return all_passed

if __name__ == "__main__":
    p_ok = audit_products()
    f_ok = audit_full_bleed()
    print("\nOVERALL STATUS:", "ALL IMAGES OK" if (p_ok and f_ok) else "SOME ISSUES DETECTED")
