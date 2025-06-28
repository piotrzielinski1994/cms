import { Providers } from '@/providers';
import { ComponentProps, ReactNode } from 'react';

const resolveServerComponent = async <T extends (props: unknown) => Promise<ReactNode>>(
  Component: T,
  props: Parameters<T>[0],
) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

const withProviders = (
  children: ReactNode,
  props: Partial<Omit<ComponentProps<typeof Providers>, 'children'>> = {},
) => {
  const overwrittenProps: ComponentProps<typeof Providers> = {
    locale: 'en',
    initialTheme: 'light',
    initialFontScale: 'base',
    initialCookiesConsent: true,
    ...props,
    children,
  };
  return <Providers {...overwrittenProps} />;
};

export { resolveServerComponent, withProviders };
