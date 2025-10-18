import { CookiesConsentProvider } from '@/store/cookies-consent';
import { FontScaleProvider } from '@/store/font-scale';
import { LocaleProvider } from '@/store/locale';
import { ThemeProvider } from '@/store/theme';
import { ComponentProps } from 'react';

type ProvidersProps = ComponentProps<typeof LocaleProvider> &
  ComponentProps<typeof ThemeProvider> &
  ComponentProps<typeof FontScaleProvider> &
  ComponentProps<typeof CookiesConsentProvider>;

const Providers = (props: ProvidersProps) => {
  return (
    <LocaleProvider locale={props.locale}>
      <ThemeProvider theme={props.theme} colorPreference={props.colorPreference}>
        <FontScaleProvider scale={props.scale}>
          <CookiesConsentProvider isAllowed={props.isAllowed}>
            {props.children}
          </CookiesConsentProvider>
        </FontScaleProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};
export { Providers };
