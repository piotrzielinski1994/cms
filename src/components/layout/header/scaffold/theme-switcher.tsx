'use client';

import { cn } from '@/_old/utilities/ui';
import { clientEnv } from '@/env.client';
import ContrastIcon from '@/icons/contrast.svg';
import useThemeStore from '@/store/theme';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC } from 'react';
import './theme-switcher.scss';

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <SelectPrimitive.Root onValueChange={setTheme} value={theme}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value placeholder={<ContrastIcon />} aria-label="@@@ Theme switcher" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {clientEnv.feature.themes.map((it) => (
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
                  <ContrastIcon className={`theme-selector theme-selector--${it}`} />
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

export default ThemeSwitcher;
