'use client';

import { fontScales } from '@/config/font-scales.config';
import { customTranslations } from '@/config/locales.config';
import FontScalerSvg from '@/icons/font-scaler.svg';
import { useFontScaleStore } from '@/store/font-scale';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useLocale } from 'next-intl';
import { keys } from 'ramda';
import { FC } from 'react';

export const FontScaler: FC = () => {
  const { scale, setScale } = useFontScaleStore();
  const locale = useLocale();
  const label = customTranslations[locale].frontend.fontScaleSwitcher;

  return (
    <SelectPrimitive.Root onValueChange={setScale} value={scale}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value aria-label={label}>
          <FontScalerSvg />
        </SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {keys(fontScales).map((it) => (
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
                  <FontScalerSvg className={`text-${it}`} />
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

export default FontScaler;
