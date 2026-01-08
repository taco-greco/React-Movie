const MovieList = ({ movies }) => {
    return (
         <ul className="space-y-2">
            {movies.map((movie) => (
              <li key={movie.id} className="p-2 bg-base-100 rounded shadow">
                {movie.title} - ⭐ {movie.vote_average.toFixed(1)}
              </li>
            ))}
          </ul>
    );
}

export default MovieList;