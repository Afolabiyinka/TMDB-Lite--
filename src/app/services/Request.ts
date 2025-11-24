//Importing the api keys
const API_KEY = process.env.REACT_APP_API_KEY!;
const BASE_URL = process.env.REACT_APP_BASE_URL!;

export const getLatestMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};
export const getMovieReviews = async (id: any) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
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
