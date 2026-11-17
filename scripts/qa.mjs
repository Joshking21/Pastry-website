import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:5174";
const SCREENSHOTS_DIR = path.resolve("qa/screenshots");

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function runQA() {
  console.log("=== STARTING QA AUDIT ON " + BASE_URL + " ===");
  const results = {
    functional: {},
    images: [],
    consoleErrors: [],
    consoleWarnings: [],
    tapTargetFailures: [],
    bodyFontSizeFailures: [],
    viewports: ["360x800", "768x1024", "1440x900"],
  };

  const browser = await chromium.launch({ headless: true });

  // 1. Check Console & Network logs on standard desktop run
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      results.consoleErrors.push(msg.text());
    } else if (msg.type() === "warning") {
      results.consoleWarnings.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    results.consoleErrors.push(err.message);
  });

  page.on("response", (res) => {
    const url = res.url();
    if (url.includes("/images/")) {
      results.images.push({
        url: url.split("/images/")[1],
        status: res.status(),
      });
    }
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // Verify SEO and JSON-LD
  const title = await page.title();
  const metaDesc = await page.$eval(
    'meta[name="description"]',
    (el) => el.getAttribute("content")
  ).catch(() => null);
  const ogImage = await page.$eval(
    'meta[property="og:image"]',
    (el) => el.getAttribute("content")
  ).catch(() => null);
  const jsonLd = await page.$eval(
    'script[type="application/ld+json"]',
    (el) => JSON.parse(el.innerText)
  ).catch(() => null);

  results.functional.seo = {
    title,
    metaDesc,
    ogImage,
    jsonLdType: jsonLd ? jsonLd["@type"] : null,
    jsonLdName: jsonLd ? jsonLd.name : null,
  };

  console.log("SEO & Metadata check:", results.functional.seo);

  // Screenshots across 3 viewports
  for (const vp of [
    { name: "360x800", width: 360, height: 800, isMobile: true, hasTouch: true },
    { name: "768x1024", width: 768, height: 1024, isMobile: false, hasTouch: true },
    { name: "1440x900", width: 1440, height: 900, isMobile: false, hasTouch: false },
  ]) {
    console.log(`\n--- Testing Viewport ${vp.name} ---`);
    const vpContext = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
    });
    const vpPage = await vpContext.newPage();
    vpPage.setDefaultTimeout(45000);
    await vpPage.goto(BASE_URL, { waitUntil: "networkidle" });

    // Step 1: Full page screenshot
    await vpPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-01-full-page.png`),
      fullPage: true,
      animations: "disabled",
      timeout: 60000,
    });

    // Step 2: Hero on first load
    await vpPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-02-hero.png`),
    });

    // Step 3: Carousel at rest & mid-scroll
    const menuSection = vpPage.locator("#menu");
    await menuSection.scrollIntoViewIfNeeded();
    await vpPage.waitForTimeout(400);

    await vpPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-03-carousel-rest.png`),
    });

    // Click carousel next arrow
    const nextBtn = vpPage.locator('button[aria-label="Next pastries"]');
    if (await nextBtn.isVisible() && await nextBtn.isEnabled()) {
      await nextBtn.click();
      await vpPage.waitForTimeout(300);
      await vpPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${vp.name}-03-carousel-mid-scroll.png`),
      });
    }

    // Step 4: Each category tab
    const tabs = ["All", "Pastries", "Small Chops", "Cakes", "Snacks & Treats"];
    for (const tab of tabs) {
      const tabBtn = vpPage.locator(`#menu button:has-text("${tab}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click({ force: true });
        await vpPage.waitForTimeout(300);
        const safeTab = tab.toLowerCase().replace(/[^a-z0-9]/g, "-");
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-04-tab-${safeTab}.png`),
        });
      }
    }

    // Return to All tab
    const allTab = vpPage.locator('#menu button:has-text("All")').first();
    await vpPage.locator('#menu').scrollIntoViewIfNeeded();
    await allTab.click({ force: true });
    await vpPage.waitForTimeout(500);

    // Step 5: Product detail for Meat Pie (has detail image) and Puff-Puff (none)
    const pieClickTarget = vpPage.locator('#menu button:has-text("Golden Meat Pie")').first();
    await pieClickTarget.waitFor({ state: "visible", timeout: 5000 }).catch(() => null);

    if (vp.width === 1440) {
      if (await pieClickTarget.isVisible()) {
        await pieClickTarget.click({ force: true });
        await vpPage.waitForTimeout(200); // mid-transition capture
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-05-detail-transition.png`),
        });
        await vpPage.waitForTimeout(400); // finish open
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-05-detail-meat-pie.png`),
        });
        // Close with Esc key
        await vpPage.keyboard.press("Escape");
        await vpPage.waitForTimeout(500);
      }
    } else {
      if (await pieClickTarget.isVisible()) {
        await pieClickTarget.click({ force: true });
        await vpPage.waitForTimeout(500);
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-05-detail-meat-pie.png`),
        });
        // Close with close button
        const closeBtn = vpPage.locator('button[aria-label="Close product details"]').first();
        if (await closeBtn.isVisible()) {
          await closeBtn.click({ force: true });
        } else {
          await vpPage.keyboard.press("Escape");
        }
        await vpPage.waitForTimeout(500);
      }
    }

    // Detail for Puff-Puff
    const puffTab = vpPage.locator('#menu button[role="tab"]:has-text("Small Chops")').first();
    if (await puffTab.isVisible()) {
      await puffTab.click({ force: true });
      await vpPage.waitForTimeout(500);
    }
    const puffClickTarget = vpPage.locator('#menu button:has-text("Golden Puff-Puff")').first();
    if (await puffClickTarget.isVisible()) {
      await puffClickTarget.scrollIntoViewIfNeeded();
      await vpPage.waitForTimeout(300);
      await puffClickTarget.click({ force: true });
      await vpPage.waitForTimeout(500);
      await vpPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${vp.name}-05-detail-puff-puff.png`),
      });
      // Close with close button or Escape
      const closeBtn = vpPage.locator('button[aria-label="Close product details"]').first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click({ force: true });
      } else {
        await vpPage.keyboard.press("Escape");
      }
      await vpPage.waitForTimeout(500);
    }

    // Return to All tab
    await allTab.click({ force: true });
    await vpPage.waitForTimeout(300);

    // Step 6: Cart drawer with 3 items added and delivery form
    // Add 3 items
    const addButtons = vpPage.locator('#menu button:has-text("Add")');
    const addCount = await addButtons.count();
    if (addCount >= 3) {
      await addButtons.nth(0).click({ force: true });
      await vpPage.waitForTimeout(150);
      await addButtons.nth(1).click({ force: true });
      await vpPage.waitForTimeout(150);
      await addButtons.nth(2).click({ force: true });
      await vpPage.waitForTimeout(150);
    }

    // Open Cart Drawer
    const cartToggle = vpPage.locator('button[aria-label*="cart" i], button:has-text("Cart")').first();
    await cartToggle.click({ force: true });
    await vpPage.waitForTimeout(600);

    // Fill delivery form in Cart
    const nameInput = vpPage.locator('#customer-name, input[placeholder*="name" i]').first();
    if (await nameInput.isVisible()) {
      await nameInput.fill("Chioma Eze");
    }
    const phoneInput = vpPage.locator('input[placeholder*="phone" i], input[type="tel"]').first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill("08012345678");
    }
    const addressInput = vpPage.locator('#delivery-address, textarea').first();
    if (await addressInput.isVisible()) {
      await addressInput.fill("Rayfield, Jos, Plateau State");
    }

    await vpPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${vp.name}-06-cart-drawer.png`),
    });

    // Close Cart Drawer via Escape key
    await vpPage.keyboard.press("Escape");
    await vpPage.waitForTimeout(600);

    // Step 7: Custom Cake section filled in
    const cakeSection = vpPage.locator("#custom-cakes");
    if (await cakeSection.isVisible()) {
      await cakeSection.scrollIntoViewIfNeeded();
      await vpPage.waitForTimeout(300);

      const cakeName = cakeSection.locator('input[placeholder*="name" i]').first();
      if (await cakeName.isVisible()) await cakeName.fill("Emeka Johnson");

      const cakePhone = cakeSection.locator('input[placeholder*="phone" i], input[type="tel"]').first();
      if (await cakePhone.isVisible()) await cakePhone.fill("08098765432");

      const cakeDate = cakeSection.locator('input[type="date"]').first();
      if (await cakeDate.isVisible()) {
        const future = new Date();
        future.setDate(future.getDate() + 7);
        await cakeDate.fill(future.toISOString().split("T")[0]);
      }

      const cakeDesc = cakeSection.locator('textarea').first();
      if (await cakeDesc.isVisible()) {
        await cakeDesc.fill("2-tier vanilla sponge with buttercream floral decoration for 30th birthday.");
      }

      await vpPage.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${vp.name}-07-custom-cake.png`),
      });
    }

    // Step 8: Gallery lightbox open
    const gallerySection = vpPage.locator("#gallery");
    if (await gallerySection.isVisible()) {
      await gallerySection.scrollIntoViewIfNeeded();
      await vpPage.waitForTimeout(300);
      const galleryItem = gallerySection.locator('.grid > div').first();
      if (await galleryItem.isVisible()) {
        await galleryItem.click({ force: true });
        await vpPage.waitForTimeout(500);
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-08-gallery-lightbox.png`),
        });
        const closeLightbox = vpPage.locator('button[aria-label="Close image lightbox"]').first();
        if (await closeLightbox.isVisible()) {
          await closeLightbox.click({ force: true });
        } else {
          await vpPage.keyboard.press("Escape");
        }
        await vpPage.waitForTimeout(500);
      }
    }

    // Step 9: FAQ with one item open
    const faqSection = vpPage.locator("#faq");
    if (await faqSection.isVisible()) {
      await faqSection.scrollIntoViewIfNeeded();
      await vpPage.waitForTimeout(300);
      const firstFaq = faqSection.locator('button[aria-expanded]').first();
      if (await firstFaq.isVisible()) {
        await firstFaq.click({ force: true });
        await vpPage.waitForTimeout(400);
        await vpPage.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${vp.name}-09-faq-open.png`),
        });
      }
    }

    // Check 360px viewport specific requirements
    if (vp.width === 360) {
      console.log("Checking 360px specifics...");
      const scrollWidth = await vpPage.evaluate(() => document.documentElement.scrollWidth);
      results.functional.scrollWidthAt360 = scrollWidth;
      console.log(`document.documentElement.scrollWidth: ${scrollWidth} (expected 360)`);

      // Tap targets check
      const smallTargets = await vpPage.evaluate(() => {
        const interactive = Array.from(document.querySelectorAll("button, a, [role=button]"));
        const fails = [];
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            // Check bounding box
            if (rect.width < 43.5 || rect.height < 43.5) {
              fails.push({
                tag: el.tagName,
                text: el.innerText.trim().slice(0, 30),
                ariaLabel: el.getAttribute("aria-label"),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              });
            }
          }
        }
        return fails;
      });
      results.tapTargetFailures = smallTargets;
      console.log(`Tap target failures (< 44px): ${smallTargets.length}`);
      if (smallTargets.length > 0) {
        console.log("Small targets:", smallTargets.slice(0, 5));
      }

      // Body font size check (paragraphs / body copy)
      const smallText = await vpPage.evaluate(() => {
        const pTags = Array.from(document.querySelectorAll("p"));
        const fails = [];
        for (const el of pTags) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && el.innerText.trim().length > 10) {
            const fs = parseFloat(window.getComputedStyle(el).fontSize);
            if (fs < 15.5) {
              fails.push({
                text: el.innerText.trim().slice(0, 30),
                fontSize: fs,
                tag: el.tagName,
                className: el.className,
              });
            }
          }
        }
        return fails;
      });
      results.bodyFontSizeFailures = smallText;
      console.log(`Body text < 16px instances: ${smallText.length}`);
    }

    await vpContext.close();
  }

  // 10. Test WhatsApp URL Generation for Cart and Cake
  console.log("\n--- Testing WhatsApp URL Interception ---");
  const testContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const testPage = await testContext.newPage();
  await testPage.goto(BASE_URL, { waitUntil: "networkidle" });

  // Scroll menu into view and add 1 meat pie
  const menu = testPage.locator("#menu");
  await menu.scrollIntoViewIfNeeded();
  await testPage.waitForTimeout(500);

  const addBtn = testPage.locator('#menu button:has-text("Add")').first();
  await addBtn.click({ force: true });
  await testPage.waitForTimeout(500);

  // Open Cart Drawer
  const cartToggle = testPage.locator('button[aria-label*="cart" i]').first();
  await cartToggle.click({ force: true });
  await testPage.waitForTimeout(600);

  // Fill in required form fields in cart drawer
  const nameInput = testPage.locator('input[placeholder*="Adaobi"]').first();
  await nameInput.waitFor({ state: "visible", timeout: 5000 });
  await nameInput.fill("Test Customer");

  const addressInput = testPage.locator('input[placeholder*="Street Address" i]').first();
  await addressInput.waitFor({ state: "visible", timeout: 5000 });
  await addressInput.fill("123 State Secretariate, Jos");

  // Intercept window.open
  await testPage.evaluate(() => {
    window.__lastOpenedUrl = null;
    window.open = (url) => {
      window.__lastOpenedUrl = url;
      return null;
    };
  });

  const submitOrderBtn = testPage.locator('button:has-text("Send Order on WhatsApp")').first();
  await submitOrderBtn.click({ force: true });
  await testPage.waitForTimeout(500);

  const orderWhatsAppUrl = await testPage.evaluate(() => window.__lastOpenedUrl);
  results.functional.orderWhatsAppUrl = orderWhatsAppUrl;
  console.log("Captured Order WhatsApp URL:", orderWhatsAppUrl);
  if (orderWhatsAppUrl) {
    try {
      const u = new URL(orderWhatsAppUrl);
      const text = u.searchParams.get("text");
      console.log("Decoded Order Message:\n", text);
      results.functional.decodedOrderMessage = text;
    } catch (e) {
      console.error("Error parsing order URL:", e);
    }
  }

  // Close Cart Drawer so it doesn't block the page
  await testPage.keyboard.press("Escape");
  await testPage.waitForTimeout(600);

  // Test Custom Cake WhatsApp URL
  console.log("\n--- Testing Custom Cake WhatsApp URL ---");
  const cakeSection = testPage.locator("#custom-cakes");
  if (await cakeSection.isVisible()) {
    await cakeSection.scrollIntoViewIfNeeded();
    await testPage.waitForTimeout(300);

    const future = new Date();
    future.setDate(future.getDate() + 7);
    const dateStr = future.toISOString().split("T")[0];

    const dateInput = testPage.locator('#custom-cakes input[type="date"]');
    await dateInput.fill(dateStr);
    await testPage.fill('#custom-cakes textarea', "2-tier vanilla sponge cake with floral buttercream");

    await testPage.evaluate(() => {
      window.__lastOpenedUrl = null;
      window.open = (url) => {
        window.__lastOpenedUrl = url;
        return null;
      };
    });

    const submitCakeBtn = testPage.locator('#custom-cakes button[type="submit"]').first();
    if (await submitCakeBtn.isVisible()) {
      await submitCakeBtn.click({ force: true });
      await testPage.waitForTimeout(500);
    }

    const cakeWhatsAppUrl = await testPage.evaluate(() => window.__lastOpenedUrl);
    results.functional.cakeWhatsAppUrl = cakeWhatsAppUrl;
    console.log("Captured Cake WhatsApp URL:", cakeWhatsAppUrl);
    if (cakeWhatsAppUrl) {
      try {
        const u = new URL(cakeWhatsAppUrl);
        const text = u.searchParams.get("text");
        console.log("Decoded Cake Message:\n", text);
        results.functional.decodedCakeMessage = text;
      } catch (e) {
        console.error("Error parsing cake URL:", e);
      }
    }
  }

  // 11. Test Party Pack Builder Live Pricing
  console.log("\n--- Testing Party Pack Builder ---");
  const packSection = testPage.locator("#party-packs");
  if (await packSection.isVisible()) {
    await packSection.scrollIntoViewIfNeeded();
    await testPage.waitForTimeout(300);

    // Initial price
    const initialPriceText = await packSection.locator('span.font-heading.text-3xl, span.font-heading.text-4xl').first().innerText().catch(() => "");
    console.log("Initial Pack Price:", initialPriceText);

    // Click 200 PIECES size
    const largeSizeBtn = packSection.locator('button:has-text("200 PIECES")').first();
    if (await largeSizeBtn.isVisible()) {
      await largeSizeBtn.click();
      await testPage.waitForTimeout(200);
      const updatedPriceText = await packSection.locator('span.font-heading.text-3xl, span.font-heading.text-4xl').first().innerText().catch(() => "");
      console.log("Updated Pack Price after size change:", updatedPriceText);
      results.functional.partyPackPriceUpdated = initialPriceText !== updatedPriceText;
    }
  }

  // 12. Test prefers-reduced-motion
  console.log("\n--- Testing Prefers Reduced Motion ---");
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const motionPage = await motionContext.newPage();
  await motionPage.goto(BASE_URL, { waitUntil: "networkidle" });
  await motionPage.screenshot({
    path: path.join(SCREENSHOTS_DIR, "reduced-motion-hero.png"),
  });
  await motionContext.close();

  await browser.close();

  // Summary
  console.log("\n=== QA AUDIT COMPLETE ===");
  console.log(`Images loaded: ${results.images.length}`);
  const failedImages = results.images.filter((img) => img.status >= 400);
  console.log(`Failed images (4xx/5xx): ${failedImages.length}`);
  if (failedImages.length > 0) console.log("Failed images list:", failedImages);

  console.log(`Console Errors: ${results.consoleErrors.length}`);
  if (results.consoleErrors.length > 0) console.log(results.consoleErrors);

  console.log(`Console Warnings: ${results.consoleWarnings.length}`);
  if (results.consoleWarnings.length > 0) console.log(results.consoleWarnings);

  fs.writeFileSync("qa/qa-results.json", JSON.stringify(results, null, 2));
  console.log("Saved results to qa/qa-results.json");
}

runQA().catch((err) => {
  console.error("QA script error:", err);
  process.exit(1);
});
