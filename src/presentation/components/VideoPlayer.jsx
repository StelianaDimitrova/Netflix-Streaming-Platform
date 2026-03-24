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
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      handleProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, [handleProgress]);

  return (
    <div className={classes.videoWrapper}>
      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onEnd={markWatched}
        className={classes.video}
      />
    </div>
  );
}
