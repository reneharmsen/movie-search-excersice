'use server'

type MyMoviesProps = {
    userId: string
}

export default async function MyMovies(props:MyMoviesProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/movie_likes?userId=${props.userId}`, { cache: 'no-store' });
    const data = await res.json();
    const movieIds: number[] = data.result || [];

    return (
        <ul>
        {
            movieIds.length > 0 && movieIds.map((movie) => {
            return ( 
                <li>{movie}</li>
            )})
        }
        </ul>
    )
}