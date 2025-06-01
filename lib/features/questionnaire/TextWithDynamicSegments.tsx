'use client';

import { useAppSelector } from '@/lib/hooks';
import { IDynamicTextSegment } from '@/types/question.type';
import { selectTextDynamicSegments } from './questionnaireSlice';

interface IProps {
  text: string;
}

const dynamicSegmentRegex = /{(.*?)}/g;

const insertValues = (
  text: string,
  values: Record<IDynamicTextSegment['label'], IDynamicTextSegment['value']>,
) => {
  return text.replace(
    dynamicSegmentRegex,
    (_, key: IDynamicTextSegment['label']) => {
      const keyInLowerCase = key.toLowerCase();

      return keyInLowerCase in values ? values[keyInLowerCase] : `{${key}}`;
    },
  );
};

const TextWithDynamicSegments = ({ text }: IProps) => {
  const textDynamicSegments = useAppSelector(selectTextDynamicSegments);

  const textToRender = insertValues(text, textDynamicSegments);

  return <p>{textToRender}</p>;
};

export default TextWithDynamicSegments;
