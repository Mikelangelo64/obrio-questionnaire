import Link from 'next/link';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer';

export default function NotFound() {
  return (
    <LayoutContainer justifyContent="center">
      <h1 className={styles.title}>Ooops... something went wrong</h1>

      <p className={styles.description}>
        Please, go to the home page and try to participate in questionnaire
        again
      </p>

      <Button asChild>
        <Link href="/">Go home page</Link>
      </Button>
    </LayoutContainer>
  );
}
