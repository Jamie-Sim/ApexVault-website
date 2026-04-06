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

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || 'viewport';
const outPath = join(DIR, `screenshot-${n}-${label}.png`);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 500));
// viewport only, no fullPage
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(`Saved: temporary screenshots/screenshot-${n}-${label}.png`);
