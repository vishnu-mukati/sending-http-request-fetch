import React, { useState } from "react";
import MovieList from "./components/MovieList";

function App() {

  const [Movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
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
    setIsLoading(false);
    

  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&<MovieList movies={Movies} />}
        {!isLoading && Movies.length===0 && <p>Movies not found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
