'use client';

import { useAppSelector } from '@/lib/hooks';
import { TScreenBase, TScreenInfo } from '@/types/question.type';
import Link from 'next/link';
import { selectNextScreenId } from './questionnaireSlice';

interface IProps {
  screenData: TScreenBase & TScreenInfo;
}

const Info = ({ screenData }: IProps) => {
  const nextHref = useAppSelector(selectNextScreenId);

  return (
    <Link href={screenData.nextScreenInfoId || nextHref || ''}>
      {screenData.buttonLabel ?? 'go next'}
    </Link>
  );
};

export default Info;
