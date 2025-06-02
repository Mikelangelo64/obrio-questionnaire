import { ReactNode } from 'react';
import Image from 'next/image';
import cn from 'clsx';
import styles from './styles.module.scss';

const Header = ({
  children,
  className,
  variant = 'light',
}: {
  children?: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}) => {
  return (
    <header className={cn(styles.header, className)}>
      {children}

      <Image
        className={styles.header__image}
        src={
          variant === 'dark'
            ? '/image/header-logo-white.png'
            : '/image/header-logo.png'
        }
        width={15}
        height={16}
        alt="Logo"
      />
    </header>
  );
};

export default Header;
