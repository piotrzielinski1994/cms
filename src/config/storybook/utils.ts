import { ReactNode } from 'react';

const DEFAULT_VALUE = '__default__' as const;

const getFallback = <T extends ReactNode>(value: T, translation: string): T => {
  return value === DEFAULT_VALUE ? (translation as T) : value;
};

export { DEFAULT_VALUE, getFallback };
