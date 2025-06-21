import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { clientEnv } from './config/env.client.config';
import { storyToUrlPath, THUMBNAIL_ID } from './config/storybook/utils';

const tsxToWebp = async (
  url: string,
  outputPath: string,
  viewport = { width: 1920, height: 1080 },
) => {
  const browser = await puppeteer.launch({ defaultViewport: viewport });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const iframe = await page.waitForSelector('iframe#storybook-preview-iframe', { timeout: 30_000 });
  if (!iframe) throw new Error('Iframe not found');

  const iframeContent = await iframe.contentFrame();
  if (!iframeContent) throw new Error('Iframe content not available');

  const element = await iframeContent.waitForSelector(`#${THUMBNAIL_ID}`, { timeout: 30_000 });
  if (!element) throw new Error(`Element #${THUMBNAIL_ID} not found`);

  await element.screenshot({ path: `${outputPath}.webp`, type: 'webp', quality: 70 });
  await browser.close();
};

const storyModules = [
  [
    '@/components/sections/image-block/image-block-1/image-block-1.stories',
    { width: 1100, height: 1080 },
  ],
  ['@/components/sections/hero/hero-1/hero-1.stories', { width: 1100, height: 1080 }],
] as [string, Parameters<typeof tsxToWebp>[2]][];

(async () => {
  for (const [modulePath, viewport] of storyModules) {
    const mod = await import(modulePath);
    const moduleUrl = import.meta
      .resolve(modulePath)
      .replace('src/components/', 'src/payload/blocks/');
    const outputDir = path.dirname(fileURLToPath(moduleUrl));
    const imageName = path.basename(modulePath).replace('.stories', '');
    const outputPath = path.join(outputDir, imageName);

    const story = storyToUrlPath(mod.default.title);
    const url = `${clientEnv.storybookUrl}/?path=/story/${story}`;
    await tsxToWebp(url, outputPath, viewport);
  }
})();
