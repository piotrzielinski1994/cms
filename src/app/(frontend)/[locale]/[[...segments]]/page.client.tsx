'use client';

import { useHeaderTheme } from '@/_old/providers/HeaderTheme';
import { SupportedLanguages } from '@payloadcms/translations';
import React, { useEffect } from 'react';

const PageClient: React.FC<{
  currentPaths: Partial<Record<keyof SupportedLanguages, string>>;
}> = ({ currentPaths }) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  useEffect(() => {
    sessionStorage.setItem('__page', JSON.stringify(currentPaths));
  }, [currentPaths]);

  return <React.Fragment />;
};

export default PageClient;
