import { useQuery } from "@tanstack/react-query";
import { movieApi } from "../api/movieApi";

export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (type: string, page: number) => [...movieKeys.lists(), type, page] as const,
  details: (id: number) => [...movieKeys.all, "detail", id] as const,
  similar: (id: number) => [...movieKeys.all, "similar", id] as const,
  search: (query: string, filters: any) => [...movieKeys.all, "search", query, filters] as const,
};

export function useNowPlaying(page = 1) {
  return useQuery({
    queryKey: movieKeys.list("now_playing", page),
    queryFn: () => movieApi.getNowPlaying(page),
    select: (data) => data.data,
  });
}

export function usePopular(page = 1) {
  return useQuery({
    queryKey: movieKeys.list("popular", page),
    queryFn: () => movieApi.getPopular(page),
    select: (data) => data.data,
  });
}

export function useTopRated(page = 1) {
  return useQuery({
    queryKey: movieKeys.list("top_rated", page),
    queryFn: () => movieApi.getTopRated(page),
    select: (data) => data.data,
  });
}

export function useUpcoming(page = 1) {
  return useQuery({
    queryKey: movieKeys.list("upcoming", page),
    queryFn: () => movieApi.getUpcoming(page),
    select: (data) => data.data,
  });
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => movieApi.getMovieDetails(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

export function useSimilarMovies(id: number, page = 1) {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => movieApi.getSimilarMovies(id, page),
    select: (data) => data.data,
    enabled: !!id,
  });
}

export function useSearchMovies(query: string, filters: Record<string, any>, page = 1) {
  return useQuery({
    queryKey: movieKeys.search(query, { ...filters, page }),
    queryFn: () => movieApi.searchMovies(query, page, filters),
    select: (data) => data.data,
    enabled: query.length > 0,
  });
}