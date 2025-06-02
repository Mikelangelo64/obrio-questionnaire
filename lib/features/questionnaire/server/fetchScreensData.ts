import { getStaticScreens, shouldUseStaticData } from '@/data/staticDataUtils';
import { EQuestioannaireVariant, TScreen } from '@/types/question.type';

export async function fetchScreensData(
  questionnaireVariant?: EQuestioannaireVariant,
): Promise<TScreen[]> {
  // Use static data for local build
  if (shouldUseStaticData()) {
    return getStaticScreens(questionnaireVariant);
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const queryParam = questionnaireVariant
      ? `?variant=${questionnaireVariant}`
      : '';

    const response = await fetch(`${apiUrl}/api${queryParam}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TScreen[];
  } catch (error) {
    console.warn('API fetch failed', error);
    return [];
  }
}
