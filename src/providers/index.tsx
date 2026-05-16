import { EcommerceProvider } from '@/providers/ecommerce';
import { CookiesConsentProvider } from '@/store/cookies-consent';
import { EcommerceLinksProvider } from '@/store/ecommerce-links';
import { FontScaleProvider } from '@/store/font-scale';
import { LocaleProvider } from '@/store/locale';
import { ThemeProvider } from '@/store/theme';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type ProvidersProps = PropsWithChildren &
  ComponentProps<typeof LocaleProvider> &
  ComponentProps<typeof ThemeProvider> &
  ComponentProps<typeof FontScaleProvider> &
  ComponentProps<typeof CookiesConsentProvider> &
  ComponentProps<typeof EcommerceLinksProvider>;

const Providers = (props: ProvidersProps) => {
  return typedPipe(
    (children) => <LocaleProvider locale={props.locale}>{children}</LocaleProvider>,
    (children) => <FontScaleProvider scale={props.scale}>{children}</FontScaleProvider>,
    (children) => (
      <CookiesConsentProvider isAllowed={props.isAllowed}>{children}</CookiesConsentProvider>
    ),
    (children) => (
      <ThemeProvider theme={props.theme} colorPreference={props.colorPreference}>
        {children}
      </ThemeProvider>
    ),
    (children) => (
      <EcommerceLinksProvider links={props.links}>{children}</EcommerceLinksProvider>
    ),
    (children) => <EcommerceProvider>{children}</EcommerceProvider>,
  )(props.children);
};

const typedPipe = (...fns: ((children: ReactNode) => ReactNode)[]) => {
  return (children: ReactNode) => fns.reduce((acc, fn) => fn(acc), children);
};

export { Providers };
