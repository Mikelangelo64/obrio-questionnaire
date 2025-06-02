import Info from '@/lib/features/questionnaire/components/Info';
import QuestionList from '@/lib/features/questionnaire/components/QuestionList/QuestionList';
import TextWithDynamicSegments from '@/lib/features/questionnaire/components/TextWithDynamicSegments/TextWithDynamicSegments';
import { getStaticScreen, shouldUseStaticData } from '@/data/staticDataUtils';
import {
  EExtremeStatus,
  EScreenType,
  TScreen,
  TScreenId,
} from '@/types/question.type';
import { fetchScreensData } from '@/lib/features/questionnaire/server/fetchScreensData';
import GoBackButton from '@/lib/features/questionnaire/components/GoBackButton/GoBackButton';
import Image from 'next/image';
import cn from 'clsx';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';
import styles from './styles.module.scss';

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

export default async function Screen({
  params,
}: {
  params: Promise<{ screenId: TScreenId }>;
}) {
  const { screenId } = await params;
  const { screenData } = await getScreenData(screenId);

  if (!screenData) {
    return <div>Not found</div>;
  }

  const isInfoScreen = screenData.screenType === EScreenType.INFO;

  return (
    <LayoutContainer
      withHeader
      className={cn(isInfoScreen && styles.info, styles.container)}
    >
      <header className={styles.header}>
        {screenData.extremeStatus !== EExtremeStatus.START && (
          <GoBackButton className={styles.header__back} />
        )}

        <Image
          className={styles.header__image}
          src={
            isInfoScreen
              ? '/image/header-logo-white.png'
              : '/image/header-logo.png'
          }
          width={15}
          height={16}
          alt="Logo"
        />
      </header>

      <div className={styles.wrapper}>
        <TextWithDynamicSegments
          className={styles.title}
          text={screenData.title}
        />

        {screenData.description && (
          <TextWithDynamicSegments
            className={styles.description}
            text={screenData.description}
          />
        )}

        {screenData.screenType === EScreenType.QUESTION && (
          <QuestionList screenData={screenData} screenId={screenId} />
        )}

        {isInfoScreen && <Info screenData={screenData} />}
      </div>
    </LayoutContainer>
  );
}
