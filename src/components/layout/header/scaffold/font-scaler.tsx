'use client';

import { cn } from '@/_old/utilities/ui';
import { clientEnv } from '@/env.client';
import FontScalerSvg from '@/icons/font-scaler.svg';
import { useFontScaleStore } from '@/store/font-scale';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC } from 'react';

export const FontScaler: FC = () => {
  const { scale, setScale } = useFontScaleStore();

  return (
    <SelectPrimitive.Root onValueChange={setScale} value={scale}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value placeholder={<FontScalerSvg />} aria-label={'@@@ Font scaler'}>
          <FontScalerSvg />
        </SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {Object.keys(clientEnv.feature.fontScales).map((it) => (
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
