import React, { useState } from "react";
import MovieList from "./components/MovieList";


function App() {
  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false); // New state to control retry

  async function fetchMoviesHandler() {
    if (!retry) return; // Stop execution if retry is canceled

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong!');
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
      setIsLoading(false);
      setRetry(false); // Stop retrying once successful
    } catch (error) {
      setError(error.message);
      setIsLoading(false);

      if (retry) {
        console.error(`Error: ${error.message}. Retrying in 5 seconds...`);
        setTimeout(fetchMoviesHandler, 5000); // Retry after 5 seconds
      }
    }
  }

  const startFetchingMovies = () => {
    setRetry(true);
    fetchMoviesHandler();
  };

  const cancelRetryHandler = () => {
    setRetry(false); // Stop retrying
    setError("Retry canceled by user.");
  };

  let content = <p>Found No Movies.</p>;

  if (Movies.length > 0) {
    content = <MovieList movies={Movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={startFetchingMovies} disabled={isLoading || retry}>
          {isLoading ? 'Fetching...' : 'Fetch Movies'}
        </button>
        {retry && (
          <button onClick={cancelRetryHandler} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}


// function App() {

//   const [Movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [retry, setRetry] = useState(false);

//   async function fetchMoviesHandler() {
//     if (!retry) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://swapi.dev/api/film/')
      
//       if (!response.ok) {
//         throw new Error('Something went wrong ....Retrying')
//       }
//       const data = await response.json();

//       const transformedmovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedmovies);
//       setIsLoading(false);
//       setRetry(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
     
//       if (retry) {
//         setTimeout(fetchMoviesHandler, 5000); 
//       }
//     }
//     setIsLoading(false);
//   }

//   const startFetchingMovies = () => {
//     setRetry(true);
//     fetchMoviesHandler();
//   };

//   const cancelRetryHandler = () => {
//     setRetry(false);
//     setError("Retry canceled by user.");
//   };


//   let content = <p>Found No Movies.</p>

//   if(Movies.length>0){
//     content = <MovieList movies={Movies} />;
//   }

//   if(error){
//     content = <p>{error}</p>
//   }

//   if(isLoading){
//     content = <p>Loading...</p>;
//   }

//   return (
//     <React.Fragment>
//       <section>
//       <button onClick={startFetchingMovies} disabled={isLoading || retry}>
//           {isLoading ? 'Fetching...' : 'Fetch Movies'}
//         </button>
//       </section>
//       {retry && (
//           <button onClick={cancelRetryHandler} style={{ marginLeft: "10px" }}>
//             Cancel
//           </button>
//         )}
//       <section>
//        {content}
//       </section>
//     </React.Fragment>
//   );
// }

export default App;
