import Answers from '@/lib/features/questionnaire/components/Answers/Answers';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';
import styles from './styles.module.scss';
import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function Results() {
  return (
    <LayoutContainer withHeader justifyContent="flex-start">
      <Header />

      <p className={styles.title}>Here are your answers:</p>

      <Answers />

      <Button asChild className={styles.button}>
        <Link href="/">Go to home</Link>
      </Button>
    </LayoutContainer>
  );
}
