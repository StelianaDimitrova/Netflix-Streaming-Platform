import { useState, useRef, useCallback } from "react";

export function useWatchedWithProgress(videoKey, threshold = 0.8) {
  const playerRef = useRef(null);
  const [watched, setWatched] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("watched") || "[]");
    return stored.some((movie) => movie.id === videoKey);
  });

  const markWatched = useCallback(
    (movieData) => {
      if (!watched && movieData) {
        setWatched(true);
        const stored = JSON.parse(localStorage.getItem("watched") || "[]");

        if (!stored.some((movie) => movie.id === movieData.id)) {
          const updated = [movieData, ...stored];
          localStorage.setItem("watched", JSON.stringify(updated));
        }
      }
    },
    [watched],
  );

  const handleProgress = useCallback(
    (movieData) => {
      if (!playerRef.current || watched) return;

      const current = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();

      if (duration > 0 && current / duration >= threshold) {
        markWatched(movieData);
      }
    },
    [watched, threshold, markWatched],
  );

  return { watched, markWatched, playerRef, handleProgress };
}
