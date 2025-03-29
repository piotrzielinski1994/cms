'use client';

import { cn } from '@/_old/utilities/ui';
import { clientEnv } from '@/env';
import FontScalerSvg from '@/icons/font-scaler.svg';
import * as SelectPrimitive from '@radix-ui/react-select';
import { FC, useEffect, useState } from 'react';

export const FontScaler: FC = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-scale', value);
  }, [value]);

  return (
    <SelectPrimitive.Root onValueChange={setValue} value={value}>
      <SelectPrimitive.Trigger className={cn('p-2', 'text-sm')}>
        <SelectPrimitive.Value placeholder={<FontScalerSvg />} aria-label={'@@@ Font scaler'} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {clientEnv.feature.fontScales.map((it) => (
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
