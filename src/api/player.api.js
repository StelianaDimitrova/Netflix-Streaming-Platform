const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = `https://api.themoviedb.org/3/`;

export default async function fetchVideo({ typeOfMedia, id }) {
  try {
    const response = await fetch(
      `${baseURL}${typeOfMedia}/${id}/videos?api_key=${API_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await response.json();
    return data.results[0].key;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}
