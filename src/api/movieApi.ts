import { axiosInstance } from "./axios";
import type {
  MovieResponse,
  MovieDetails,
  CreditsResponse,
  SimilarMoviesResponse,
} from "../types/movie";

export const movieApi = {
  // Home page sections
  getNowPlaying: (page = 1) =>
    axiosInstance.get<MovieResponse>("/movie/now_playing", { params: { page } }),
  getPopular: (page = 1) =>
    axiosInstance.get<MovieResponse>("/movie/popular", { params: { page } }),
  getTopRated: (page = 1) =>
    axiosInstance.get<MovieResponse>("/movie/top_rated", { params: { page } }),
  getUpcoming: (page = 1) =>
    axiosInstance.get<MovieResponse>("/movie/upcoming", { params: { page } }),

  // Search with filters
  searchMovies: (query: string, page = 1, filters?: Record<string, any>) =>
    axiosInstance.get<MovieResponse>("/search/movie", {
      params: { query, page, ...filters },
    }),

  // Movie details
  getMovieDetails: (movieId: number) =>
    axiosInstance.get<MovieDetails>(`/movie/${movieId}`),

  getMovieCredits: (movieId: number) =>
    axiosInstance.get<CreditsResponse>(`/movie/${movieId}/credits`),

  getSimilarMovies: (movieId: number, page = 1) =>
    axiosInstance.get<SimilarMoviesResponse>(`/movie/${movieId}/similar`, {
      params: { page },
    }),

  // Discover (for advanced filters like genre, year, rating)
  discoverMovies: (params: Record<string, any>) =>
    axiosInstance.get<MovieResponse>("/discover/movie", { params }),
};