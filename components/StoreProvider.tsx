'use client';

import { makeStore, TAppStore } from '@/store/store';
import React, { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<TAppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
