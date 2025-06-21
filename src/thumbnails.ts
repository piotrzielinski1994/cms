import accordionStory from '@/components/basic/accordion/accordion.stories';
import imageBlock1Story from '@/components/sections/image-block/image-block-1/image-block-1.stories';
import puppeteer, { ImageFormat } from 'puppeteer';
import { storyToUrlPath, THUMBNAIL_ID } from './config/storybook/utils';

const tsxToJpg = async <T extends ImageFormat>(url: string, outputPath: `${string}.${T}`) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  const iframe = await page.waitForSelector('iframe#storybook-preview-iframe', { timeout: 30_000 });
  if (!iframe) throw new Error('Iframe not found');

  const iframeContent = await iframe.contentFrame();
  if (!iframeContent) throw new Error('Iframe content not available');

  const element = await iframeContent.waitForSelector(`#${THUMBNAIL_ID}`, { timeout: 30_000 });
  if (!element) throw new Error(`Element #${THUMBNAIL_ID} not found`);

  await element.screenshot({
    path: outputPath,
    type: outputPath.split('.').pop() as T,
    quality: 90,
  });
  await browser.close();
};

const components = [
  {
    story: storyToUrlPath(accordionStory.title),
    output: 'accordion.webp',
  },
  {
    story: storyToUrlPath(imageBlock1Story.title),
    output: 'image-block-1.webp',
  },
] satisfies Array<{
  story: string;
  output: Parameters<typeof tsxToJpg>[1];
}>;

components.forEach(({ story, output }) => {
  tsxToJpg(`http://localhost:3001/?path=/story/${story}`, `./public/images/${output}`);
});
