import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs("public/images/products", exist_ok=True)

# 1. Generate bg-texture.jpg (2400x1600)
# A pale warm off-white marble / light stone counter (#FAF6F0) with sparse flour dust
def make_bg_texture():
    w, h = 2400, 1600
    base = Image.new("RGB", (w, h), (250, 246, 240)) # #FAF6F0
    draw = ImageDraw.Draw(base)
    
    # Add subtle organic stone grain / marbling veins
    random.seed(42)
    for _ in range(30):
        start_x = random.randint(0, w)
        start_y = random.randint(0, h)
        points = [(start_x, start_y)]
        curr_x, curr_y = start_x, start_y
        for _ in range(8):
            curr_x += random.randint(-120, 140)
            curr_y += random.randint(-60, 90)
            points.append((curr_x, curr_y))
        draw.line(points, fill=(244, 239, 231), width=random.randint(4, 18))
    
    # Soft flour dust clusters
    dust_overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dust_draw = ImageDraw.Draw(dust_overlay)
    for _ in range(2500):
        x = random.randint(0, w)
        y = random.randint(0, h)
        r = random.randint(1, 4)
        alpha = random.randint(25, 75)
        dust_draw.ellipse([x-r, y-r, x+r, y+r], fill=(255, 255, 255, alpha))
        
    for _ in range(80):
        cx = random.randint(100, w-100)
        cy = random.randint(100, h-100)
        cr = random.randint(40, 180)
        alpha = random.randint(15, 40)
        dust_draw.ellipse([cx-cr, cy-cr, cx+cr, cy+cr], fill=(255, 255, 255, alpha))
        
    dust_overlay = dust_overlay.filter(ImageFilter.GaussianBlur(radius=6))
    base.paste(dust_overlay, (0, 0), dust_overlay)
    base = base.filter(ImageFilter.GaussianBlur(radius=1))
    base.save("public/images/bg-texture.jpg", quality=92)
    print("bg-texture.jpg generated")

# 2. Product cut-out generator helper
def make_product_cutout(filename, size, name, primary_color, secondary_color, details_text=""):
    w, h = size
    # Transparent RGBA canvas
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # 1. Warm soft drop shadow underneath
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    shadow_box = [int(w*0.18), int(h*0.58), int(w*0.82), int(h*0.82)]
    s_draw.ellipse(shadow_box, fill=(59, 36, 24, 75)) # Deep cocoa shadow with softness
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=int(w*0.045)))
    img.paste(shadow, (0, 0), shadow)
    
    # 2. Draw pastry body
    cx, cy = w // 2, int(h * 0.48)
    rx, ry = int(w * 0.32), int(h * 0.24)
    
    # Pastry gradient layers for rich 3D golden crust
    layers = 20
    for i in range(layers):
        factor = i / layers
        lrx = rx - int(factor * rx * 0.4)
        lry = ry - int(factor * ry * 0.4)
        loy = int(factor * -25)
        
        r = int(primary_color[0] + (secondary_color[0] - primary_color[0]) * factor)
        g = int(primary_color[1] + (secondary_color[1] - primary_color[1]) * factor)
        b = int(primary_color[2] + (secondary_color[2] - primary_color[2]) * factor)
        
        draw.ellipse([cx - lrx, cy + loy - lry, cx + lrx, cy + loy + lry], fill=(r, g, b, 255))
        
    # Crimping / crust edge details
    for angle_deg in range(0, 360, 12):
        rad = math.radians(angle_deg)
        ex = cx + int(rx * 0.96 * math.cos(rad))
        ey = cy + int(ry * 0.96 * math.sin(rad))
        draw.ellipse([ex-8, ey-8, ex+8, ey+8], fill=(210, 140, 50, 230))
        
    # Highlight & flour dusting on top
    flour = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    f_draw = ImageDraw.Draw(flour)
    f_draw.ellipse([cx - int(rx*0.6), cy - int(ry*0.7), cx + int(rx*0.6), cy + int(ry*0.1)], fill=(255, 250, 240, 90))
    flour = flour.filter(ImageFilter.GaussianBlur(radius=15))
    img.paste(flour, (0, 0), flour)
    
    # Text badge for clarity
    badge_draw = ImageDraw.Draw(img)
    text_color = (59, 36, 24, 240)
    badge_draw.rectangle([cx - int(w*0.35), int(h*0.44), cx + int(w*0.35), int(h*0.52)], fill=(255, 255, 255, 190))
    # Draw simple clean text lines if font not present
    badge_draw.text((cx - int(w*0.28), int(h*0.46)), name.upper(), fill=text_color)
    
    out_path = f"public/images/products/{filename}"
    img.save(out_path, "PNG")
    print(f"Generated {out_path}")

