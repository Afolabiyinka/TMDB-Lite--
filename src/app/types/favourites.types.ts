import type { MovieType } from "./movie.types";

export interface Favourites {
    favourites: MovieType[];
    total: number;
    currentPage: number;
    totalPages: number;

}

export interface ResponseType {
    message: string
}