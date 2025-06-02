'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

const GoBackButton = ({
  className,
  onClick,
  ...props
}: ComponentProps<'button'>) => {
  const router = useRouter();

  return (
    <button
      className={cn(styles.button, className)}
      {...props}
      onClick={evt => {
        if (onClick) {
          onClick(evt);
        }

        router.back();
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 12L15 4.5L16.05 5.55L9.6 12L16.05 18.45L15 19.5L7.5 12Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default GoBackButton;
