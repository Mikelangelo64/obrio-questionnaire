'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectHasAnswer, setAnswer } from './answersSlice';

const ToggleAnswer = () => {
  const dispatch = useAppDispatch();
  const hasAnswers = useAppSelector(selectHasAnswer);

  const toggleAnswer = () => {
    dispatch(setAnswer(!hasAnswers));
  };

  return (
    <>
      <p>Has answer: {hasAnswers.toString()}</p>
      <button onClick={toggleAnswer}>toggle answer</button>
    </>
  );
};

export default ToggleAnswer;
