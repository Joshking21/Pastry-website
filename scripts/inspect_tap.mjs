import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  
  const fails = await page.evaluate(() => {
    const interactive = Array.from(document.querySelectorAll("button, a, [role=button]"));
    return interactive
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          text: el.innerText.trim().slice(0, 30),
          ariaLabel: el.getAttribute("aria-label"),
          className: el.className,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          href: el.getAttribute("href"),
        };
      })
      .filter((el) => el.width > 0 && el.height > 0 && (el.width < 43.5 || el.height < 43.5));
  });

  console.log("Total tap target failures (< 44px) at 360px:", fails.length);
  if (fails.length > 0) {
    console.log(JSON.stringify(fails, null, 2));
  }
  await browser.close();
}

main().catch(console.error);
