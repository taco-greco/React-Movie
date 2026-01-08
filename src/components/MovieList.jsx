const MovieList = ({ movies }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image";

        return (
          <div
            key={movie.id}
            className="card bg-base-100 image-full w-64 shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
          >
            <figure>
              <img src={imageUrl} alt={movie.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p>⭐ {movie.vote_average.toFixed(1)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;