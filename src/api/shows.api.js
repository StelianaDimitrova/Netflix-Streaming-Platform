const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = `https://api.themoviedb.org/3/`;

export const fetchTVShows = async (endpoint) => {
  const URL = `${baseURL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed to fetch TV shows");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
  }
};

export const fetchTVShowsByGenre = async (genreId) => {
  const URL = `${baseURL}discover/tv?api_key=${API_KEY}&with_genres=${genreId}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed to fetch TV shows by genre");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error);
  }
};

export const fetchShowsDetails = async (id) => {
  const URL = `${baseURL}tv/${id}?api_key=${API_KEY}&language=en-US`;

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