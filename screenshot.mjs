import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "screenshot";
const viewport = process.argv[4] || "1440x900";
const scrollY = Number(process.argv[5] || 0);
const mode = process.argv[6] || (scrollY > 0 ? "viewport" : "full");
const extraWait = Number(process.argv[7] || 0); // ms of extra settling time (timed intro frames)
const reducedMotion = process.argv[8] === "rm"; // emulate prefers-reduced-motion: reduce
const [vw, vh] = viewport.split("x").map(Number);

const dir = "temporary screenshots";
fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(dir, `${label}-${n}.png`))) n++;
const out = path.join(dir, `${label}-${n}.png`);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: vw, height: vh, deviceScaleFactor: 1 });
if (reducedMotion) {
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 600 + extraWait));

if (scrollY > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise((r) => setTimeout(r, 300));
}

await page.screenshot({ path: out, fullPage: mode === "full" });
await browser.close();

console.log(out);
