'use client';

import { useEffect } from 'react';

const ViewportHeightCalculation = () => {
  useEffect(() => {
    if (!window) {
      return;
    }

    const handleResize = () => {
      window.document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight / 100}px`,
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default ViewportHeightCalculation;
