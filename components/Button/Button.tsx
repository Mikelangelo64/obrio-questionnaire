import { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from 'clsx';
import styles from './styles.module.scss';

const Button = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn([styles.button, className])}
      {...props}
    />
  );
};

export default Button;
