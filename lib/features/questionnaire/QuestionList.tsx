'use client';

import { useAppDispatch } from '@/lib/hooks';
import {
  IOption,
  TNextScreenOptionCondition,
  TQuestion,
  TScreenBase,
  TScreenId,
} from '@/types/question.type';
import Link from 'next/link';
import { setAnswer, setNextScreenId } from './questionnaireSlice';

interface IProps {
  screenData: TScreenBase & TQuestion;
  screenId: string;
}

const QuestionList = ({ screenData }: IProps) => {
  const dispatch = useAppDispatch();

  const findNextScreenIdFromConditions = (
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
        answer: option,
      }),
    );
    dispatch(
      setNextScreenId({
        screenId: nextScreenId,
      }),
    );
  };

  return (
    <div>
      {screenData.options.map(option => {
        const nextScreenIdFromConditions = findNextScreenIdFromConditions(
          screenData.nextScreenConditions,
          option,
        );

        return (
          <Link
            key={option.optionId}
            href={
              screenData.nextScreenInfoId || nextScreenIdFromConditions || ''
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
