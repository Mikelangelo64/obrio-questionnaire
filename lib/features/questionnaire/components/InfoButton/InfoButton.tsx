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
  selectQuestionnaireVariant,
  setIsQuestionnaireEnded,
} from '@/store/slices/questionnaireSlice';
import Button, { TButtonProps } from '@/components/Button/Button';
import cn from 'clsx';
import styles from './styles.module.scss';
import { NOT_FOUND_URL, PAGE_RESULT_URL } from '../../constants';

type TProps = Omit<TButtonProps, 'asChild' | 'children' | 'variant'> & {
  screenData: TScreenBase & TInfoScreen;
};

const InfoButton = ({ screenData, className, onClick, ...props }: TProps) => {
  const dispatch = useAppDispatch();

  const nextScreenId = useAppSelector(selectNextScreenId);
  const questionnaireVariant = useAppSelector(selectQuestionnaireVariant);

  const isLastScreen = screenData.extremeStatus === EExtremeStatus.END;

  const nextHref = !!nextScreenId
    ? '/' + nextScreenId + `?variant=${questionnaireVariant}`
    : null;
  const nextScreenFromConditionsHref = !!screenData.nextInfoScreenId
    ? '/' + screenData.nextInfoScreenId + `?variant=${questionnaireVariant}`
    : null;

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
      <Link
        href={
          (isLastScreen && PAGE_RESULT_URL) ||
          nextScreenFromConditionsHref ||
          nextHref ||
          NOT_FOUND_URL
        }
      >
        {screenData.buttonLabel ?? 'go next'}
      </Link>
    </Button>
  );
};

export default InfoButton;
