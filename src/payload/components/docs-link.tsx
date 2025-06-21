'use client';

import { clientEnv } from '@/config/env.client.config';
import { usePayloadTranslations } from '../locale/translations.hook';

const DocsLink = () => {
  const t = usePayloadTranslations();
  return (
    <a
      href={clientEnv.storybookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      {t('groups:docs')}
    </a>
  );
};

export { DocsLink };
