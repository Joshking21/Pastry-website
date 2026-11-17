import { chromium } from "playwright";

async function verifyScrollAndHeader() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(process.env.BASE_URL || "http://localhost:5174", { waitUntil: "networkidle" });

  console.log("=== VERIFYING HEADER & SCROLL BEHAVIOR ===");

  // Check initial header
  const header = page.locator("header");
  const initialBox = await header.boundingBox();
  console.log(`Initial header height: ${initialBox.height}px`);

  // Scroll down to #menu
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
  await page.waitForTimeout(600);

  const scrolledBox = await header.boundingBox();
  console.log(`Scrolled header height: ${scrolledBox.height}px`);

  // Verify hash updated
  const currentHash = await page.evaluate(() => window.location.hash);
  console.log(`Current URL hash after scroll: ${currentHash}`);

  // Check header background classes / opacity
  const headerClass = await header.getAttribute("class");
  console.log(`Header classes when scrolled: ${headerClass}`);

  // Check footer padding vs floating WhatsApp
  const footer = page.locator("footer");
  const footerPaddingBottom = await footer.evaluate((el) => window.getComputedStyle(el).paddingBottom);
  console.log(`Footer padding bottom: ${footerPaddingBottom}`);

  await browser.close();
  console.log("Scroll & header verification completed successfully.");
}

verifyScrollAndHeader().catch(console.error);
