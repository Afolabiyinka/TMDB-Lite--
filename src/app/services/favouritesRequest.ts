import { prodEndpoint } from "../constants/api-data";
import type { Favourites } from "../types/favourites";
import type { MovieType } from "../types/movie";

const getFavourites = async (): Promise<Favourites> => {
    const res = await fetch(`${prodEndpoint}api/favourites/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data
}

const addToFavourites = async (movie: MovieType) => {

    const res = await fetch(`${prodEndpoint}api/favourites/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(movie)
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data
}

const removeFromFavourites = async (id: number | string) => {
    const res = await fetch(`${prodEndpoint}api/favourites/remove/`, {
        method: "DELETE",
        body: JSON.stringify({ movieId: id }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data
}


export { getFavourites, addToFavourites, removeFromFavourites }