import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <span className="loading loading-bars loading-xl"></span>;
  if (!movie) return <p>Movie not found</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="w-full max-w-4xl px-4">
      <Link to="/" className="btn btn-ghost mb-6">← Back</Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img src={imageUrl} alt={movie.title} className="rounded-lg w-64" />

        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2">⭐ {movie.vote_average.toFixed(1)}</p>
          <p className="mb-2">📅 {movie.release_date}</p>
          <p className="mb-4">{movie.overview}</p>
          <button className="btn btn-primary">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;