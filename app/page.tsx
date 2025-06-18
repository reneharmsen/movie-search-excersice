import Image from 'next/image';
import { SearchMovies } from './searchMovies';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="container mx-auto">
            <Suspense>
                <SearchMovies></SearchMovies>
            </Suspense>
        </main>
    );
}
