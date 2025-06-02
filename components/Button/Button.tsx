import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from 'clsx';
import styles from './styles.module.scss';

const Button = ({
  className,
  asChild = false,
  variant = 'primary',
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean;
  variant?: 'primary' | 'secondary';
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn([styles.button, className, styles[variant]])}
      {...props}
    />
  );
};

export default Button;
