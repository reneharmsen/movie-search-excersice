import { Movie } from '../../_types/movie';
import { headers } from 'next/headers';
import MovieDetail from '@/app/movieDetail';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MoviePage({ params }: Props) {
    const request_headers = await headers();

    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const host = request_headers.get('host') ?? 'localhost:3000'
    const baseUrl = `${protocol}://${host}`

    console.log(`Fetching movie details from: ${baseUrl}/movie/?id=${(await params).id}`)

    const res = await fetch(`${baseUrl}/movie/?id=${(await params).id}`)
    const movie: Movie = await res.json()

    return (
      <MovieDetail {...movie} />
    )
}