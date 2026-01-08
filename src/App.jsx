import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import MovieList from "./components/MovieList";

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
    <div className="min-h-screen w-full relative bg-black">
      {/* Violet Storm Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
        }}
      />
      <main className="flex flex-col items-center min-h-screen w-full px-5 py-24 relative z-10">
        <header className="text-5xl font-bold my-6 mb-12">
          <h1>🎬 Film App</h1>
        </header>

      <Search />

      <section className="w-full max-w-6xl px-4 my-8">
        <h2 className="text-3xl font-semibold my-6">Films</h2>

        {loading ? (
          <span className="loading loading-bars loading-xl"></span>
        ) : (
         <MovieList movies={movies} />
        )}
      </section>

      <footer className="mt-auto py-4">
        <p>Made with React + TMDB API</p>
      </footer>
      </main>
    </div>
  );
};

export default App;
