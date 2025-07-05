import { translations } from '@/config/locales.config';
import { Theme, ThemeConfig } from '@/config/themes.config';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { ComponentProps, PropsWithChildren } from 'react';
import { CookiesConsentProvider } from './cookies-consent.provider';
import { FontScaleProvider } from './font-scale.provider';
import { ThemeProvider } from './theme.provider';

type ProvidersProps = PropsWithChildren & {
  locale: Locale;
  theme: Theme;
  colorPreference: ThemeConfig['colorPreference'];
  fontScale: ComponentProps<typeof FontScaleProvider>['fontScale'];
  cookiesConsent: ComponentProps<typeof CookiesConsentProvider>['cookiesConsent'];
};

const Providers = ({
  children,
  locale,
  theme,
  colorPreference,
  fontScale,
  cookiesConsent,
}: ProvidersProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={translations[locale]}>
      <ThemeProvider theme={theme} colorPreference={colorPreference}>
        <FontScaleProvider fontScale={fontScale}>
          <CookiesConsentProvider cookiesConsent={cookiesConsent}>
            {children}
          </CookiesConsentProvider>
        </FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { Providers };
