import { configureStore } from '@reduxjs/toolkit';
import answersReducer from '@/lib/features/answers/answersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      answers: answersReducer,
    },
  });
};

export type TAppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<TAppStore['getState']>;
export type TAppDispatch = TAppStore['dispatch'];
