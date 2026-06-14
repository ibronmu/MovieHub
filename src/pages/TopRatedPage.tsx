import { useTopRated } from "../hooks/useMovies";
import MovieCard from "../components/ui/MovieCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import type { Movie } from "../types/movie";

export default function TopRatedPage() {
  const { data, isLoading, error, refetch } = useTopRated(1);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load top rated movies" onRetry={refetch} />;
  if (!data?.results?.length) return <EmptyState message="No top rated movies found" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-3">Top Rated Movies</h1>
        <p className="text-gray-400 mt-2">The highest rated movies of all time, according to TMDB.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}