import { type NestedKeysStripped } from '@payloadcms/translations';
import { enTranslations } from '@payloadcms/translations/languages/en';
import { useTranslation } from '@payloadcms/ui';
import { en } from './en';

type CustomTranslationsKeys = NestedKeysStripped<typeof en & typeof enTranslations>;

const usePayloadTranslations = () => {
  return useTranslation<typeof en, CustomTranslationsKeys>().t;
};

export { usePayloadTranslations };
