'use client';

import { useAppSelector } from '@/store/hooks';
import { selectIsQuestionnaireStarted } from '@/store/slices/questionnaireSlice';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

function QuestionGuardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isQuestionnaireStarted = useAppSelector(selectIsQuestionnaireStarted);

  useEffect(() => {
    if (!isQuestionnaireStarted) {
      router.replace('/');
    }
  }, [isQuestionnaireStarted, router]);

  return <>{children}</>;
}

export default QuestionGuardProvider;
