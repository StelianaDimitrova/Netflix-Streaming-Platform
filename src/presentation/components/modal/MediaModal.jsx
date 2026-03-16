import { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../../application/context/ModalContext";

import classes from "./MediaModal.module.css";

export default function MediaModal() {
  const { selectedMovie, closeModal } = useContext(ModalContext);
  console.log("Selected movie in modal:", selectedMovie);
  if (!selectedMovie) return null;

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
              <button className={classes.playBtn}>Play</button>
              <button className={classes.listBtn}>Add to My List</button>
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
