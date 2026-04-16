import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const DIR  = join(ROOT, 'temporary screenshots');
if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

const existing = readdirSync(DIR).filter(f => f.startsWith('screenshot-'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const n = nums.length ? Math.max(...nums) + 1 : 1;

const selector = process.argv[2] || 'body';
const label    = process.argv[3] || 'section';
const outPath  = join(DIR, `screenshot-${n}-${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

// Scroll to trigger all animations
await page.evaluate(async () => {
  await new Promise(resolve => {
    const timer = setInterval(() => {
      window.scrollBy(0, 300);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, 40);
  });
});
await new Promise(r => setTimeout(r, 600));

const el = await page.$(selector);
if (!el) { console.error('Selector not found:', selector); process.exit(1); }
await el.screenshot({ path: outPath });
await browser.close();

console.log(`Saved: temporary screenshots/screenshot-${n}-${label}.png`);
