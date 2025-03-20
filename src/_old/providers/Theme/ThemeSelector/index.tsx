'use client';

import { cn } from '@/_old/utilities/ui';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Contrast } from 'lucide-react';
import { FC, useEffect, useState, useSyncExternalStore } from 'react';
import { useTheme } from '..';
import './theme-selector.scss';
import type { Theme } from './types';
import { themeLocalStorageKey } from './types';

export const ThemeSelector: FC = () => {
  const { setTheme } = useTheme();
  const [value, setValue] = useState('');
  const implicitColorScheme = useColorScheme();

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null);
      setValue('auto');
    } else {
      setTheme(themeToSet);
      setValue(themeToSet);
    }
  };

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey);
    setValue(preference ?? 'auto');
  }, []);

  return (
    <SelectPrimitive.Root onValueChange={onThemeChange} value={value}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value placeholder="Theme" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-card text-popover-foreground', 'relative overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {['auto', 'dark', 'light'].map((it) => (
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
                <SelectPrimitive.ItemText>
                  <Contrast
                    className={`theme-selector theme-selector--${it === 'auto' ? implicitColorScheme : it}`}
                  />
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export const useColorScheme = (): Theme => {
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
