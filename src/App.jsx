import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";
import "./App.css";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Wishlist from "./components/Wishlist";
import { useWishlist } from "./components/WishlistContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const CATEGORIES = [
  { id: "popular", name: "Popular" },
  { id: "top_rated", name: "Top Rated" },
  { id: "now_playing", name: "Now Playing" },
  { id: "upcoming", name: "Upcoming" },
];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { wishlist } = useWishlist();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        let url;
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery, category, page]);

  // Reset page when category or search changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-full px-5 py-24 relative z-10">
      <header className="text-5xl font-bold my-6 mb-12 flex flex-col items-center gap-4">
        <h1>🎬 Film App</h1>
        <Link to="/wishlist" className="btn btn-secondary btn-sm">
          Wishlist ({wishlist.length})
        </Link>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search searchQuery={searchQuery} setSearchQuery={handleSearch} />

              {/* Category Buttons */}
              <div className="flex flex-wrap gap-2 my-6">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`btn btn-sm ${category === cat.id && !searchQuery ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Movies */}
              <section className="w-full max-w-6xl px-4 my-8">
                {loading ? (
                  <span className="loading loading-bars loading-xl"></span>
                ) : (
                  <MovieList movies={movies} />
                )}
              </section>

              {/* Pagination */}
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {page} / {totalPages}
                </button>
                <button
                  className="join-item btn"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  »
                </button>
              </div>
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      <footer className="mt-auto py-4">
        <p>Made with React + TMDB API</p>
      </footer>
    </main>
  );
};

export default App;