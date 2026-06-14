import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import type{ Movie } from '../../types/movie';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation to details page
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Poster%3C/text%3E%3C/svg%3E';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link to={`/movie/${movie.id}`} className="group block relative">
      <div className=" rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/20">
        <div className="relative aspect-[2/3]">
          <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute top-2 right-2 bg-black/80 rounded-full px-2 py-1 text-xs text-white font-bold flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-2 left-2 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition"
          >
           
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-blue-500 transition">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">{year}</p>
        </div>
      </div>
    </Link>
  );
}