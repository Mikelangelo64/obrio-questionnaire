import cn from 'clsx';
import styles from './styles.module.scss';

const LayoutContainer = ({
  children,
  className,
  withHeader = false,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  withHeader?: boolean;
}>) => {
  return (
    <div
      className={cn(
        withHeader && styles.with_header,
        styles.container,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
