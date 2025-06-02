import MainQuestionData from './questionnaire.json';
import WithDateQuestionData from './date-questionnaire.json';
import {
  EExtremeStatus,
  EQuestioannaireVariant,
  TScreen,
} from '@/types/question.type';

export const STATIC_SCREENS = MainQuestionData as TScreen[];
export const STATIC_WITH_DATE_SCREENS = WithDateQuestionData as TScreen[];

export function getStaticScreens(
  questionnaireVariant?: EQuestioannaireVariant,
): TScreen[] {
  if (questionnaireVariant === EQuestioannaireVariant.WITH_DATE) {
    return STATIC_WITH_DATE_SCREENS;
  }

  return STATIC_SCREENS;
}

export function getStaticScreen(
  screenId: string,
  questionnaireVariant?: EQuestioannaireVariant,
): TScreen | null {
  let screens = STATIC_SCREENS;

  if (questionnaireVariant === EQuestioannaireVariant.WITH_DATE) {
    screens = STATIC_WITH_DATE_SCREENS;
  }

  return screens.find(screen => screen.screenId === screenId) || null;
}

export function getStaticFirstScreen(
  questionnaireVariant?: EQuestioannaireVariant,
): TScreen | null {
  let screens = STATIC_SCREENS;

  if (questionnaireVariant === EQuestioannaireVariant.WITH_DATE) {
    screens = STATIC_WITH_DATE_SCREENS;
  }

  return (
    screens.find(screen => screen.extremeStatus === EExtremeStatus.START) ||
    null
  );
}

export function shouldUseStaticData(): boolean {
  // Use static data during local build time
  return (
    process.env.NODE_ENV === 'production' &&
    (!process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_URL.includes('localhost'))
  );
}
