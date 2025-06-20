'use client';

import { themes } from '@/config/themes.config';
import ContrastSvg from '@/icons/contrast.svg';
import { useThemeStore } from '@/store/theme';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import { keys } from 'ramda';
import { FC } from 'react';
import './theme-switcher.scss';

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useThemeStore();
  const t = useTranslations('frontend');

  return (
    <SelectPrimitive.Root onValueChange={setTheme} value={theme}>
      <SelectPrimitive.Trigger
        className={cn('py-1.5 px-2', 'text-sm text-white')}
        aria-label={t('themeSwitcher')}
      >
        <SelectPrimitive.Value>
          <ContrastSvg />
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
                  <ContrastSvg
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

export { ThemeSwitcher };
