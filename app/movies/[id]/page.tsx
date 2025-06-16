import { Movie } from '../../_types/movie';
import { headers } from 'next/headers';
import MovieDetail from '@/app/movieDetail';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export default async function MoviePage({ params }: Props) {
    const request_headers = await headers();
    const host = request_headers.get('host') || 'localhost:3000';

    const res = await fetch(`http://${host}/movie/?id=${(await params).id}`);
    const movie: Movie = await res.json();

    return (
        <MovieDetail {...movie} />
    );
}