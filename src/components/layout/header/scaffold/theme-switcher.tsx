'use client';

import { themes } from '@/config/themes.config';
import ContrastIcon from '@/icons/contrast.svg';
import { useThemeStore } from '@/store/theme';
import { useTranslationsStore } from '@/store/translations';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { keys } from 'ramda';
import { FC } from 'react';
import './theme-switcher.scss';

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useThemeStore();
  const t = useTranslationsStore();

  return (
    <SelectPrimitive.Root onValueChange={setTheme} value={theme}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')} aria-label={t.themeSwitcher}>
        <SelectPrimitive.Value>
          <ContrastIcon />
        </SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {keys(themes).map((it) => (
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
                  <ContrastIcon
                    className="theme-selector"
                    style={{ '--_bg': themes[it].background, '--_text': themes[it].foreground }}
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

export default ThemeSwitcher;
