import { useEffect, useState } from 'react';

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const header = document.querySelector('[data-header]') as HTMLElement;
      if (!header) return;
      setHeaderHeight(header.offsetHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return headerHeight;
};

export { useHeaderHeight };
