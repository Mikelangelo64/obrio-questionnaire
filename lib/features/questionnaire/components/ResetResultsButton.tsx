'use client';

import Button, { TButtonProps } from '@/components/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { resetQuestionnaire } from '@/store/slices/questionnaireSlice';
import Link from 'next/link';

const ResetResultsButton = ({
  onClick,
  ...props
}: Omit<TButtonProps, 'asChild' | 'children'>) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      asChild
      {...props}
      onClick={evt => {
        dispatch(resetQuestionnaire());

        if (onClick) {
          onClick(evt);
        }
      }}
    >
      <Link href="/">Go to home</Link>
    </Button>
  );
};

export default ResetResultsButton;
