'use client';

import { fontScales } from '@/config/font-scales.config';
import FontScalerSvg from '@/icons/font-scaler.svg';
import { useFontScaleStore } from '@/store/font-scale';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import { keys } from 'ramda';
import { FC } from 'react';

const FontScaler: FC = () => {
  const { scale, setScale } = useFontScaleStore();
  const t = useTranslations('frontend');

  return (
    <SelectPrimitive.Root onValueChange={setScale} value={scale}>
      <SelectPrimitive.Trigger
        className={cn('p-2', 'text-sm text-white')}
        aria-label={t('fontScaleSwitcher')}
      >
        <SelectPrimitive.Value>
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

export { FontScaler };
