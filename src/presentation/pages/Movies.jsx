import { useEffect, useState } from "react";
import { movieGenres } from "../../api/genresEndpoints";
import MovieRow from "../components/MovieRow";
import { fetchMoviesByGenre } from "../../api/movies.api";
import classes from "./Movies.module.css";

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
    <div className={classes.sections}>
      {movieGenres.map((genre) => (
        <MovieRow
          key={genre.endpoint}
          rowName={genre.name}
          movies={moviesByGenre[genre.endpoint] || []}
        />
      ))}
      ;
    </div>
  );
}
