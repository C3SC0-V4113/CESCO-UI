import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

import { SiteSidebar } from '@/app/_components/site-sidebar';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cesco UI',
  description: 'Cross-base shadcn registry components.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col md:flex-row">
        {process.env.NODE_ENV === 'development' && (
          <Script src="https://unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" />
        )}
        <SiteSidebar />
        <main className="min-w-0 flex-1 p-6 md:p-10">{children}</main>
      </body>
    </html>
  );
}
