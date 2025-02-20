const API_KEY = "77a443f6655b62e7dfaf1f26d5ea79d6";
const BASE_URL = "https://api.themoviedb.org/3";

export const getLatestMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// export const searchMovies = async (query) => {
//   const response = await fetch(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
//       query
//     )}`
//   );
// };

export const getPopularPeople = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/person/day?api_key=${API_KEY}`
  );
  const actor = await response.json();
  return actor.results;
};
