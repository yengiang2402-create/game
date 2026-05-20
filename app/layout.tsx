import './globals.css';
import type { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: '2048 - Modern Edition',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${montserrat.variable} bg-[#111316] text-[#e2e2e6]`}>
        {children}
      </body>
    </html>
  );
}