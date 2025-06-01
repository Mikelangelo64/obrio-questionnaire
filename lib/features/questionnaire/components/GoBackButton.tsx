'use client';

import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      Go back
    </button>
  );
};

export default GoBackButton;
