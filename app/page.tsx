import Link from 'next/link';
import {
  getStaticFirstScreen,
  shouldUseStaticData,
} from '@/data/staticDataUtils';
import { fetchScreensData } from '@/lib/features/questionnaire/server/fetchScreensData';
import { EExtremeStatus, TScreen } from '@/types/question.type';
import Button from '@/components/Button/Button';

import styles from './styles.module.scss';

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
    <>
      <main className={styles.content}>
        <h1 className={styles.title}>Let&apos;s start questionnaire!</h1>

        <Button asChild className={styles.button}>
          <Link href={screenData?.screenId ?? '/'}>Start test</Link>
        </Button>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footer__description}>
          Developed by @Mikelangelo64
        </p>
      </footer>
    </>
  );
}
