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
  setIsQuestionnaireEnded,
  setNextScreenId,
  setTextDynamicSegment,
} from '@/store/slices/questionnaireSlice';
import { PAGE_RESULT_URL } from '@/lib/features/questionnaire/constants';
import cn from 'clsx';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';

interface IProps {
  screenData: TScreenBase & TQuestion;
  screenId: string;
  className?: string;
}

const QuestionList = ({ screenData, className }: IProps) => {
  const dispatch = useAppDispatch();

  const isLastScreen = screenData.extremeStatus === EExtremeStatus.END;

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

  const onClick = (
    option: IOption,
    nextScreenId: TScreenId | null,
    isLastScreen: boolean,
  ) => {
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

    dispatch(setIsQuestionnaireEnded(isLastScreen));
  };

  return (
    <ul className={cn(styles.list, className)}>
      {screenData.options.map(option => {
        const nextScreenIdFromConditions = getNextScreenIdFromConditions(
          screenData.nextScreenConditions,
          option,
        );

        return (
          <li key={option.optionId}>
            <Button asChild className={styles.button}>
              <Link
                href={
                  (isLastScreen && PAGE_RESULT_URL) ||
                  screenData.nextInfoScreenId ||
                  nextScreenIdFromConditions ||
                  '/'
                }
                onClick={() =>
                  onClick(option, nextScreenIdFromConditions, isLastScreen)
                }
              >
                {option.label}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
