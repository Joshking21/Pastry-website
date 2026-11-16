import { chromium } from "playwright";

async function testCake() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  await page.evaluate(() => {
    window.__lastUrl = null;
    window.open = (u) => {
      window.__lastUrl = u;
      return null;
    };
  });

  const section = page.locator("#custom-cakes");
  await section.scrollIntoViewIfNeeded();

  const dateInput = page.locator('#custom-cakes input[type="date"]');
  await dateInput.fill("2026-12-25");

  const validity = await dateInput.evaluate((el) => el.validity.valid);
  console.log("Date validity:", validity, "value:", await dateInput.inputValue());

  const btn = page.locator('#custom-cakes button[type="submit"]');
  console.log("Btn exists:", await btn.count(), "visible:", await btn.isVisible());
  await btn.click({ force: true });
  await page.waitForTimeout(500);

  const url = await page.evaluate(() => window.__lastUrl);
  console.log("Captured URL:", url);
  await browser.close();
}

testCake().catch(console.error);

