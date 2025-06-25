import { Providers } from '@/providers';
import { ComponentProps, ReactNode } from 'react';

const resolveServerComponent = async <T extends (props: unknown) => Promise<ReactNode>>(
  Component: T,
  props: Parameters<T>[0],
) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

const withProviders = (props: Partial<Omit<ComponentProps<typeof Providers>, 'children'>> = {}) =>
  function WithProviders(children: ReactNode) {
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
