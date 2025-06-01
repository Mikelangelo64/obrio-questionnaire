import { TRootState } from '@/lib/store';
import { IOption, TScreenId } from '@/types/question.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IQuestionnaireState {
  answers: Record<TScreenId, IOption>;
  nextScreenId: TScreenId | null;
  currentStep: string;
  completedSteps: string[];
  startTime: number | null;
}

const initialState: IQuestionnaireState = {
  answers: {},
  nextScreenId: null,
  currentStep: '',
  completedSteps: [],
  startTime: null,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ screenId: TScreenId; answer: IOption }>,
    ) => {
      state.answers[action.payload.screenId] = action.payload.answer;
      if (!state.startTime) {
        state.startTime = Date.now();
      }
    },
    setNextScreenId: (
      state,
      action: PayloadAction<{ screenId: TScreenId | null }>,
    ) => {
      state.nextScreenId = action.payload.screenId;
    },
    resetQuestionnaire: state => {
      state.answers = {};
      state.completedSteps = [];
      state.currentStep = '';
      state.startTime = null;
      state.nextScreenId = null;
    },
  },
});

export const selectAnswers = (state: TRootState) => state.questionnaire.answers;
export const selectAnswerFromScreen =
  (screenId: TScreenId) => (state: TRootState) =>
    state.questionnaire.answers[screenId];
export const selectNextScreenId = (state: TRootState) =>
  state.questionnaire.nextScreenId;

export const { setAnswer, setNextScreenId, resetQuestionnaire } =
  questionnaireSlice.actions;
export default questionnaireSlice.reducer;
