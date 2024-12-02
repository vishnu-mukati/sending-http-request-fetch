import Movie from "./Movie";

const MovieList = (props) => {
    return (
        <ul>
            {props.movies.map((movie) => {
                return (
                    <li key={movie.id}>
                        <Movie
                          
                            title={movie.title}
                            releaseDate={movie.releaseDate}
                            openingText={movie.openingText}
                        />
                       <button onClick={() => props.onDeleteMovie(movie.id)}>Delete</button>
                    </li>
                );
            })}
        </ul>
    );
}

export default MovieList;
