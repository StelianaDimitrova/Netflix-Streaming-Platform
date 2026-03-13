import { useEffect, useState } from "react";
import { movieGenres } from "../../api/genresEndpoints";
import MovieRow from "../components/MovieRow";
import { fetchMoviesByGenre } from "../../api/movies.api";

export default function Movie() {
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const results = {};
    const loadMoviesByGenre = async () => {
      for (const genre of movieGenres) {
        const movies = await fetchMoviesByGenre(genre.endpoint);
        results[genre.endpoint] = movies;
      }
      setMoviesByGenre(results);
    };

    loadMoviesByGenre();
  }, []);

  return (
    <>
      {movieGenres.map((genre) => (
        <MovieRow
          key={genre.endpoint}
          rowName={genre.name}
          movies={moviesByGenre[genre.endpoint] || []}
        />
      ))}
      ;
    </>
  );
}
