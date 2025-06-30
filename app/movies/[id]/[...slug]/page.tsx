import { Movie } from '../../../_types/movie';
import { headers } from 'next/headers';

import MovieDetail from '@/app/movieDetail';
import { time } from 'console';

export const revalidate = 30;

type Props = {
  params: Promise<{ id: string }>
}

function getToken() {
  const token = process.env.MOVIE_DB_TOKEN || null;
  if (token === null) {
    throw new Error('MOVIE_DB_TOKEN is not defined in the environment variables');
  }
  return token;
}

export async function generateStaticParams() {
    const token = getToken();

    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const res  = await fetch('https://api.themoviedb.org/3/discover/movie',
      {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
      })

      const data = await res.json();
      const movies: Movie[] = data.results;
      
      return movies.map(movie => {
        return {
          id: movie.id.toString(),
          slug: [movie.title.replace(/\s+/g, '-').toLowerCase()]
        }
      })
    } catch (error) {
      console.error('Error generating static params:', error);
      return [];
    }
}

export default async function MoviePage({ params }: Props) {
    const request_headers = await headers();
    const timeStamp = new Date().toISOString();

    const host = request_headers.get('host') ?? 'localhost:3000'
    const protocol =    host.indexOf('localhost') !== -1 ? 'http' : 'https' 
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/movie/?id=${(await params).id}`)
    const movie: Movie = await res.json()

    return (
      <>
        <div className="hidden">${timeStamp}</div>
        { <MovieDetail {...movie} /> }
      </>
    )
}  