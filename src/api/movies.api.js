const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = `https://api.themoviedb.org/3/movie/`;

export const fetchMovies = async (typeMovie) => {
  let URL = `${baseURL}${typeMovie}?api_key=${API_KEY}&language=en-US&page=1`;

  if (typeMovie === "trending") {
    URL = `https://api.themoviedb.org/3/${typeMovie}/movie/week?api_key=${API_KEY}`;
  }

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    console.log(data.results);

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
