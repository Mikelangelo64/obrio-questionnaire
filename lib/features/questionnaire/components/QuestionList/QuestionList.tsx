'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  EExtremeStatus,
  IOption,
  TNextScreenOptionCondition,
  TQuestionBase,
  TQuestionOptions,
  TScreenBase,
  TScreenId,
} from '@/types/question.type';
import Link from 'next/link';
import {
  selectQuestionnaireVariant,
  setAnswer,
  setIsQuestionnaireEnded,
  setNextScreenId,
  setTextDynamicSegment,
} from '@/store/slices/questionnaireSlice';
import {
  NOT_FOUND_URL,
  PAGE_RESULT_URL,
} from '@/lib/features/questionnaire/constants';
import cn from 'clsx';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';

interface IProps {
  screenData: TScreenBase & TQuestionBase & TQuestionOptions;
  screenId: string;
  className?: string;
}

const QuestionList = ({ screenData, className }: IProps) => {
  const dispatch = useAppDispatch();

  const questionnaireVariant = useAppSelector(selectQuestionnaireVariant);

  const isLastScreen = screenData.extremeStatus === EExtremeStatus.END;

  const getNextScreenIdFromConditions = (
    conditions: TNextScreenOptionCondition | undefined,
    option: IOption,
  ) => {
    if (!conditions) {
      return null;
    }

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
        answer: {
          label: option.label,
          value: option.value,
          questionTitle: screenData.title,
        },
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

        const nextInfoScreenHref = !!screenData.nextInfoScreenId
          ? '/' +
            screenData.nextInfoScreenId +
            `?variant=${questionnaireVariant}`
          : null;

        const nextScreenFromConditionsHref = !!nextScreenIdFromConditions
          ? '/' +
            nextScreenIdFromConditions +
            `?variant=${questionnaireVariant}`
          : null;

        return (
          <li key={option.optionId}>
            <Button asChild className={styles.button}>
              <Link
                href={
                  (isLastScreen && PAGE_RESULT_URL) ||
                  nextInfoScreenHref ||
                  nextScreenFromConditionsHref ||
                  NOT_FOUND_URL
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
