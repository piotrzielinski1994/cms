'use client';

import type { SupportedLanguages } from '@payloadcms/translations';
import type React from 'react';
import { useEffect } from 'react';

const PageClient: React.FC<{
  currentPaths: Partial<Record<keyof SupportedLanguages, string>>;
}> = ({ currentPaths }) => {
  useEffect(() => {
    sessionStorage.setItem('__page', JSON.stringify(currentPaths));
  }, [currentPaths]);

  return <></>;
};

export { PageClient };
