import puppeteer, { ImageFormat } from 'puppeteer';
import { THUMBNAIL_ID } from './config/storybook/utils';

const tsxToJpg = async <T extends ImageFormat>(url: string, outputPath: `${string}.${T}`) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const iframe = await page.waitForSelector('iframe#storybook-preview-iframe', { timeout: 30000 });
  if (!iframe) throw new Error('Iframe not found');

  const iframeContent = await iframe.contentFrame();
  if (!iframeContent) throw new Error('Iframe content not available');

  const element = await iframeContent.waitForSelector(`#${THUMBNAIL_ID}`, { timeout: 30000 });
  if (!element) throw new Error('Element #qwerty not found');

  await element.screenshot({
    path: outputPath,
    type: outputPath.split('.').pop() as T,
    quality: 90,
  });
  await browser.close();
};

tsxToJpg('http://localhost:3001', 'output.webp');
// tsxToJpg(
//   'http://localhost:3001/?path=/story/components-sections-imageblock-imageblock1--image-block-1',
//   'output.jpg',
// );
