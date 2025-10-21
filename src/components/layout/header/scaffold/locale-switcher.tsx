'use client';

import { useRouter } from '@/config/next.routing.config';
import { contentLocales } from '@/config/store/locales.config';
import { useLocaleStore } from '@/store/locale';
import { cn } from '@/utils/tailwind';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Locale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

const LocaleSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const locale = useLocaleStore();
  const t = useTranslations('frontend');
  const [, startTransition] = useTransition();

  function onSelectChange(value: Locale) {
    const nextPathname = JSON.parse(sessionStorage.getItem('__page') ?? '{}')[value];
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname: nextPathname || `/`, params },
        { locale: value },
      );
    });
  }

  return (
    <SelectPrimitive.Root onValueChange={onSelectChange} value={locale}>
      <SelectPrimitive.Trigger
        aria-label={t('localeSwitcher')}
        className={cn('px-2 py-1 -mr-2', 'text-sm text-white')}
      >
        <SelectPrimitive.Value>{locale.toUpperCase()}</SelectPrimitive.Value>
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
                    'p-2',
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

export { LocaleSwitcher };
