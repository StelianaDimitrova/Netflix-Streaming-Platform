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
      const loadedTrendingMovies = await fetchMovies(endpoints.trending);
      const loadedPopularMovies = await fetchMovies(endpoints.popular);
      const loadedTopRatedMovies = await fetchMovies(endpoints.topRated);
      const loadedUpcomingMovies = await fetchMovies(endpoints.upcoming);

      setTrendingMovies(loadedTrendingMovies);
      setPopularMovies(loadedPopularMovies);
      setTopRatedMovies(loadedTopRatedMovies);
      setUpcomingMovies(loadedUpcomingMovies);
    };

    loadMovies();
  }, []);

  return (
    <main className={classes.homeMain}>
      <HeroBanner
        banner={`https://image.tmdb.org/t/p/original${popularMovies[0]?.backdrop_path}`}
        title={popularMovies[0]?.title}
        description={popularMovies[0]?.overview}
      />

      <MovieRow rowName="Trending" movies={trendingMovies} />
      <MovieRow rowName="Popular" movies={popularMovies} />
      <MovieRow rowName="Top rated" movies={topRatedMovies} />
      <MovieRow rowName="Upcoming" movies={upcomingMovies} />
    </main>
  );
}
