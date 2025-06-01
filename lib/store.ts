import { configureStore } from '@reduxjs/toolkit';
import questionnaireReducer from '@/lib/features/questionnaire/questionnaireSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      questionnaire: questionnaireReducer,
    },
  });
};

export type TAppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<TAppStore['getState']>;
export type TAppDispatch = TAppStore['dispatch'];
