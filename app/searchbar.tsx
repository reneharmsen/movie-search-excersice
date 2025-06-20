'use client';
import React, { ChangeEvent, KeyboardEventHandler, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
    onSearch: (searchTerm: string, sortBy: string, page: number, init?: boolean) => void;
    placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
    const searchParams = useSearchParams();
    const page = 1;
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(query, sortBy, page);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(query, sortBy, page);
    };


    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        onSearch(query, e.target.value, page);
        setSortBy(e.target.value);
    };

    
    useEffect(() => {
        onSearch(query, sortBy, page, true);
    }, [])

    return (
        <div className="flex justify-center m-6">
            <div className="join">
                <input
                    className="input input-bordered join-item rounded-l-md w-96"
                    type="search"
                    value={query}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                    placeholder="Search Movies"
                ></input>

                <button className="btn join-item rounded-r-full" onClick={handleClick}>
                    Search
                </button>

                <select className="select select-bordered join-item rounded-r-md" onChange={handleSortChange}>
                    <option value="popularity">Popularity</option>
                    <option value="release_date">Release date</option>
                </select>
            </div>
        </div>
    )
}
