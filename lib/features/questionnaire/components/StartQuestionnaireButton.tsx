'use client';

import Button, { TButtonProps } from '@/components/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import {
  setIsQuestionnaireStarted,
  setQuestionnaireVariant,
} from '@/store/slices/questionnaireSlice';
import { EQuestioannaireVariant, TScreenId } from '@/types/question.type';
import Link from 'next/link';
import { NOT_FOUND_URL } from '../constants';

type TProps = Omit<TButtonProps, 'asChild' | 'children'> & {
  startScreenId: TScreenId | null;
  questionnaireVariant?: EQuestioannaireVariant;
  text?: string;
};

const StartQuestionnaireButton = ({
  startScreenId,
  onClick,
  text,
  questionnaireVariant = EQuestioannaireVariant.MAIN,
  ...props
}: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      asChild
      {...props}
      onClick={evt => {
        dispatch(setIsQuestionnaireStarted(true));
        dispatch(setQuestionnaireVariant(questionnaireVariant));

        if (onClick) {
          onClick(evt);
        }
      }}
    >
      <Link
        href={
          !!startScreenId
            ? '/' +
              startScreenId +
              (questionnaireVariant ? `?variant=${questionnaireVariant}` : '')
            : NOT_FOUND_URL
        }
      >
        {text ?? 'Start test'}
      </Link>
    </Button>
  );
};

export default StartQuestionnaireButton;
