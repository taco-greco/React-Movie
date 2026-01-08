import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-base-200">
      <header className="text-5xl font-bold my-6 mb-12">
        <h1>🎬 Movie App</h1>
      </header>

      {/* Search */}
      <Search />

      {/* Movies Section */}
      <section className="w-full max-w-6xl px-4 my-8">
        <h2 className="text-3xl font-semibold my-6">All Movies</h2>

        {loading ? (
          <span className="loading loading-bars loading-xl"></span>
        ) : (
          <ul className="space-y-2">
            {movies.map((movie) => (
              <li key={movie.id} className="p-2 bg-base-100 rounded shadow">
                {movie.title} - ⭐ {movie.vote_average.toFixed(1)}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto py-4">
        <p>Made with React + TMDB API</p>
      </footer>
    </main>
  );
};

export default App;
