import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Where in the world?',
  description: 'Find information about countries around the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 👇 importante: clase "dark" se aplica aquí desde ThemeContext
    <html lang="en">
      {/* 👇 no es necesario usar dark:bg aquí si ya se aplica en un div dentro */}
      <body className={nunitoSans.className}>
        <ThemeProvider>
          {/* 👇 ahora sí: aquí va el contenedor que usa dark:bg-... */}
          <div className="min-h-screen bg-very-light-gray dark:bg-very-dark-blue transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-dark-blue shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <h1 className="text-xl font-bold text-very-dark-blue-text dark:text-white">
                    Where in the world?
                  </h1>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}