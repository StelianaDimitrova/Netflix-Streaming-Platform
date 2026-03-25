import { endpoints } from "../../api/endpoints";
import { fetchMovies } from "../../api/movies.api";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import classes from "./Home.module.css";

import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const [
        loadedTrendingMovies,
        loadedPopularMovies,
        loadedTopRatedMovies,
        loadedUpcomingMovies,
      ] = await Promise.all([
        fetchMovies(endpoints.trending),
        fetchMovies(endpoints.popular),
        fetchMovies(endpoints.topRated),
        fetchMovies(endpoints.upcoming),
      ]);

      setTrendingMovies(loadedTrendingMovies);
      setPopularMovies(loadedPopularMovies);
      setTopRatedMovies(loadedTopRatedMovies);
      setUpcomingMovies(loadedUpcomingMovies);
    };

    loadMovies();
  }, []);

  return (
    <main className={classes.homeMain}>
      <HeroBanner movie={popularMovies[3]} />

      <div className={classes.rowSections}>
        <MovieRow rowName="Trending" movies={trendingMovies} />
        <MovieRow rowName="Popular" movies={popularMovies} />
        <MovieRow rowName="Top rated" movies={topRatedMovies} />
        <MovieRow rowName="Upcoming" movies={upcomingMovies} />
      </div>
    </main>
  );
}
