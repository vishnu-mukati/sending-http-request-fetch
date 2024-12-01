import React, { useState } from "react";
import MovieList from "./components/MovieList";

function App() {

  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry , setRetry] = useState(true);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    setRetry(false);

    try {
      const response = await fetch('https://swapi.dev/api/film/')
      
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
      }
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
      setRetry(false);
    } catch (error) {
      setError(error.message);
      if(retry){
        setTimeout(fetchMoviesHandler,5000);
      }
    }
    setIsLoading(false);
  }

  let content = <p>Found No Movies.</p>

  if(Movies.length>0){
    content = <MovieList movies={Movies} />;
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>;
  }

  const cancleButtonHandler = () =>{
    setError(null);
    console.log('hiii');
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
       {error && <button onClick={cancleButtonHandler}>Cancle</button>}
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
