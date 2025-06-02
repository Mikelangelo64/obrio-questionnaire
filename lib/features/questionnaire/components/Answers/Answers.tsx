'use client';

import { useAppSelector } from '@/store/hooks';
import { selectAnswers } from '@/store/slices/questionnaireSlice';
import cn from 'clsx';
import styles from './styles.module.scss';
import TextWithDynamicSegments from '../TextWithDynamicSegments/TextWithDynamicSegments';

const Answers = ({ className }: { className?: string }) => {
  const answers = useAppSelector(selectAnswers);

  return (
    <ul className={cn(styles.answers, className)}>
      {Object.entries(answers).map(([screenId, answer]) => (
        <li key={screenId} className={styles.item}>
          <TextWithDynamicSegments
            className={styles.title}
            text={answer.questionTitle}
          />

          <p className={styles.answer}>{answer.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default Answers;
