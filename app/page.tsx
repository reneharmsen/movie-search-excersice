import Image from 'next/image';
import { SearchMovies } from './searchMovies';

export default function Home() {
    return (
        <main className="container mx-auto">
            <SearchMovies></SearchMovies>
        </main>
    );
}
