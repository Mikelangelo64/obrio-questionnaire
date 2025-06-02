import { TRootState } from '@/store/store';
import {
  EQuestioannaireVariant,
  IDynamicTextSegment,
  IOption,
  TScreen,
  TScreenId,
} from '@/types/question.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// TODO: remove optionId
type TAnswer = IOption & { questionTitle: TScreen['title'] };

interface IQuestionnaireState {
  variant: EQuestioannaireVariant | null;
  answers: Record<TScreenId, TAnswer>;
  nextScreenId: TScreenId | null;
  completedSteps: string[];
  startTime: number | null;
  isQuestionnaireStarted: boolean;
  isQuestionnaireEnded: boolean;
  textDynamicSegments: Record<
    IDynamicTextSegment['label'],
    IDynamicTextSegment['value']
  >;
}

const initialState: IQuestionnaireState = {
  variant: null,
  answers: {},
  nextScreenId: null,
  completedSteps: [],
  startTime: null,
  isQuestionnaireStarted: false,
  isQuestionnaireEnded: false,
  textDynamicSegments: {},
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{
        screenId: TScreenId;
        answer: TAnswer;
      }>,
    ) => {
      state.answers[action.payload.screenId] = action.payload.answer;

      if (!state.startTime) {
        state.startTime = Date.now();
      }
    },
    setIsQuestionnaireStarted: (state, action: PayloadAction<boolean>) => {
      state.isQuestionnaireStarted = action.payload;
    },
    setIsQuestionnaireEnded: (state, action: PayloadAction<boolean>) => {
      state.isQuestionnaireEnded = action.payload;
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
    setQuestionnaireVariant: (
      state,
      action: PayloadAction<EQuestioannaireVariant>,
    ) => {
      state.variant = action.payload;
    },
    resetQuestionnaire: state => {
      state.answers = {};
      state.completedSteps = [];
      state.startTime = null;
      state.nextScreenId = null;
      state.textDynamicSegments = {};
      state.isQuestionnaireStarted = false;
      state.isQuestionnaireEnded = false;
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

export const selectIsQuestionnaireStarted = (state: TRootState) =>
  state.questionnaire.isQuestionnaireStarted;

export const selectIsQuestionnaireEnded = (state: TRootState) =>
  state.questionnaire.isQuestionnaireEnded;

export const selectQuestionnaireVariant = (state: TRootState) =>
  state.questionnaire.variant;

export const {
  setAnswer,
  setNextScreenId,
  setTextDynamicSegment,
  setIsQuestionnaireStarted,
  setIsQuestionnaireEnded,
  resetQuestionnaire,
  setQuestionnaireVariant,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
