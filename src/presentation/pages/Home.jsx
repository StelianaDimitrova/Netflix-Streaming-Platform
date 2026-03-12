import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import classes from "./Home.module.css";

import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchMovies();
  }, [URL]);

  return (
    <main className={classes.homeMain}>
      <HeroBanner
        banner={`https://image.tmdb.org/t/p/original${movies[0]?.backdrop_path}`}
        title={movies[0]?.title}
        description={movies[0]?.overview}
      />

      <MovieRow rowName="New on Netflix" movies={movies} />
      <MovieRow rowName="Trending" movies={movies} />
      <MovieRow rowName="Recently Watched" movies={movies} />
      <MovieRow rowName="Top Searches" movies={movies} />
      <MovieRow rowName="Award-Winning Tv Shows" movies={movies} />
      <MovieRow rowName="Action Movies" movies={movies} />
    </main>
  );
}
