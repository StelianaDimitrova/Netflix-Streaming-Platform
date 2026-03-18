import { useEffect, useState } from "react";

import MovieRow from "../components/MovieRow";
import classes from "./TVShows.module.css";
import { showsGenres, showsEndpoints } from "../../api/showsEndpoints";
import { fetchTVShows, fetchTVShowsByGenre } from "../../api/shows.api";

export default function Shows() {
  const [showsByGenre, setShowsByGenre] = useState({});
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [airingTodayShows, setAiringTodayShows] = useState([]);

  useEffect(() => {
    const loadShowsByGenre = async () => {
      const results = {};
      for (const genre of showsGenres) {
        const shows = await fetchTVShowsByGenre(genre.endpoint);
        results[genre.endpoint] = shows;
      }
      setShowsByGenre(results);
    };

    const loadSpecialRows = async () => {
      const topRated = await fetchTVShows(showsEndpoints.topRated);
      const airingToday = await fetchTVShows(showsEndpoints.airing_today);
      setTopRatedShows(topRated || []);
      setAiringTodayShows(airingToday || []);
    };

    loadShowsByGenre();
    loadSpecialRows();
  }, []);

  return (
    <div className={classes.sections}>
      <MovieRow rowName="Top Rated" movies={topRatedShows} />
      <MovieRow rowName="Airing Today" movies={airingTodayShows} />

      {showsGenres.map((genre) => (
        <MovieRow
          key={genre.endpoint}
          rowName={genre.name}
          movies={showsByGenre[genre.endpoint] || []}
          type="shows"
        />
      ))}
    </div>
  );
}
