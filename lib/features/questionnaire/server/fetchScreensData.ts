import { getStaticScreens, shouldUseStaticData } from '@/data/staticDataUtils';
import { TScreen } from '@/types/question.type';

export async function fetchScreensData(): Promise<TScreen[]> {
  // Use static data for local build
  if (shouldUseStaticData()) {
    console.log('Using static data for local build');
    return getStaticScreens();
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TScreen[];
  } catch (error) {
    console.warn('API fetch failed', error);
    return [];
  }
}
