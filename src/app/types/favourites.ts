import type { MovieType } from "./movie";

export interface Favourites {
    favourites: MovieType[];
    total: number;
    currentPage: number;
    totalPages: number;

}

export interface ResponseType {
    message: string
}