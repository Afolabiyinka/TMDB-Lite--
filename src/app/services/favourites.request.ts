import { apiClient } from "../api/axios-config";
import { getErrorMessage } from "../libs/errorMsg";
import type { Favourites, ResponseType, } from "../types/favourites.types";
import type { MovieType } from "../types/movie.types";

const getFavourites = async (page: number): Promise<Favourites> => {

    try {
        const res = await apiClient.get(`/favourites?page=${page}`)
        return res.data
    } catch (err) { throw new Error(); }

}


const inFavourites = async (id: number | string) => {
    try {
        const res = await apiClient.get(`/favourites/inFavourites/${id}`)
        return res.data
    }
    catch (err) {
        throw new Error(getErrorMessage(err))
    }

}
const addToFavourites = async (movie: MovieType): Promise<ResponseType> => {
    try {
        const res = await apiClient.post<ResponseType>(`/favourites/add`, movie)
        return res.data
    }
    catch (err) {
        throw new Error(getErrorMessage(err))
    }
}

const removeFromFavourites = async (id: string | number) => {

    try {
        const res = await apiClient.delete<ResponseType>(`favourites/remove/${id}`)
        return res.data
    }
    catch (err) {
        throw new Error(getErrorMessage(err))
    }
}


export { getFavourites, addToFavourites, removeFromFavourites, inFavourites }