const API_KEY = import.meta.env.API_KEY;

export const getActionMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
  );
  const data = await response.json();
  return data.results;
};

export const getRomanceMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  );
  const data = await response.json();
  return data.results;
};

export const getComedyMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  );
  const data = await response.json();
  return data.results;
};

export const getHorrorMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
  );
  const data = await response.json();
  return data.results;
};

export const getAnimationMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  );
  const data = await response.json();
  return data.results;
};
