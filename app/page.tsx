import Link from 'next/link';
import {
  getStaticFirstScreen,
  shouldUseStaticData,
} from '@/data/staticDataUtils';
import { fetchScreensData } from '@/lib/features/questionnaire/server/fetchScreensData';
import { EExtremeStatus, TScreen } from '@/types/question.type';

async function getFirstScreenData(): Promise<{
  screenData: TScreen | null;
}> {
  // Use static data for builds
  if (shouldUseStaticData()) {
    const screenData = getStaticFirstScreen();
    return { screenData };
  }

  // Try API for development
  try {
    const data = await fetchScreensData();
    const currentScreenData = data.find(
      screen => screen.extremeStatus === EExtremeStatus.START,
    );
    return { screenData: currentScreenData || null };
  } catch (error) {
    console.error('Error fetching screen data:', error);

    return { screenData: null };
  }
}

export default async function Home() {
  const { screenData } = await getFirstScreenData();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <p>Let&apos;s start test!</p>

        <Link href={screenData?.screenId ?? '/'}>Start test</Link>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        footer
      </footer>
    </div>
  );
}
