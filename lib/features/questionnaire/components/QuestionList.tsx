'use client';

import { useAppDispatch } from '@/store/hooks';
import {
  EExtremeStatus,
  IOption,
  TNextScreenOptionCondition,
  TQuestion,
  TScreenBase,
  TScreenId,
} from '@/types/question.type';
import Link from 'next/link';
import {
  setAnswer,
  setNextScreenId,
  setTextDynamicSegment,
} from '@/store/slices/questionnaireSlice';
import { PAGE_RESULT_URL } from '../constants';

interface IProps {
  screenData: TScreenBase & TQuestion;
  screenId: string;
}

const QuestionList = ({ screenData }: IProps) => {
  const dispatch = useAppDispatch();

  const isTheLastScreen = screenData.extremeStatus === EExtremeStatus.END;

  const getNextScreenIdFromConditions = (
    conditions: TNextScreenOptionCondition,
    option: IOption,
  ) => {
    if (!Array.isArray(conditions)) {
      return conditions;
    }

    const nextScreenData = conditions.find(
      condition => condition.optionId === option.optionId,
    );

    return nextScreenData?.nextScreenId ?? null;
  };

  const onClick = (option: IOption, nextScreenId: TScreenId | null) => {
    dispatch(
      setAnswer({
        screenId: screenData.screenId,
        answer: { ...option, questionTitle: screenData.title },
      }),
    );
    dispatch(
      setNextScreenId({
        screenId: nextScreenId,
      }),
    );

    if (option.dynamicTextSegment) {
      dispatch(
        setTextDynamicSegment({
          label: option.dynamicTextSegment.label.toLowerCase(),
          value: option.dynamicTextSegment.value.toLowerCase(),
        }),
      );
    }
  };

  return (
    <div>
      {screenData.options.map(option => {
        const nextScreenIdFromConditions = getNextScreenIdFromConditions(
          screenData.nextScreenConditions,
          option,
        );

        return (
          <Link
            key={option.optionId}
            href={
              (isTheLastScreen && PAGE_RESULT_URL) ||
              screenData.nextInfoScreenId ||
              nextScreenIdFromConditions ||
              '/'
            }
            onClick={() => onClick(option, nextScreenIdFromConditions)}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
};

export default QuestionList;
