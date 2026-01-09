import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const data = await response.json();
        if (data.results) setMovies(data.results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen w-full px-5 py-24 relative z-10">
      <header className="text-5xl font-bold my-6 mb-12">
        <h1>🎬 Film App</h1>
      </header>

      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <>
              <Search />
              <section className="w-full max-w-6xl px-4 my-12">
                {loading ? (
                  <span className="loading loading-bars loading-xl"></span>
                ) : (
                  <MovieList movies={movies} />
                )}
              </section>
            </>
          }
        />

        {/* Movie detail route */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

      <footer className="mt-auto py-4">
        <p>Made with React + TMDB API</p>
      </footer>
    </main>
  );
};

export default App;