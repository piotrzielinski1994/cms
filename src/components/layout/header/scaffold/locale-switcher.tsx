'use client';

import { cn } from '@/_old/utilities/cn';
import { contentLocale } from '@/payload/locale';
import { usePathname, useRouter } from '@/payload/locale/routing';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { TypedLocale } from 'payload';
import { useTransition } from 'react';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      );
    });
  }

  return (
    <SelectPrimitive.Root onValueChange={onSelectChange} value={locale}>
      <SelectPrimitive.Trigger className={cn('px-3 py-2 -mr-3', 'text-sm')}>
        <SelectPrimitive.Value placeholder="Locale" aria-label={locale} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn('bg-card text-popover-foreground', 'relative overflow-hidden')}
        >
          <SelectPrimitive.Viewport>
            {contentLocale.list
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
