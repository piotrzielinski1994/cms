'use client';
import { useHeaderTheme } from '@/_old/providers/HeaderTheme';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';

import type { Header } from '@/payload/payload.types';

import { Logo } from '@/_old/components/Logo/Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_old/components/ui/select';
import { contentLocale } from '@/payload/locale';
import { usePathname, useRouter } from '@/payload/locale/routing';
import { useLocale } from 'next-intl';
import { TypedLocale } from 'payload';
import { HeaderNav } from './scaffold/navbar';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header
      className="container relative z-20 py-8 flex justify-end gap-2"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <Link href="/" className="mr-auto">
        <Logo />
      </Link>
      <LocaleSwitcher />
      <HeaderNav data={data} />
    </header>
  );
};

function LocaleSwitcher() {
  // inspired by https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
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
    <Select onValueChange={onSelectChange} value={locale}>
      <SelectTrigger className="w-auto text-sm bg-transparent gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {contentLocale.list
          .sort((a, b) => a.localeCompare(b))
          .map((locale) => (
            <SelectItem value={locale} key={locale}>
              {locale}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
