import path from 'path';
import puppeteer, { ImageFormat } from 'puppeteer';
import { fileURLToPath } from 'url';
import { storyToUrlPath, THUMBNAIL_ID } from './config/storybook/utils';

const tsxToJpg = async <T extends ImageFormat>(url: string, outputPath: `${string}.${T}`) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const iframe = await page.waitForSelector('iframe#storybook-preview-iframe', { timeout: 30000 });
  if (!iframe) throw new Error('Iframe not found');

  const iframeContent = await iframe.contentFrame();
  if (!iframeContent) throw new Error('Iframe content not available');

  const element = await iframeContent.waitForSelector(`#${THUMBNAIL_ID}`, { timeout: 30000 });
  if (!element) throw new Error(`Element #${THUMBNAIL_ID} not found`);

  await element.screenshot({
    path: outputPath,
    type: outputPath.split('.').pop() as T,
    quality: 90,
  });

  await browser.close();
};

const storyModules = [
  '@/components/basic/accordion/accordion.stories',
  '@/components/sections/image-block/image-block-1/image-block-1.stories',
];

(async () => {
  for (const modulePath of storyModules) {
    const mod = await import(modulePath);
    const moduleUrl = import.meta.resolve(modulePath);
    const dir = path.dirname(fileURLToPath(moduleUrl));
    const imageName = path.basename(modulePath).replace('.stories', '') + '.webp';
    const outputPath = path.join(dir, imageName);

    const story = storyToUrlPath(mod.default.title);
    await tsxToJpg(`http://localhost:3001/?path=/story/${story}`, outputPath);
  }
})();
