export interface Movie {
    title: string;
    id: number;
    release_date: Date;
    poster_path: string;
    overview: string;
    tagline: string;
    genres: [{
        id: number;
        name: string;
    }];
    runtime: number;
    imdb_id: string;
    popularity: number;
}

