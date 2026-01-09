import { useState } from "react";
import { Link } from "react-router";
import { useWishlist } from "./WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter wishlist by search
  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl px-4">
      <Link to="/" className="btn btn-ghost mb-6">← Back</Link>

      <h1 className="text-3xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search wishlist..."
        className="input input-bordered w-full mb-6"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredWishlist.length === 0 ? (
        <p>No movies in wishlist</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredWishlist.map((movie) => {
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image";

            return (
              <div key={movie.id} className="card card-side bg-base-100 shadow-md">
                <figure>
                  <img src={imageUrl} alt={movie.title} className="w-24" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{movie.title}</h2>
                  <p>⭐ {movie.vote_average.toFixed(1)}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-ghost">
                      View
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => removeFromWishlist(movie.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;