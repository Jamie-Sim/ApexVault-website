import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "zoom";
const dir = "temporary screenshots";
fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(dir, `${label}-${n}.png`))) n++;
const out = path.join(dir, `${label}-${n}.png`);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 600));

const el = await page.$(".hero-brand");
if (el) {
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out });
}
await browser.close();
console.log(out);
