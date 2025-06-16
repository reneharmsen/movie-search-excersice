'use client';
import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string, sortBy: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState('popularity');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchInput, sortBy);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(searchInput, sortBy);
    };


    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSortBy(e.target.value);
        onSearch(searchInput, sortBy);
    };

    return (
        <div className="flex justify-center m-6">
            <div className="join">
                <input
                    className="input input-bordered join-item rounded-l-md w-96"
                    type="search"
                    value={searchInput}
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
    );
};
