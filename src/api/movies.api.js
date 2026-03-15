const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = `https://api.themoviedb.org/3/`;

export const fetchMovies = async (endpoint) => {
  const URL = `${baseURL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  const URL = `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  }
};

export const fetchMovieDetails = async (id) => {
  const URL = `${baseURL}movie/${id}?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
