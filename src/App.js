import React, { useEffect, useState ,useMemo, useCallback} from "react";
import MovieList from "./components/MovieList";

function App() {

  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry , setRetry] = useState(true);

  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async() =>{

  
    setIsLoading(true);
    setError(null);
    setRetry(false);

    
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      
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
  }, []);
  useEffect(()=>{
      fetchMoviesHandler();
  },[]);

  const content = useMemo(() => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (Movies.length > 0) return <MovieList movies={Movies} />;
    return <p>Found No Movies.</p>;
  }, [isLoading, error, Movies]);

  const cancleButtonHandler = () =>{
    setError(null);
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
