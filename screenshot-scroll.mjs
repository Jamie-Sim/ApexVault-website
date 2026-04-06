import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIR  = join(ROOT, 'temporary screenshots');
if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const getN = () => {
  const existing = readdirSync(DIR).filter(f => f.startsWith('screenshot-'));
  const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
  return nums.length ? Math.max(...nums) + 1 : 1;
};

const scrollY  = parseInt(process.argv[2] || '0');
const label    = process.argv[3] || 'scroll';
const outPath  = join(DIR, `screenshot-${getN()}-${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

// Trigger all animations first
await page.evaluate(async () => {
  await new Promise(resolve => {
    const timer = setInterval(() => {
      window.scrollBy(0, 300);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(timer); resolve();
      }
    }, 30);
  });
});
await new Promise(r => setTimeout(r, 400));

// Now scroll to target position
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(`Saved: temporary screenshots/screenshot-${getN()-1}-${label}.png`);
