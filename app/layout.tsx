import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { ThirdwebProvider } from 'thirdweb/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Voting Dapp'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(' session:', session);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-hidden`}>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <ThirdwebProvider>
            <Toaster />
            {children}
          </ThirdwebProvider>
        </Providers>
      </body>
    </html>
  );
}
