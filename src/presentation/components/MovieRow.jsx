import MovieCard from "./MovieCard";
import classes from "./MovieRow.module.css";

export default function MovieRow({
  rowName,
  movies,
  type = "movie",
  isMyList = false,
  isHistory = false,
  onRemove = () => {},
}) {
  return (
    <section className={classes.movieRowSection}>
      <h2 className={classes.rowName}>{rowName}</h2>
      <div className={classes.scrollContainer}>
        <div
          className={
            isMyList || isHistory
              ? classes.myListAndHistoryStyle
              : classes.moviesContainer
          }
        >
          {movies.map(
            (movie) =>
              movie.backdrop_path && (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  type={
                    movie?.media_type === "movie" || movie?.release_date
                      ? type
                      : "tv"
                  }
                  isMyList={isMyList}
                  onRemove={onRemove}
                />
              ),
          )}
        </div>
      </div>
    </section>
  );
}
