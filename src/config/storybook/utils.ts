import { ReactNode } from 'react';

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

const getFallback = <T extends ReactNode>(value: T, translation: string): T => {
  return value === DEFAULT_VALUE ? (translation as T) : value;
};

export { DEFAULT_VALUE, getFallback, storyToUrlPath, THUMBNAIL_ID };
