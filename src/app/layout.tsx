import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { Toaster } from 'sonner';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Techinnover',
  description: 'A Feature Packed Task Management Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.variable, 'antialiased')}>
        <EdgeStoreProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>
              <Header />
              {children}
            </div>
          </SidebarProvider>
        </EdgeStoreProvider>
        <Toaster closeButton position='bottom-left' />
      </body>
    </html>
  );
}
