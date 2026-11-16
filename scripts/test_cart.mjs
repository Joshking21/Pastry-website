import { chromium } from "playwright";

async function testCart() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  const menu = page.locator("#menu");
  await menu.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const addBtn = page.locator('#menu button:has-text("Add")').first();
  console.log("addBtn count:", await page.locator('#menu button:has-text("Add")').count());
  console.log("addBtn visible:", await addBtn.isVisible());
  // Evaluate click directly
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("#menu button"));
    const add = btns.find(b => b.innerText.includes("Add"));
    if (add) {
      add.click();
      return true;
    }
    return false;
  });
  console.log("Direct JS click executed:", clicked);
  await page.waitForTimeout(500);

  const cartState = await page.evaluate(() => localStorage.getItem("ifeyinwa_pastries_cart_v1"));
  console.log("Cart in localStorage:", cartState);

  // Open cart drawer
  const cartBtn = page.locator('button[aria-label*="cart" i]').first();
  await cartBtn.click({ force: true });
  await page.waitForTimeout(500);

  const hasNameInput = await page.locator('input[placeholder*="Adaobi"]').isVisible();
  console.log("Name input visible in drawer:", hasNameInput);

  await browser.close();
}

testCart().catch(console.error);
