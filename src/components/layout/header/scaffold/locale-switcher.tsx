'use client';

import { contentLocales, customTranslations } from '@/config/locales.config';
import { useRouter } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { TypedLocale } from 'payload';
import { useTransition } from 'react';

const LocaleSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const [, startTransition] = useTransition();
  const label = customTranslations[locale].frontend.fontScaleSwitcher;

  function onSelectChange(value: TypedLocale) {
    const nextPathname = JSON.parse(sessionStorage.getItem('__page') ?? '{}')[value];
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname: nextPathname ?? '/', params },
        { locale: value },
      );
    });
  }

  return (
    <SelectPrimitive.Root onValueChange={onSelectChange} value={locale}>
      <SelectPrimitive.Trigger className={cn('px-3 py-2 -mr-3', 'text-sm')}>
        <SelectPrimitive.Value aria-label={label}>{locale.toUpperCase()}</SelectPrimitive.Value>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-background1 text-foreground', 'relative z-popover overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {contentLocales
              .sort((a, b) => a.localeCompare(b))
              .map((it) => (
                <SelectPrimitive.Item
                  key={it}
                  value={it}
                  className={cn(
                    'px-3 py-2',
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

export default LocaleSwitcher;
