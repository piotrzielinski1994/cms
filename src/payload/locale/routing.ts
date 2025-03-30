import { contentLocales, defaultContentLocale } from '@/config/locales.config';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
  locales: contentLocales,
  defaultLocale: defaultContentLocale,
  localePrefix: 'as-needed',
});

const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export { Link, redirect, routing, usePathname, useRouter };
