'use client';

import { Theme } from '@/_old/providers/Theme/ThemeSelector/types';
import { cn } from '@/_old/utilities/ui';
import { FontSizeIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC, useEffect, useState, useSyncExternalStore } from 'react';

export const FontScaler: FC = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-scale', value);
  }, [value]);

  return (
    <SelectPrimitive.Root onValueChange={setValue} value={value}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value
          placeholder={<FontSizeIcon height="1.5em" width="1.5em" />}
          aria-label={'@@@ Font scaler'}
        >
          <FontSizeIcon height="1.5em" width="1.5em" />
        </SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {['sm', 'md', 'lg'].map((it) => (
              <SelectPrimitive.Item
                key={it}
                value={it}
                className={cn(
                  'p-2',
                  'focus:bg-accent focus:text-accent-foreground',
                  'text-sm',
                  'cursor-pointer outline-none ',
                )}
              >
                <SelectPrimitive.ItemText>{it.toUpperCase()}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const useColorScheme = (): Theme => {
  const subscribe = (callback: () => void) => {
    const mediaQuery = '(prefers-color-scheme: dark)';
    const mql = window.matchMedia(mediaQuery);

    mql.addEventListener('change', callback);

    return () => mql.removeEventListener('change', callback);
  };

  const getSnapshot = (): Theme => {
    const mediaQuery = '(prefers-color-scheme: dark)';
    const mql = window.matchMedia(mediaQuery);
    return mql.matches ? 'dark' : 'light';
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => 'light');
};

export default FontScaler;
