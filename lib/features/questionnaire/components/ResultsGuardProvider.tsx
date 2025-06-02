'use client';

import { useAppSelector } from '@/store/hooks';
import { selectIsQuestionnaireEnded } from '@/store/slices/questionnaireSlice';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

function ResultsGuardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isQuestionnaireEnded = useAppSelector(selectIsQuestionnaireEnded);

  useEffect(() => {
    if (!isQuestionnaireEnded) {
      router.replace('/');
    }
  }, [isQuestionnaireEnded, router]);

  return <>{children}</>;
}

export default ResultsGuardProvider;
