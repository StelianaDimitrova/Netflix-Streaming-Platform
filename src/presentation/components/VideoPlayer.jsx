import { useEffect, useState } from "react";
import fetchVideo from "../../api/player.api";

import classes from "./VideoPlayer.module.css";

export default function VideoPlayer({ typeOfMedia, id }) {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    async function loadVideo() {
      const videoKey = await fetchVideo({ typeOfMedia, id });

      if (videoKey)
        setVideoUrl(
          `https://www.youtube.com/embed/${videoKey}?autoplay=1&allowfullscreen`,
        );
    }

    loadVideo();
  }, [typeOfMedia, id]);

  return (
    <div className={classes.videoWrapper}>
      <iframe
        src={videoUrl || null}
        title="Movie trailor"
        className={classes.video}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}
