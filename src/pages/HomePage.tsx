import { useState } from 'react';
import { useNowPlaying, usePopular, useTopRated, useUpcoming } from '../hooks/useMovies';
import MovieCard from '../components/ui/MovieCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchBar from '../components/search/SearchBar';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';

function HorizontalMovieRow({ title, viewAllLink, queryHook }: { 
  title: string; viewAllLink: string; queryHook: (page: number) => any;
}) {
  const { data, isLoading, error, refetch } = queryHook(1);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load movies" onRetry={refetch} />;
  if (!data?.results?.length) return null;
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">{title}</h2>
        <Link to={viewAllLink} className="text-blue-400 hover:text-blue-300 text-sm font-semibold">View All →</Link>
      </div>
      {/* Replaced scrollable horizontal row with a standard grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.slice(0, 5).map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const isSearching = searchResults !== null;

  return (
    <div>
      <SearchBar onSearchResults={(movies) => setSearchResults(movies.length ? movies : null)} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Discover Movies</h1>
        <p className="text-gray-600 dark:text-gray-400">Find and explore your next favorite movie.</p>
      </div>

      {isSearching ? (
        <div className="mt-6">
          <button onClick={() => setSearchResults(null)} className="text-red-500 underline mb-4">← Back to home rows</button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {searchResults.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </div>
      ) : (
        <>
          <HorizontalMovieRow title="Now Playing" viewAllLink="/now-playing" queryHook={useNowPlaying} />
          <HorizontalMovieRow title="Popular" viewAllLink="/popular" queryHook={usePopular} />
          <HorizontalMovieRow title="Top Rated" viewAllLink="/top-rated" queryHook={useTopRated} />
          <HorizontalMovieRow title="Upcoming" viewAllLink="/upcoming" queryHook={useUpcoming} />
        </>
      )}
    </div>
  );
}