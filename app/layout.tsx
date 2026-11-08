import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';

import { AppSidebar } from '@/app/_components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
      <body className="min-h-dvh">
        {process.env.NODE_ENV === 'development' && process.env.PLAYWRIGHT_E2E !== '1' && (
          <Script src="https://unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" />
        )}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-h-svh">
            <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4 md:hidden">
              <SidebarTrigger />
              <Link className="font-semibold tracking-tight" href="/">
                Cesco UI
              </Link>
            </header>
            <div className="min-w-0 flex-1 p-6 md:p-10">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
