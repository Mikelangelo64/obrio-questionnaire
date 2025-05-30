import { TRootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAnswersState {
  hasAnswer: boolean;
}

const initialState: IAnswersState = {
  hasAnswer: false,
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<boolean>) => {
      state.hasAnswer = action.payload;
    },
  },
});

export const selectHasAnswer = (state: TRootState) => state.answers.hasAnswer;

export const { setAnswer } = answersSlice.actions;

export default answersSlice.reducer;
