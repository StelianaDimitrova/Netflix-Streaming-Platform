import MovieCard from "./MovieCard";
import classes from "./MovieRow.module.css";

export default function MovieRow({ rowName, movies, type = 'movie' }) {
  return (
    <section className={classes.movieRowSection}>
      <h2 className={classes.rowName}>{rowName}</h2>
      <div className={classes.scrollContainer}>
        <div className={classes.moviesContainer}>
          {movies.map(
            (movie) =>
              movie.backdrop_path && <MovieCard key={movie.id} movie={movie} type={type}/>,
          )}
        </div>
      </div>
    </section>
  );
}
