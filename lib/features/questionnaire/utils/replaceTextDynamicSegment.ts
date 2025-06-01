import { IDynamicTextSegment } from '@/types/question.type';
import { DYNAMIC_SEGMENT_REGEX } from '../constants';

export const replaceTextDynamicSegment = (
  text: string,
  values: Record<IDynamicTextSegment['label'], IDynamicTextSegment['value']>,
) => {
  return text.replace(
    DYNAMIC_SEGMENT_REGEX,
    (_, key: IDynamicTextSegment['label']) => {
      const keyInLowerCase = key.toLowerCase();

      return keyInLowerCase in values ? values[keyInLowerCase] : `{${key}}`;
    },
  );
};
