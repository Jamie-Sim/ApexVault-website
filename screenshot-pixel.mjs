import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "pixel";
const dir = "temporary screenshots";
fs.mkdirSync(dir, { recursive: true });
let n = 1;
while (fs.existsSync(path.join(dir, `${label}-${n}.png`))) n++;
const out = path.join(dir, `${label}-${n}.png`);

const browser = await puppeteer.launch({ headless: "new", args: ["--use-gl=swiftshader", "--enable-webgl"] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 3 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));

const el = await page.$(".chromatic-text");
if (el) await el.screenshot({ path: out });
else await page.screenshot({ path: out });

await browser.close();
console.log(out);
