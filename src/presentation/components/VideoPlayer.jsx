import { useEffect } from "react";

import classes from "./VideoPlayer.module.css";
import YouTube from "react-youtube";

const opts = {
  height: "100%",
  width: "100%",
  playerVars: { autoplay: 1, controls: 1 },
};

export default function VideoPlayer({
  videoKey,
  playerRef,
  handleProgress,
  markWatched,
  movieData,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      handleProgress(movieData);
    }, 1000);

    return () => clearInterval(interval);
  }, [handleProgress, movieData]);

  return (
    <div className={classes.videoWrapper}>
      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onEnd={() => markWatched(movieData)}
        className={classes.video}
      />
    </div>
  );
}
