'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './searchbar';
import { Movie } from './_types/movie';
import Image from 'next/image';
import Link from 'next/link';
import _  from 'lodash';
import slugify from 'slugify';

export const SearchMovies = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(searchParams.get('currentPage') ? parseInt(searchParams.get('currentPage')!) : 1)
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');

    const onSearch = async (query: string, sortBy: string, page: number = 1, init: boolean = false) => {
        const rawResponse = await fetch(`/search?movieQuery=${query}&page=${page}&sortBy=${sortBy}`)
        const response = await rawResponse.json()
        const sorted = _.orderBy(response.movies, sortBy, ['desc']);

        setSortBy(sortBy)
        setMovieResults(sorted)
        setPages(response.total_pages)
        setQuery(query)
        setCurrentPage(page) 

        if(query !== '' || sortBy !== 'popularity' || page !== 1) {
            const queryParams = new URLSearchParams({
                query: query,
                sortBy: sortBy,
                currentPage: page.toString(),
            })

            if(!init) {
                router.push(`/?${queryParams.toString()}`)
            } 
        }
    }

    return (
        <>
            <SearchBar onSearch={(query, sortBy) => onSearch(query, sortBy, 1)} placeholder="Search Movies" />

            {pages > 1 && (
                <div className="flex justify-center gap-2 my-8 px-4">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (

                        <button
                            key={page}
                            className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => onSearch(query, sortBy, page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
                {movieResults.length > 0 &&
                    movieResults.map((movie) => {
                        return (
                            <Link href={`./movies/${movie.id}/${slugify(movie.title, { lower: true })}`} key={movie.id} 
                                className="card bg-neutral-content shadow-xl basis-96 hover:shadow-2xl transition-shadow 
                                duration-300 hover:scale-105 cursor-pointer">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {movie.title}
                                        {movie.release_date && (
                                            <span className="text-sm opacity-75">
                                                {' '}
                                                ({new Date(movie.release_date).getFullYear()})
                                            </span>
                                        )}
                                    </h2>
                                </div>
                                <figure className="my-5">
                                    {movie.poster_path && (
                                        <Image
                                            alt={movie.title + ' poster'}
                                            src={'https://image.tmdb.org/t/p/w200' + movie.poster_path}
                                            width={200}
                                            height={300}
                                            className="transition-transform duration-300"
                                        ></Image>
                                    )}
                                </figure>
                            </Link>
                        );
                    })}
            </div>
        </>
    )
}
