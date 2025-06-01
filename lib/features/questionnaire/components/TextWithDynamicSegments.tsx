'use client';

import { useAppSelector } from '@/store/hooks';
import { selectTextDynamicSegments } from '@/store/slices/questionnaireSlice';
import { replaceTextDynamicSegment } from '../utils/replaceTextDynamicSegment';

interface IProps {
  text: string;
}

const TextWithDynamicSegments = ({ text }: IProps) => {
  const textDynamicSegments = useAppSelector(selectTextDynamicSegments);

  const textToRender = replaceTextDynamicSegment(text, textDynamicSegments);

  return <p>{textToRender}</p>;
};

export default TextWithDynamicSegments;
