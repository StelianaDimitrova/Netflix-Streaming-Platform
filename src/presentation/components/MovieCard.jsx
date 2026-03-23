import { useEffect } from "react";

import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import classes from "./MovieCard.module.css";
import { useState } from "react";
import { fetchMovieDetails } from "../../api/movies.api";
import { useContext } from "react";
import { ModalContext } from "../../application/context/ModalContext";
import { useNavigate } from "react-router-dom";
import { fetchShowsDetails } from "../../api/shows.api";

export default function MovieCard({ movie, type, isMyList, onRemove }) {
  const [displayedMovie, setDisplayedMovie] = useState();
  const { openModal } = useContext(ModalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDisplayedMovie = async () => {
      const displayed = await (type === "movie"
        ? fetchMovieDetails(movie.id)
        : fetchShowsDetails(movie.id));

      setDisplayedMovie(displayed);
    };

    loadDisplayedMovie();
  }, [type, movie.id]);

  function handlePlayButtonClick() {
    navigate(`/watch/${type}/${movie.id}`);
  }

  function handleAddButtonClick() {
    const currentFavs = JSON.parse(localStorage.getItem("myList") || "[]");
    const isAlreadyInList = currentFavs.some((item) => item.id === movie.id);

    if (!isAlreadyInList) {
      const updatedFavs = [...currentFavs, movie];
      localStorage.setItem("myList", JSON.stringify(updatedFavs));
    }
  }

  function handleRemoveButtonClick(movie) {
    onRemove(movie);
  }

  return (
    <article className={classes.cardWrapper}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
        alt={movie.title || movie.name || "Movie Poster"}
        className={classes.poster}
      />
      <div className={classes.overlay}>
        <div className={classes.controls}>
          <button onClick={handlePlayButtonClick}>
            <PlayCircleOutlineOutlinedIcon />
          </button>
          {isMyList ? (
            <button onClick={() => handleRemoveButtonClick(movie)}>
              <RemoveCircleOutlineIcon />
            </button>
          ) : (
            <button onClick={handleAddButtonClick}>
              <AddCircleOutlineIcon />
            </button>
          )}
          <button onClick={() => openModal(displayedMovie)}>
            <InfoOutlineIcon />
          </button>
        </div>
        <div className={classes.metadata}>
          <p className={classes.movieTitle}>
            {displayedMovie?.title || displayedMovie?.name}
          </p>
          <span>
            <p className={classes.releaseYear}>
              {(
                displayedMovie?.release_date || displayedMovie?.first_air_date
              )?.slice(0, 4)}
            </p>
            <p className={classes.duration}>
              {displayedMovie?.runtime || displayedMovie?.episode_run_time?.[0]}{" "}
              min
            </p>
          </span>
          <p>
            {displayedMovie?.genres
              ?.slice(0, 3)
              .map((g) => g.name)
              .join(" • ")}
          </p>
        </div>
      </div>
    </article>
  );
}
