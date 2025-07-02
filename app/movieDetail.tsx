'use client';

import Image from 'next/image';
import { Movie } from './_types/movie';
import { useState } from 'react';
import { auth_getUser } from './actions/auth'

export default function MovieDetail(movie: Movie) {

    const toggleLike = async(state: boolean) => {
        const userName = auth_getUser()

        console.log(userName)

        setLiked(state)
    }

    const [liked, setLiked] = useState(false)
    const releaseDate = new Date(movie.release_date);

    return (
        <>
        <div className="hero bg-base-200 rounded-lg p-4 mb-4">
            <div className="hero-content flex-col p-0">
                <div className="flex flex-col items-center max-w-xl">
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {movie.genres?.map((genre) => (
                            <div key={genre.id} className="badge badge-sm badge-primary">
                                {genre.name}
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                            alt={movie.title} 
                            width={300} 
                            height={450}
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 text-center">{movie.title}</h1>
                    {movie.tagline && (
                        <p className="text-lg italic text-base-content/70 text-center">{movie.tagline}</p>
                    )}
                    <p className="text-center mt-2">{movie.overview}</p>

                    <div className="stats shadow mt-4">
                        <div className="stat place-items-center">
                            <div className="stat-title">Release Year</div>
                            <div className="stat-value">{releaseDate.getFullYear()}</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Runtime</div>
                            <div className="stat-value text-secondary">{movie.runtime}</div>
                            <div className="stat-desc">minutes</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        {liked 
                            ? 
                        <button className="btn btn-primary gap-2" aria-label="Unlike Movie" onClick={() => toggleLike(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L12 8.344l3.172-3.172a4 4 0 115.656 5.656L12 19.656l-8.828-8.828a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                        </button>                                
                            :       
                        <button className="btn btn-primary gap-2" aria-label="Like Movie" onClick={() => toggleLike(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                        </button>
                            }
                    </div>
                </div>
            </div>
        </div>
       </> 
    )
}