//Importing the api keys
const API_KEY = import.meta.env.VITE_API_KEY!;
const BASE_URL = import.meta.env.VITE_BASE_URL!;

export const getLatestMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getPopularPeople = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/person/day?api_key=${API_KEY}`
  );
  const actor = await response.json();
  return actor.results;
};
export const getMovieDetails = async (id: any) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);
  const movieDetails = await response.json();
  return movieDetails;
};
export const getParticularRecomendations = async (id: any) => {
  const url = `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);
  const movieDetails = await response.json();
  return movieDetails.results;
};
export const getMovieTrailer = async (id: any) => {
  const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);

  const data = await response.json();

  const trailers = data.results?.filter(
    (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
  );
  console.log(trailers);

  return trailers ?? [];
};
export const getMovieCredits = async (id: any) => {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);
  const movieCredit = await response.json();

  return movieCredit.cast;
};
