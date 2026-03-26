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

    const trailer = data.results.filter(
      (clip) =>
        clip.name.toLowerCase().includes("official trailer") ||
        clip.name.toLowerCase().includes("series trailer") ||
        clip.name.toLowerCase().includes("trailer"),
    );

    if (trailer.length === 0) {
      console.log("No trailers found.");
      trailer.push(data.results[0]);
      return null;
    }

    return trailer[0].key;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}
