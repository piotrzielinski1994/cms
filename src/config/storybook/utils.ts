import { placeholderDarkWebp, placeholderWebp } from '@/placeholders';
import { ReactNode } from 'react';
import { ThemeConfig } from '../themes.config';

const DEFAULT_VALUE = '__default__' as const;
const THUMBNAIL_ID = 'thumbnail';

const storyToUrlPath = (title: string) => {
  const parts = title.split('/');
  const story = parts[parts.length - 1];
  const titlePart = title.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
  const storyPart = story
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d+)/g, '$1-$2')
    .toLowerCase();
  return `${titlePart}--${storyPart}`;
};

const getFallback = <T extends ReactNode>(value: T, fallback: T): T => {
  return value === DEFAULT_VALUE ? (fallback as T) : value;
};

const imagesPerColorPref = {
  light: placeholderWebp as unknown as string,
  dark: placeholderDarkWebp as unknown as string,
} satisfies Partial<Record<ThemeConfig['_type'], string>>;

export { DEFAULT_VALUE, getFallback, imagesPerColorPref, storyToUrlPath, THUMBNAIL_ID };
