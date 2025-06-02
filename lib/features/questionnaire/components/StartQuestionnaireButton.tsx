'use client';

import Button, { TButtonProps } from '@/components/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { setIsQuestionnaireStarted } from '@/store/slices/questionnaireSlice';
import { TScreenId } from '@/types/question.type';
import Link from 'next/link';
import { NOT_FOUND_URL } from '../constants';

type TProps = Omit<TButtonProps, 'asChild' | 'children'> & {
  startScreenId: TScreenId | null;
};

const StartQuestionnaireButton = ({
  startScreenId,
  onClick,
  ...props
}: TProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      asChild
      {...props}
      onClick={evt => {
        dispatch(setIsQuestionnaireStarted(true));

        if (onClick) {
          onClick(evt);
        }
      }}
    >
      <Link href={startScreenId ?? NOT_FOUND_URL}>Start test</Link>
    </Button>
  );
};

export default StartQuestionnaireButton;
