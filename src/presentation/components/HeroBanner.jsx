import { useContext } from "react";
import Button from "./Button";
import classes from "./HeroBanner.module.css";
import { ModalContext } from "../../application/context/ModalContext";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({ movie }) {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

    function handlePlayButtonClick() {
    navigate(`watch/movie/${movie.id}`);
  }


  return (
    <section
      className={classes.banner}
      style={{
        backgroundImage: `
      url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})
    `,
      }}
    >
      <div className={classes.content}>
        <h1>{movie?.title || movie?.name}</h1>
        <p>{movie?.overview}</p>

        <div>
          <Button
            customClassName={classes.playButton}
            title="Play"
            onClick={handlePlayButtonClick}
          />
          <Button
            customClassName={classes.infoButton}
            title="More Info"
            onClick={() => openModal(movie)}
          />
        </div>
      </div>
    </section>
  );
}
