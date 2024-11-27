import React, { useState } from "react";
import MovieList from "./components/MovieList";

function App() {

  const [Movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    const transformedmovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedmovies);
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={Movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
