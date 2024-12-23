import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { contentLocale } from './index';

export const routing = defineRouting({
  locales: contentLocale.list,
  defaultLocale: contentLocale.default,
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
