import Info from '@/lib/features/questionnaire/Info';
import QuestionList from '@/lib/features/questionnaire/QuestionList';
import {
  getStaticScreen,
  getStaticScreens,
  shouldUseStaticData,
} from '@/lib/data/staticDataUtils';
import { EScreenType, TScreen, TScreenId } from '@/types/question.type';

async function fetchScreensData(): Promise<TScreen[]> {
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

export async function generateStaticParams() {
  try {
    const data = await fetchScreensData();

    return data.map(screen => ({
      screenId: screen.screenId,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);

    return [];
  }
}

async function getScreenData(screenId: string): Promise<{
  screenData: TScreen | null;
}> {
  // Use static data for builds
  if (shouldUseStaticData()) {
    const screenData = getStaticScreen(screenId);
    return { screenData };
  }

  // Try API for development
  try {
    const data = await fetchScreensData();
    const currentScreenData = data.find(screen => screen.screenId === screenId);
    return { screenData: currentScreenData || null };
  } catch (error) {
    console.error('Error fetching screen data:', error);

    return { screenData: null };
  }
}

export default async function Answer({
  params,
}: {
  params: Promise<{ screenId: TScreenId }>;
}) {
  const { screenId } = await params;
  const { screenData } = await getScreenData(screenId);

  if (!screenData) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <p>{screenData.title}</p>

      {screenData.screenType === EScreenType.QUESTION && (
        <QuestionList screenData={screenData} screenId={screenId} />
      )}

      {screenData.screenType === EScreenType.INFO && (
        <Info screenData={screenData} />
      )}
    </div>
  );
}
