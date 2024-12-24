'use client';

import { cn } from '@/_old/utilities/cn';
import { contentLocale } from '@/payload/locale';
import { usePathname, useRouter } from '@/payload/locale/routing';
import { CheckIcon } from '@payloadcms/ui';
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
      <SelectPrimitive.Trigger
        className={cn(
          'flex h-10 w-full items-center justify-between rounded border border-input bg-background px-3 py-2 text-inherit ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          'w-auto text-sm bg-transparent gap-2 pl-0 md:pl-3 border-none',
        )}
      >
        <SelectPrimitive.Value placeholder="Theme" aria-label={locale} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn(
            'relative z-50 max-h-96 overflow-hidden rounded border bg-card text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          )}
        >
          <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1" />
          <SelectPrimitive.Viewport className={cn('p-1', 'h-[var(--radix-select-trigger-height)]')}>
            {contentLocale.list
              .sort((a, b) => a.localeCompare(b))
              .map((it) => (
                <SelectPrimitive.Item
                  key={it}
                  value={it}
                  className="relative flex w-full cursor-default select-none items-center rounded px-3 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <SelectPrimitive.ItemText>{it.toUpperCase()}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1" />
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default LocaleSwitcher;
