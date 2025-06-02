import cn from 'clsx';
import styles from './styles.module.scss';
import { CSSProperties } from 'react';

const LayoutContainer = ({
  children,
  className,
  withHeader = false,
  justifyContent = 'space-between',
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  withHeader?: boolean;
  justifyContent?: CSSProperties['justifyContent'];
}>) => {
  return (
    <div
      className={cn(
        withHeader && styles.with_header,
        styles.container,
        styles[justifyContent],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
