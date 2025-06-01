'use client';

import { useAppSelector } from '@/store/hooks';
import { selectAnswers } from '@/store/slices/questionnaireSlice';

const Answers = () => {
  const answers = useAppSelector(selectAnswers);

  return (
    <ul>
      {Object.entries(answers).map(([screenId, answer]) => (
        <li key={screenId}>
          <p>{answer.questionTitle}</p>

          <p>{answer.value}</p>
        </li>
      ))}
    </ul>
  );
};

export default Answers;
