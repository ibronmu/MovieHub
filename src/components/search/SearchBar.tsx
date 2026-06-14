import { useState, useEffect } from 'react';
import { useSearchMovies } from '../../hooks/useMovies';
import { useDebounce } from '../../hooks/useDebounce';
import MovieCard from '../ui/MovieCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import type { Movie } from '../../types/movie';
import { FilterIcon } from 'lucide-react';

const GENRES = [
  { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' }, { id: 27, name: 'Horror' }, { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' }, { id: 878, name: 'Sci-Fi' }, { id: 53, name: 'Thriller' }
];

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest First' }
];

interface SearchBarProps {
  onSearchResults?: (movies: Movie[]) => void;
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('popularity.desc');

  const debouncedQuery = useDebounce(searchTerm, 500);
  const filters: Record<string, string | number> = {};
  if (genre) filters.with_genres = genre;
  if (year) filters.primary_release_year = year;
  if (rating) filters['vote_average.gte'] = rating;
  if (sort) filters.sort_by = sort;

  const { data, isLoading, error, refetch } = useSearchMovies(debouncedQuery, filters);

  useEffect(() => {
    if (data?.results && onSearchResults) {
      onSearchResults(data.results);
    }
  }, [data, onSearchResults]);

  const clearFilters = () => {
    setGenre('');
    setYear('');
    setRating('');
    setSort('popularity.desc');
  };

  return (
    <div className="mb-8">
      {/* Search input + filter button */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
        <button
          onClick={() => setShowFilters(true)}
          className="px-4 py-2 flex justify-center gap-1 bg-blue-700 dark:bg-gray-800 hover:bg-blue-300 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <FilterIcon color='white' size={20} strokeWidth={2} /> <span className='text-white'>Filters</span>
        </button>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowFilters(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Filter Movies</h3>
            <div className="space-y-4">
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded">
                <option value="">All Genres</option>
                {GENRES.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
              <input type="number" placeholder="Year (e.g., 2024)" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded" />
              <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded">
                <option value="">Any Rating</option>
                <option value="7">7+ ★</option><option value="8">8+ ★</option><option value="9">9+ ★</option>
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded">
                {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={clearFilters} className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Clear</button>
              <button onClick={() => setShowFilters(false)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Search results (only shown when searching) */}
      {debouncedQuery && (
        <div className="mt-6">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message="Search failed" onRetry={refetch} />}
          {data?.results?.length === 0 && <p className="text-center text-gray-500">No movies found.</p>}
          {data?.results && data.results.length > 0 && (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{data.total_results} results</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}