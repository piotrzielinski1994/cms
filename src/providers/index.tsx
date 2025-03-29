import { NextIntlClientProvider } from 'next-intl';
import React, { ComponentProps } from 'react';
import FontScaleProvider from './font-scale.provider';
import ThemeProvider from './theme.provider';

type ProvidersProps = {
  children: React.ReactNode;
  initialTheme: ComponentProps<typeof ThemeProvider>['initialTheme'];
  initialFontScale: ComponentProps<typeof FontScaleProvider>['initialFontScale'];
};

export const Providers = ({ children, initialTheme, initialFontScale }: ProvidersProps) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider initialTheme={initialTheme}>
        <FontScaleProvider initialFontScale={initialFontScale}>{children}</FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
