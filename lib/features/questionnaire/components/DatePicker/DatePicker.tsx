'use client';

import {
  EDateCondition,
  TNextScreenDateCondition,
  TQuestionBase,
  TQuestionDate,
  TScreenBase,
} from '@/types/question.type';
import cn from 'clsx';
import DateInput from 'react-datepicker';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { setAnswer } from '@/store/slices/questionnaireSlice';
import { useRouter } from 'next/navigation';
import { NOT_FOUND_URL } from '../../constants';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

interface IProps {
  screenData: TScreenBase & TQuestionBase & TQuestionDate;
  screenId: string;
  className?: string;
}

const DatePicker = ({ screenData, className }: IProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);

  const getNextScreenIdFromConditions = (
    conditions: TNextScreenDateCondition | undefined,
    selectedDate: Date | null,
  ) => {
    if (!conditions || !selectedDate) {
      return null;
    }

    if (!Array.isArray(conditions)) {
      return conditions;
    }

    for (const condition of conditions) {
      const conditionDate = new Date(condition.conditionalDateISO);
      conditionDate.setHours(0, 0, 0, 0); // Reset time for date comparison

      let isMatch = false;

      switch (condition.condition) {
        case EDateCondition.EARLIER:
          isMatch = selectedDate < conditionDate;
          break;
        case EDateCondition.EARLIER_OR_TODAY:
          isMatch = selectedDate <= conditionDate;
          break;
        case EDateCondition.LATER:
          isMatch = selectedDate > conditionDate;
          break;
        case EDateCondition.LATER_OR_TODAY:
          isMatch = selectedDate >= conditionDate;
          break;
        case EDateCondition.TODAY:
          isMatch = selectedDate.getTime() === conditionDate.getTime();
          break;
      }

      if (isMatch) {
        return condition.nextScreenId;
      }
    }

    return null;
  };

  const onSubmit = () => {
    if (!date) {
      return;
    }

    dispatch(
      setAnswer({
        screenId: screenData.screenId,
        answer: {
          questionTitle: screenData.title,
          optionId: screenData.title,
          label: date.toLocaleDateString(),
          value: date.toISOString(),
        },
      }),
    );

    const nextScreenId = getNextScreenIdFromConditions(
      screenData.nextScreenConditions,
      date,
    );

    router.push(nextScreenId ? '/' + nextScreenId : NOT_FOUND_URL);
  };

  return (
    <div className={cn(styles.date_picker, className)}>
      <DateInput
        className={styles.input}
        selected={date}
        onSelect={selectedDate => {
          setDate(selectedDate);
        }}
      />

      <Button disabled={!date} onClick={onSubmit} className={styles.button}>
        {screenData.buttonLabel ?? 'Ok'}
      </Button>
    </div>
  );
};

export default DatePicker;
