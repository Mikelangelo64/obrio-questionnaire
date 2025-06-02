'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  TScreenBase,
  TInfoScreen,
  EExtremeStatus,
} from '@/types/question.type';
import Link from 'next/link';
import {
  selectNextScreenId,
  setIsQuestionnaireEnded,
} from '@/store/slices/questionnaireSlice';
import Button, { TButtonProps } from '@/components/Button/Button';
import cn from 'clsx';
import styles from './styles.module.scss';

type TProps = Omit<TButtonProps, 'asChild' | 'children' | 'variant'> & {
  screenData: TScreenBase & TInfoScreen;
};

const InfoButton = ({ screenData, className, onClick, ...props }: TProps) => {
  const dispatch = useAppDispatch();

  const nextHref = useAppSelector(selectNextScreenId);
  const isLastScreen = screenData.extremeStatus === EExtremeStatus.END;

  return (
    <Button
      asChild
      variant="secondary"
      className={cn(styles.button, className)}
      {...props}
      onClick={evt => {
        if (onClick) {
          onClick(evt);
        }

        dispatch(setIsQuestionnaireEnded(isLastScreen));
      }}
    >
      <Link href={screenData.nextInfoScreenId || nextHref || ''}>
        {screenData.buttonLabel ?? 'go next'}
      </Link>
    </Button>
  );
};

export default InfoButton;
