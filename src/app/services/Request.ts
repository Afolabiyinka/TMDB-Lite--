import type { MovieType } from "../types/movie";
//Importing the Variables
const BASE_URL = import.meta.env.VITE_BASE_URL!;
const token = import.meta.env.VITE_BEARER_TOKEN!;

export const getLatestMovies = async (page = 1): Promise<MovieType[]> => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?page=${page}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string): Promise<MovieType[]> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieType> => {
  const url = `${BASE_URL}/movie/${id}&language=en-US`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const movieDetails = await response.json();
  return movieDetails;
};
export const getParticularRecomendations = async (
  id: any
): Promise<MovieType[]> => {
  const url = `${BASE_URL}/movie/${id}/recommendations?language=en-US`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const movieDetails = await response.json();
  return movieDetails.results;
};
export const getMovieTrailer = async (id: number) => {
  const url = `${BASE_URL}/movie/${id}/videos?language=en-US`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  const trailers = data.results?.filter(
    (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
  );

  return trailers ?? [];
};
export const getMovieCredits = async (id: number) => {
  const url = `${BASE_URL}/movie/${id}/credits?language=en-US`;

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const movieCredit = await response.json();

  return movieCredit.cast;
};
