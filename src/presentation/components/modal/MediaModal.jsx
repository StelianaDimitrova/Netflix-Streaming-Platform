import { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../../application/context/ModalContext";
import Button from "../Button";

import classes from "./MediaModal.module.css";
import { useNavigate, useParams } from "react-router-dom";

export default function MediaModal() {
  const navigate = useNavigate();
  const { type } = useParams();

  const { selectedMovie, closeModal } = useContext(ModalContext);
  if (!selectedMovie) return null;

  const typeOfMedia = type === "movie" ? "movie" : "tv";

  function handlePlayButtonClick() {
    navigate(`/watch/${typeOfMedia}/${selectedMovie.id}`);
  }

  function handleAddButtonClick() {
    const currentFavs = JSON.parse(localStorage.getItem("myList") || "[]");

    if (!currentFavs.includes(selectedMovie.id)) {
      const updatedFavs = [...currentFavs, selectedMovie.id];
      localStorage.setItem("myList", JSON.stringify(updatedFavs));
    }
  }

  return createPortal(
    <dialog className={classes.dialog}>
      <div className={classes.backdrop} onClick={closeModal}>
        <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
          <button className={classes.closeBtn} onClick={closeModal}>
            X
          </button>
          <img
            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title || selectedMovie.name}
            className={classes.banner}
          />
          <div className={classes.content}>
            <h2>{selectedMovie.title || selectedMovie.name}</h2>
            <div className={classes.buttons}>
              <Button
                customClassName={classes.playBtn}
                title="Play"
                onClick={handlePlayButtonClick}
              />
              <Button
                customClassName={classes.listBtn}
                title="Add to My List"
                onClick={handleAddButtonClick}
              />
            </div>
            <p>{selectedMovie.overview}</p>
            <div className={classes.details}>
              <p>Rating: {selectedMovie.vote_average}</p>
              <p>Released on: {selectedMovie.release_date}</p>
              {selectedMovie.production_companies?.[0] && (
                <p className={classes.badge}>
                  {selectedMovie.production_companies[0].name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal"),
  );
}
