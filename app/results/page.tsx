import Answers from '@/lib/features/questionnaire/components/Answers/Answers';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';
import styles from './styles.module.scss';
import Header from '@/components/Header/Header';
import ResetResultsButton from '@/lib/features/questionnaire/components/ResetResultsButton';

export default function Results() {
  return (
    <LayoutContainer withHeader justifyContent="flex-start">
      <Header />

      <p className={styles.title}>Here are your answers:</p>

      <Answers />

      <ResetResultsButton className={styles.button} />
    </LayoutContainer>
  );
}
