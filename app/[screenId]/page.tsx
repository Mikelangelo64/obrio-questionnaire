import InfoButton from '@/lib/features/questionnaire/components/InfoButton/InfoButton';
import QuestionList from '@/lib/features/questionnaire/components/QuestionList/QuestionList';
import TextWithDynamicSegments from '@/lib/features/questionnaire/components/TextWithDynamicSegments/TextWithDynamicSegments';
import { getStaticScreen, shouldUseStaticData } from '@/data/staticDataUtils';
import {
  EExtremeStatus,
  EQuestioannaireVariant,
  EQuestionType,
  EScreenType,
  TScreen,
  TScreenId,
} from '@/types/question.type';
import { fetchScreensData } from '@/lib/features/questionnaire/server/fetchScreensData';
import GoBackButton from '@/lib/features/questionnaire/components/GoBackButton/GoBackButton';
import cn from 'clsx';
import { redirect } from 'next/navigation';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';
import Header from '@/components/Header/Header';
import styles from './styles.module.scss';
import { NOT_FOUND_URL } from '@/lib/features/questionnaire/constants';
import QuestionGuardProvider from '@/lib/features/questionnaire/components/QuestionGuardProvider';
import DatePicker from '@/lib/features/questionnaire/components/DatePicker/DatePicker';

export async function generateStaticParams() {
  try {
    const data = await fetchScreensData();
    const dataWithDate = await fetchScreensData(
      EQuestioannaireVariant.WITH_DATE,
    );

    return [...data, ...dataWithDate].map(screen => ({
      screenId: screen.screenId,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);

    return [];
  }
}

async function getScreenData(
  screenId: string,
  questionnaireVariant?: EQuestioannaireVariant,
): Promise<{
  screenData: TScreen | null;
}> {
  // Use static data for builds
  if (shouldUseStaticData()) {
    const screenData = getStaticScreen(screenId, questionnaireVariant);
    return { screenData };
  }

  // Try API for development
  try {
    const data = await fetchScreensData(questionnaireVariant);
    const currentScreenData = data.find(screen => screen.screenId === screenId);
    return { screenData: currentScreenData || null };
  } catch (error) {
    console.error('Error fetching screen data:', error);

    return { screenData: null };
  }
}

export default async function Screen({
  params,
  searchParams,
}: {
  params: Promise<{ screenId: TScreenId }>;
  searchParams: Promise<{
    [key: string]:
      | EQuestioannaireVariant
      | EQuestioannaireVariant[]
      | undefined;
  }>;
}) {
  const { screenId } = await params;
  const variant = (await searchParams).variant;

  const { screenData } = await getScreenData(
    screenId,
    Array.isArray(variant) ? variant[0] : variant,
  );

  if (!screenData) {
    return redirect(NOT_FOUND_URL);
  }

  const isInfoScreen = screenData.screenType === EScreenType.INFO;
  const isQuestionScreen = screenData.screenType === EScreenType.QUESTION;

  return (
    <QuestionGuardProvider>
      <LayoutContainer
        withHeader
        className={cn(
          isInfoScreen && styles.info_container,
          (isInfoScreen || !!screenData.description) && styles.text_center,
        )}
      >
        <Header variant={isInfoScreen ? 'dark' : 'light'}>
          {screenData.extremeStatus !== EExtremeStatus.START && (
            <GoBackButton className={styles.back_button} />
          )}
        </Header>

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

          {isQuestionScreen &&
            screenData.questionType === EQuestionType.OPTIONS && (
              <QuestionList screenData={screenData} screenId={screenId} />
            )}

          {isQuestionScreen &&
            screenData.questionType === EQuestionType.DATE && (
              <DatePicker screenData={screenData} screenId={screenId} />
            )}

          {isInfoScreen && <InfoButton screenData={screenData} />}
        </div>
      </LayoutContainer>
    </QuestionGuardProvider>
  );
}
