import { useNowPlaying } from '../hooks/useMovies';
import MovieCard from '../components/ui/MovieCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Movie } from '../types/movie';

export default function NowPlayingPage() {
  const { data, isLoading, error, refetch } = useNowPlaying(1);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load now playing movies" onRetry={refetch} />;

  return (
    <div>
      <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3 mb-6">Now Playing in Theaters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}