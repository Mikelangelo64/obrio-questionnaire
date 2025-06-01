import { TRootState } from '@/store/store';
import { IDynamicTextSegment, IOption, TScreenId } from '@/types/question.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IQuestionnaireState {
  answers: Record<TScreenId, IOption>;
  nextScreenId: TScreenId | null;
  currentStep: string;
  completedSteps: string[];
  startTime: number | null;
  textDynamicSegments: Record<
    IDynamicTextSegment['label'],
    IDynamicTextSegment['value']
  >;
}

const initialState: IQuestionnaireState = {
  answers: {},
  nextScreenId: null,
  currentStep: '',
  completedSteps: [],
  startTime: null,
  textDynamicSegments: {},
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
    setTextDynamicSegment: (
      state,
      action: PayloadAction<IDynamicTextSegment>,
    ) => {
      state.textDynamicSegments[action.payload.label] = action.payload.value;
    },
    resetQuestionnaire: state => {
      state.answers = {};
      state.completedSteps = [];
      state.currentStep = '';
      state.startTime = null;
      state.nextScreenId = null;
      state.textDynamicSegments = {};
    },
  },
});

export const selectAnswers = (state: TRootState) => state.questionnaire.answers;

export const selectAnswerFromScreen =
  (screenId: TScreenId) => (state: TRootState) =>
    state.questionnaire.answers[screenId];

export const selectNextScreenId = (state: TRootState) =>
  state.questionnaire.nextScreenId;

export const selectTextDynamicSegments = (state: TRootState) =>
  state.questionnaire.textDynamicSegments;

export const {
  setAnswer,
  setNextScreenId,
  setTextDynamicSegment,
  resetQuestionnaire,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
