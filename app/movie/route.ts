import { NextRequest } from 'next/server';
import { Movie } from '../_types/movie';

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    const res = await fetch(
        'https://api.themoviedb.org/3/movie/' + id,
        {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + process.env.MOVIE_DB_TOKEN,
            },
        }
    );

    const data = await res.json();
    const movie: Movie = data;

    return Response.json(movie);
}


