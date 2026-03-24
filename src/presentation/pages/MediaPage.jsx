import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import VideoPlayer from "../components/VideoPlayer";
import { fetchMovieDetails } from "../../api/movies.api";
import { fetchShowsDetails } from "../../api/shows.api";
import fetchVideo from "../../api/player.api";
import classes from "./MediaPage.module.css";
import { useWatchedWithProgress } from "../../application/hooks/useWatchedWithProgress";

export default function MediaPage() {
  const { type, id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");

  const { markWatched, playerRef, handleProgress } = useWatchedWithProgress(id);

  useEffect(() => {
    async function loadDetails() {
      const details = await (type === "movie"
        ? fetchMovieDetails(id)
        : fetchShowsDetails(id));
      setSelectedMovie(details);
    }
    loadDetails();
  }, [type, id]);

  useEffect(() => {
    async function loadVideo() {
      const key = await fetchVideo({ typeOfMedia: type, id });
      setVideoKey(key);
    }
    loadVideo();
  }, [type, id]);

  return (
    <div className={classes.mediaContainer}>
      <VideoPlayer
        videoKey={videoKey}
        playerRef={playerRef}
        handleProgress={handleProgress}
        markWatched={markWatched}
      />
      <div className={classes.movieInfo}>
        <div className={classes.leftContainer}>
          <h2 className={classes.movieTitle}>
            {selectedMovie?.title || selectedMovie?.name}
          </h2>
          <div className={classes.buttons}>
            <button className={classes.btnAdd}>Add to My List</button>
          </div>
          <p className={classes.overview}>{selectedMovie?.overview}</p>
        </div>
        <div className={classes.rightContainer}>
          <p>
            <span>Genres:</span>{" "}
            {selectedMovie?.genres?.map((g) => g.name).join(", ")}
          </p>
          <p>
            <span>Released:</span>{" "}
            {selectedMovie?.release_date || selectedMovie?.first_air_date}
          </p>
          <p>
            <span>Rating:</span>{" "}
            <span className="rating-badge">
              {selectedMovie?.vote_average?.toFixed(1)}
            </span>
          </p>
          {selectedMovie?.production_companies?.[0] && (
            <p>
              <span>Studio:</span>{" "}
              {selectedMovie?.production_companies[0]?.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
