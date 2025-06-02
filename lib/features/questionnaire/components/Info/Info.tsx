'use client';

import { useAppSelector } from '@/store/hooks';
import { TScreenBase, TInfoScreen } from '@/types/question.type';
import Link from 'next/link';
import { selectNextScreenId } from '@/store/slices/questionnaireSlice';
import Button from '@/components/Button/Button';
import cn from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  screenData: TScreenBase & TInfoScreen;
  className?: string;
}

const Info = ({ screenData, className }: IProps) => {
  const nextHref = useAppSelector(selectNextScreenId);

  return (
    <Button
      asChild
      variant="secondary"
      className={cn(styles.button, className)}
    >
      <Link href={screenData.nextInfoScreenId || nextHref || ''}>
        {screenData.buttonLabel ?? 'go next'}
      </Link>
    </Button>
  );
};

export default Info;
