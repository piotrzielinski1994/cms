'use client';

import { SupportedLanguages } from '@payloadcms/translations';
import React, { useEffect } from 'react';

const PageClient: React.FC<{
  currentPaths: Partial<Record<keyof SupportedLanguages, string>>;
}> = ({ currentPaths }) => {
  useEffect(() => {
    sessionStorage.setItem('__page', JSON.stringify(currentPaths));
  }, [currentPaths]);

  return <React.Fragment />;
};

export default PageClient;
