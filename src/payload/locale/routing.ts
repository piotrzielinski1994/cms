import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { contentLocale } from './index';

type Locale = (typeof routing.locales)[number];

const routing = defineRouting({
  locales: contentLocale.list,
  defaultLocale: contentLocale.default,
  localePrefix: 'as-needed',
});

const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export { Link, redirect, routing, usePathname, useRouter, type Locale };
