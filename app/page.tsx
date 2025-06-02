import {
  getStaticFirstScreen,
  shouldUseStaticData,
} from '@/data/staticDataUtils';
import { fetchScreensData } from '@/lib/features/questionnaire/server/fetchScreensData';
import {
  EExtremeStatus,
  EQuestioannaireVariant,
  TScreen,
} from '@/types/question.type';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';
import StartQuestionnaireButton from '@/lib/features/questionnaire/components/StartQuestionnaireButton';

import styles from './styles.module.scss';

async function getFirstScreenData(
  questionnaireVariant?: EQuestioannaireVariant,
): Promise<{
  screenData: TScreen | null;
}> {
  // Use static data for builds
  if (shouldUseStaticData()) {
    const screenData = getStaticFirstScreen(questionnaireVariant);
    return { screenData };
  }

  // Try API for development
  try {
    const data = await fetchScreensData(questionnaireVariant);
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
  const { screenData: screenWithDateData } = await getFirstScreenData(
    EQuestioannaireVariant.WITH_DATE,
  );

  return (
    <LayoutContainer>
      <main className={styles.content}>
        <h1 className={styles.title}>Let&apos;s start questionnaire!</h1>

        <StartQuestionnaireButton
          startScreenId={screenData?.screenId ?? null}
          className={styles.button}
        />

        {!!screenWithDateData && (
          <StartQuestionnaireButton
            startScreenId={screenWithDateData.screenId}
            questionnaireVariant={EQuestioannaireVariant.WITH_DATE}
            className={styles.button}
            text="Start questionnaire with date input"
          />
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footer__description}>
          Developed by @Mikelangelo64
        </p>
      </footer>
    </LayoutContainer>
  );
}
