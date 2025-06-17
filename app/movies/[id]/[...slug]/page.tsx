import { Movie } from '../../../_types/movie';
import { headers } from 'next/headers';

import MovieDetail from '@/app/movieDetail';


type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    const res  = await fetch('https://api.themoviedb.org/3/discover/movie',
    {
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.MOVIE_DB_TOKEN,
      },
    })
  
    const data = await res.json();
    const movies: Movie[] = data.results;
    
    return movies.map(movie => ({
      id: movie.id.toString()
    }));
}

export default async function MoviePage({ params }: Props) {
    const request_headers = await headers();

    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const host = request_headers.get('host') ?? 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/movie/?id=${(await params).id}`)
    const movie: Movie = await res.json()

    return (
      <MovieDetail {...movie} />
    )
}  