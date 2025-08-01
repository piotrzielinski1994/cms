'use client';

import { getThemeConfig, ThemeConfig, themes } from '@/config/themes.config';
import { useThemeStore } from '@/store/theme';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { keys } from 'ramda';
import { FC } from 'react';

type SunOrMoonProps = { colorPreference: ThemeConfig['colorPreference'] };

const ThemeSwitcher: FC = () => {
  const { theme, colorPreference, themeConfig, setTheme } = useThemeStore();
  const t = useTranslations('frontend');
  const systemThemeConfig = themes[colorPreference];

  return (
    <SelectPrimitive.Root value={theme} onValueChange={setTheme}>
      <SelectPrimitive.Trigger
        className={cn('py-1.5 px-2', 'text-sm text-white')}
        aria-label={t('themeSwitcher')}
      >
        <SelectPrimitive.Value>
          <SunOrMoon colorPreference={themeConfig.colorPreference} />
        </SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {keys(themes).map((it) => {
              const thisThemeConfig = getThemeConfig(it);
              const Icon = thisThemeConfig.colorPreference === 'light' ? Sun : Moon;
              return (
                <SelectPrimitive.Item
                  key={it}
                  value={it}
                  className={cn(
                    'px-2 py-1',
                    'focus:bg-accent focus:text-accent-foreground',
                    'text-sm',
                    'cursor-pointer outline-none ',
                  )}
                  style={{ backgroundColor: thisThemeConfig.background1 }}
                >
                  <SelectPrimitive.ItemText>
                    <Icon className="h-4 w-4" style={{ color: thisThemeConfig.foreground }} />
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              );
            })}
            <SelectPrimitive.Item
              value="system"
              className={cn(
                'px-2 py-1',
                'focus:bg-accent focus:text-accent-foreground',
                'text-sm',
                'cursor-pointer outline-none ',
              )}
              style={{ backgroundColor: systemThemeConfig.background1 }}
            >
              <SelectPrimitive.ItemText>
                <Laptop className="h-4 w-4" style={{ color: systemThemeConfig.foreground }} />
              </SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const SunOrMoon = ({ colorPreference }: SunOrMoonProps) => {
  const Icon = colorPreference === 'light' ? Sun : Moon;
  return <Icon className="h-4 w-4" />;
};

export { ThemeSwitcher };
