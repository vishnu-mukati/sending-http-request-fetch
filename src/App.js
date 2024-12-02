import React, { useEffect, useState, useMemo, useCallback } from "react";
import MovieList from "./components/MovieList";
import MoviesForm from "./components/MoviesForm";

function App() {

  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(true);

  // async function fetchMoviesHandler() {
  const fetchMoviesHandler = useCallback(async () => {


    setIsLoading(true);
    setError(null);
    setRetry(false);


    try {
      const response = await fetch('https://react-http-b44c1-default-rtdb.firebaseio.com/movies.json')

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
      }
      const data = await response.json();
      
      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id:key,
          title : data[key].title,
          openingText : data[key].openingText,
          releaseDate : data[key].releaseDate,
        })
      }

      setMovies(loadedMovies);
      setRetry(false);
    } catch (error) {
      setError(error.message);
      if (retry) {
        // setRetry(true);
        // setTimeout(fetchMoviesHandler, 5000);
      }
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function  addMovieHandler(movies){
   const response = await fetch('https://react-http-b44c1-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body: JSON.stringify(movies),
      headers:{
         'Content-Type': 'application/json'
      }
    });
    const data  = await response.json();
  }

  async function deleteMovieHandler(movieId){
    const response = await fetch(`https://react-http-b44c1-default-rtdb.firebaseio.com/movies/${movieId}.json`,{
      method: 'DELETE',
    })
  //   if (!response.ok) {
  //     throw new Error('Could not delete the movie!');
  // }
  setMovies((prevState)=>prevState.filter((movie)=> movie.id !== movieId))
  }

  const content = useMemo(() => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (Movies.length > 0) return <MovieList movies={Movies} onDeleteMovie = {deleteMovieHandler}/>;
    return <p>Found No Movies.</p>;
  }, [isLoading, error, Movies]);

  const cancleButtonHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <section>
        <MoviesForm  onAddMovie = {addMovieHandler}/>
      </section>

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
