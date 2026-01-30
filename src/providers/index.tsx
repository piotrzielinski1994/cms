import { CookiesConsentProvider } from '@/store/cookies-consent';
import { FontScaleProvider } from '@/store/font-scale';
import { LocaleProvider } from '@/store/locale';
import { ThemeProvider } from '@/store/theme';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type ProvidersProps = PropsWithChildren &
  ComponentProps<typeof LocaleProvider> &
  ComponentProps<typeof ThemeProvider> &
  ComponentProps<typeof FontScaleProvider> &
  ComponentProps<typeof CookiesConsentProvider>;

const Providers = (props: ProvidersProps) => {
  return typedPipe(
    (children) => <LocaleProvider locale={props.locale} children={children} />,
    (children) => <FontScaleProvider scale={props.scale} children={children} />,
    (children) => <CookiesConsentProvider isAllowed={props.isAllowed} children={children} />,
    (children) => {
      const themeProps = { theme: props.theme, colorPreference: props.colorPreference, children };
      return <ThemeProvider {...themeProps} />;
    },
  )(props.children);
};

const typedPipe = (...fns: ((children: ReactNode) => ReactNode)[]) => {
  return (children: ReactNode) => fns.reduce((acc, fn) => fn(acc), children);
};

export { Providers };
