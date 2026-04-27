import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "hover";
const selector = process.argv[4] || ".chromatic-text";
const offsetX = Number(process.argv[5] || 0);
const offsetY = Number(process.argv[6] || 0);

const dir = "temporary screenshots";
fs.mkdirSync(dir, { recursive: true });
let n = 1;
while (fs.existsSync(path.join(dir, `${label}-${n}.png`))) n++;
const out = path.join(dir, `${label}-${n}.png`);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 700));

const box = await page.$eval(selector, (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});

await page.mouse.move(box.x + box.w * 0.5 + offsetX, box.y + box.h * 0.5 + offsetY, { steps: 12 });
await new Promise((r) => setTimeout(r, 600));

const el = await page.$(selector);
if (el) await el.screenshot({ path: out });
else await page.screenshot({ path: out });

await browser.close();
console.log(out);
