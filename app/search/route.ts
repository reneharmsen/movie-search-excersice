import { NextRequest } from 'next/server';
import { Movie } from '../_types/movie';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('movieQuery')
    const page = searchParams.get('page') || '1';

    const res = await fetch(
        'https://api.themoviedb.org/3/search/movie?' +
            new URLSearchParams({
                query: query || '', 
                include_adult: 'false',
                language: 'en_US',
                page: page,
            }),
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.MOVIE_DB_TOKEN,
            },
        }
    );

    const data = await res.json()
    const results: { movies:  Movie[], total_pages: number } = { movies: data.results, total_pages: data.total_pages }
    return Response.json(results)
}


