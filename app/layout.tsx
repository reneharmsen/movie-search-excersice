import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Movie Search',
    description: 'Search for movies and series',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="corporate" className="bg-secondary">
            <body className={inter.className}>
                
                JAJA
                
                {children}</body>
        </html>
    );
}
