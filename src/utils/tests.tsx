import { en } from '@/payload/locale/en';
import { FontScaleProvider } from '@/providers/font-scale.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const resolveServerComponent = async <T extends (props: unknown) => Promise<ReactNode>>(
  Component: T,
  props: Parameters<T>[0],
) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

const withProviders = (children: ReactNode) => {
  return (
    <NextIntlClientProvider locale="en" messages={en}>
      <ThemeProvider initialTheme="light">
        <FontScaleProvider initialFontScale="base">{children}</FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { resolveServerComponent, withProviders };
