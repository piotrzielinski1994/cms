import { Theme } from '@/config/themes.config';
import { NextIntlClientProvider } from 'next-intl';
import React, { ComponentProps } from 'react';
import { FontScaleProvider } from './font-scale.provider';
import { ThemeProvider } from './theme.provider';

type ProvidersProps = {
  children: React.ReactNode;
  initialTheme: Theme;
  initialFontScale: ComponentProps<typeof FontScaleProvider>['initialFontScale'];
};

const Providers = ({ children, initialTheme, initialFontScale }: ProvidersProps) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider initialTheme={initialTheme}>
        <FontScaleProvider initialFontScale={initialFontScale}>{children}</FontScaleProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export { Providers };
