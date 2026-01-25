'use client';

import { useEffect } from 'react';
import { useHeaderHeight } from '../header.hooks';

const HeaderHeightListener = () => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
  }, [headerHeight]);

  return <></>;
};

export { HeaderHeightListener };
