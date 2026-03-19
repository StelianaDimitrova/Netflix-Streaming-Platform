import { useEffect } from "react";

import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import classes from "./MovieCard.module.css";
import { useState } from "react";
import { fetchMovieDetails } from "../../api/movies.api";
import { useContext } from "react";
import { ModalContext } from "../../application/context/ModalContext";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, type }) {
  const [displayedMovie, setDisplayedMovie] = useState();
  const { openModal } = useContext(ModalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDisplayedMovie = async () => {
      const displayed = await fetchMovieDetails(movie.id);

      setDisplayedMovie(displayed);
    };

    loadDisplayedMovie();
  }, [movie.id]);

  function handlePlayButtonClick() {
    navigate(`/watch/${type}/${movie.id}`);
  }

  return (
    <article className={classes.cardWrapper}>
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
        alt={movie.title || "Movie Poster"}
        className={classes.poster}
      />
      <div className={classes.overlay}>
        <div className={classes.controls}>
          <button onClick={handlePlayButtonClick}>
            <PlayCircleOutlineOutlinedIcon />
          </button>
          <button>
            <AddCircleOutlineIcon />
          </button>
          <button onClick={() => openModal(displayedMovie)}>
            <InfoOutlineIcon />
          </button>
        </div>
        <div className={classes.metadata}>
          <p className={classes.movieTitle}>{displayedMovie?.title}</p>
          <span>
            <p className={classes.releaseYear}>
              {displayedMovie?.release_date.slice(0, 4)}
            </p>
            <p className={classes.duration}>{displayedMovie?.runtime} min</p>
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
