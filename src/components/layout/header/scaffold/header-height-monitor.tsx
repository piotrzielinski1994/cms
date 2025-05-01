'use client';

import { useEffect } from 'react';
import { useHeaderHeight } from '../header.hooks';

const HeaderHeightMonitor = () => {
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
  }, [headerHeight]);

  return <></>;
};

export { HeaderHeightMonitor };
