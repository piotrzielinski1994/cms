import { translations } from '@/config/locales.config';
import { Theme } from '@/config/themes.config';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { ComponentProps, ReactNode } from 'react';
import { CookiesConsentProvider } from './cookies-consent.provider';
import { FontScaleProvider } from './font-scale.provider';
import { ThemeProvider } from './theme.provider';

type ProvidersProps = {
  children: ReactNode;
  locale: Locale;
  initialTheme: Theme;
  initialFontScale: ComponentProps<typeof FontScaleProvider>['initialFontScale'];
  initialCookiesConsent: ComponentProps<typeof CookiesConsentProvider>['initialCookiesConsent'];
};

const Providers = ({
  children,
  locale,
  initialTheme,
  initialFontScale,
  initialCookiesConsent,
}: ProvidersProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={translations[locale]}>
      <ThemeProvider initialTheme={initialTheme}>
        <FontScaleProvider initialFontScale={initialFontScale}>
          <CookiesConsentProvider initialCookiesConsent={initialCookiesConsent}>
            {children}
          </CookiesConsentProvider>
        </FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { Providers };
