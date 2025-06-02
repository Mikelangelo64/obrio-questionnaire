import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import cn from 'clsx';
import StoreProvider from '../components/StoreProvider';
import '@/styles/index.scss';
import ViewportHeightCalculation from '@/lib/features/ViewportHeightCalculation';

const geistSans = Open_Sans({
  variable: '--font-family',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Obrio questionnaire',
  description: 'Questionnaire with SSG',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, 'antialiased')}>
      <body>
        <ViewportHeightCalculation />

        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