# 3. Baker & Gallery Photos (Scene images)
def make_scene_image(path, size, title, color_theme):
    w, h = size
    img = Image.new("RGB", (w, h), (250, 246, 240))
    draw = ImageDraw.Draw(img)
    
    # Warm radiant gradient
    for y in range(h):
        ratio = y / h
        r = int(color_theme[0] * (1 - ratio*0.3) + 250 * ratio*0.3)
        g = int(color_theme[1] * (1 - ratio*0.3) + 246 * ratio*0.3)
        b = int(color_theme[2] * (1 - ratio*0.3) + 240 * ratio*0.3)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
        
    # Add flour dust & light circles
    for _ in range(40):
        x = random.randint(50, w-50)
        y = random.randint(50, h-50)
        rad = random.randint(30, 160)
        draw.ellipse([x-rad, y-rad, x+rad, y+rad], fill=(255, 255, 255))
        
    img = img.filter(ImageFilter.GaussianBlur(radius=8))
    draw = ImageDraw.Draw(img)
    
    # Add card / focus vignette
    draw.rectangle([int(w*0.1), int(h*0.1), int(w*0.9), int(h*0.9)], outline=(183, 121, 63), width=2)
    draw.rectangle([int(w*0.12), int(h*0.75), int(w*0.88), int(h*0.86)], fill=(250, 246, 240))
    draw.text((int(w*0.15), int(h*0.78)), title.upper(), fill=(59, 36, 24))
    
    img.save(path, quality=90)
    print(f"Generated {path}")

def run():
    make_bg_texture()
    
    # Products
    products = [
        ("hero-meat-pie.png", (1400, 1400), "Golden Nigerian Meat Pie", (195, 125, 45), (235, 180, 85)),
        ("meat-pie.png", (1000, 1000), "Nigerian Meat Pies", (195, 125, 45), (235, 180, 85)),
        ("meat-pie-open.png", (1000, 1000), "Meat Pie (Open Filling)", (195, 125, 45), (145, 65, 30)),
        ("chicken-pie.png", (1000, 1000), "Creamy Chicken Pie", (205, 145, 55), (245, 200, 105)),
        ("sausage-roll.png", (1000, 1000), "Flaky Sausage Roll", (185, 115, 40), (225, 165, 75)),
        ("fish-roll.png", (1000, 1000), "Crispy Fish Roll", (190, 120, 42), (230, 170, 80)),
        ("egg-roll.png", (1000, 1000), "Jumbo Egg Roll", (200, 130, 48), (240, 185, 90)),
        ("doughnuts.png", (1000, 1000), "Sugar Doughnuts (Pack of 6)", (215, 155, 65), (250, 215, 130)),
        ("small-chops.png", (1000, 1000), "Small Chops Party Pack", (180, 95, 35), (230, 160, 70)),
        ("puff-puff.png", (1000, 1000), "Golden Puff-Puff Bowl", (210, 140, 50), (245, 195, 95)),
        ("celebration-cake.png", (1000, 1000), "Celebration Cake", (220, 190, 170), (255, 240, 230)),
        ("cupcakes.png", (1000, 1000), "Frosted Cupcakes (Box of 6)", (210, 120, 135), (250, 210, 220)),
        ("banana-bread.png", (1000, 1000), "Banana Bread Loaf", (150, 90, 40), (195, 135, 70)),
        ("chin-chin.png", (1000, 1000), "Crunchy Chin Chin (Jar)", (205, 135, 45), (245, 185, 85)),
        ("cinnamon-rolls.png", (1000, 1000), "Glazed Cinnamon Rolls (Pack of 4)", (170, 100, 45), (235, 180, 110)),
        ("cookies.png", (1000, 1000), "Choc-Chip Cookies (Pack)", (180, 115, 50), (220, 160, 85)),
    ]
    for fn, sz, name, c1, c2 in products:
        make_product_cutout(fn, sz, name, c1, c2)
        
    # Scenes
    make_scene_image("public/images/baker.jpg", (1000, 1250), "Juliet In The Kitchen · Jos", (215, 185, 160))
    make_scene_image("public/images/gallery-1.jpg", (1200, 1200), "Fresh Pastry Dough", (225, 205, 180))
    make_scene_image("public/images/gallery-2.jpg", (1200, 1200), "Hot Golden Pies Out of Oven", (215, 170, 130))
    make_scene_image("public/images/gallery-3.jpg", (1200, 1200), "Artisan Buttercream Piping", (230, 200, 205))
    make_scene_image("public/images/gallery-4.jpg", (1200, 1200), "Packed With Love For Delivery", (210, 185, 155))
    make_scene_image("public/images/gallery-5.jpg", (1200, 1200), "Party Platter Spread", (220, 165, 125))
    make_scene_image("public/images/gallery-6.jpg", (1200, 1200), "Signature Cupcake Gift Box", (225, 180, 190))
    make_scene_image("public/images/og-image.jpg", (1200, 630), "Ifeyinwa Pastries · Fresh Home Baking in Jos", (235, 215, 195))

if __name__ == "__main__":
    run()
