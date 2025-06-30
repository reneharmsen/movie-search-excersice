import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Movie Search',
    description: 'Search for movies and series',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="corporate" className="bg-secondary">
            <body className={inter.className}>
                <header className="w-full flex justify-center bg-base-100 shadow-md mb-4">
                    <div className="flex items-center w-full max-w-3xl px-4 py-2">
                        <Link href="/" className="flex items-center">
                            <Image src="/moviesearch.svg" width={100} height={100} alt="Movie Search Logo" className="h-20 w-auto mr-4" />
                        </Link>
                        <h1>Movie Search</h1>
                    </div>
                </header>
                <main className="w-full flex justify-center">
                    <div className="w-full max-w-3xl px-4">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
