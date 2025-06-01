'use client';

import { useAppSelector } from '@/store/hooks';
import { TScreenBase, TInfoScreen } from '@/types/question.type';
import Link from 'next/link';
import { selectNextScreenId } from '@/store/slices/questionnaireSlice';

interface IProps {
  screenData: TScreenBase & TInfoScreen;
}

const Info = ({ screenData }: IProps) => {
  const nextHref = useAppSelector(selectNextScreenId);

  return (
    <Link href={screenData.nextInfoScreenId || nextHref || ''}>
      {screenData.buttonLabel ?? 'go next'}
    </Link>
  );
};

export default Info;
