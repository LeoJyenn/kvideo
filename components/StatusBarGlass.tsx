'use client';

import { useEffect } from 'react';

export function StatusBarGlass() {
  useEffect(() => {
    const isIOS = /iP(ad|hone|od)/.test(window.navigator.userAgent);
    const isStandalone = (window.navigator as { standalone?: boolean }).standalone === true
      || window.matchMedia('(display-mode: standalone)').matches;

    if (isIOS && isStandalone) {
      document.body.classList.add('ios-standalone');
    }

    return () => {
      document.body.classList.remove('ios-standalone');
    };
  }, []);

  return <div className="status-bar-glass" aria-hidden="true" />;
}
