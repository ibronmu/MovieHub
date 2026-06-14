import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useMovieDetails, useSimilarMovies } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import MovieCard from '../components/ui/MovieCard';
import SectionHeader from '../components/ui/SectionHeader';
import type { Movie } from '../types/movie';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0');

  const { data: movie, isLoading, error, refetch } = useMovieDetails(movieId);
  const { data: similar } = useSimilarMovies(movieId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load movie details" onRetry={refetch} />;
  if (!movie) return null;

  const favorited = isFavorite(movie.id);
  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg';
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const budget = movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A';
  const revenue = movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A';

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 mb-4 transition"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Hero Backdrop */}
      {backdropUrl && (
        <div
          className="relative h-64 md:h-96 bg-cover bg-center rounded-xl mb-8"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent rounded-xl"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/4">
          <img src={posterUrl} alt={movie.title} className="rounded-xl shadow-2xl" />
        </div>

        {/* Details */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title} <span className="text-gray-400">({year})</span>
            </h1>
            {/* Favorite Button (prominent, next to title) */}
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                favorited
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Heart size={20} className={favorited ? 'fill-white' : ''} />
              {favorited ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
          {movie.tagline && <p className="text-gray-400 italic mb-4">{movie.tagline}</p>}

          <div className="flex flex-wrap gap-3 mb-4">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="bg-blue-600/20 text-blue-600 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span> {movie.vote_average.toFixed(1)} / 10
            </span>
            <span>⏱️ {runtime}</span>
            <span>📅 {new Date(movie.release_date).toLocaleDateString()}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-100 dark:bg-gray-900/50 p-4 rounded-xl">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Budget:</span> {budget}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Revenue:</span> {revenue}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Status:</span> {movie.status}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Original Language:</span> {movie.original_language?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similar?.results && similar.results.length > 0 && (
        <div className="mt-12">
          <SectionHeader title="Similar Movies" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similar.results.slice(0, 10).map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}