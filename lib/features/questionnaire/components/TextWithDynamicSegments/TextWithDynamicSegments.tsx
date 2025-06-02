'use client';

import { useAppSelector } from '@/store/hooks';
import { selectTextDynamicSegments } from '@/store/slices/questionnaireSlice';
import { replaceTextDynamicSegment } from '../../utils/replaceTextDynamicSegment';
import cn from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  text: string;
  className?: string;
}

const TextWithDynamicSegments = ({ text, className }: IProps) => {
  const textDynamicSegments = useAppSelector(selectTextDynamicSegments);

  const textToRender = replaceTextDynamicSegment(text, textDynamicSegments);

  return <p className={cn(styles.text, className)}>{textToRender}</p>;
};

export default TextWithDynamicSegments;
