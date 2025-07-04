import QuestionData from './questionnaire.json';
import { EExtremeStatus, TScreen } from '@/types/question.type';

export const STATIC_SCREENS = QuestionData as TScreen[];

export function getStaticScreens(): TScreen[] {
  return STATIC_SCREENS;
}

export function getStaticScreen(screenId: string): TScreen | null {
  return STATIC_SCREENS.find(screen => screen.screenId === screenId) || null;
}

export function getStaticFirstScreen(): TScreen | null {
  return (
    STATIC_SCREENS.find(
      screen => screen.extremeStatus === EExtremeStatus.START,
    ) || null
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
