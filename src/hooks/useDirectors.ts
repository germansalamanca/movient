import { useMemo } from 'react'
import type { Movie, Director } from '../types/movie'

export function useDirectors(movies: Movie[]): Director[] {
  return useMemo(() => {
    const directors = movies.map(movie => movie.director)
    return [...new Set(directors)].sort()
  }, [movies])
}
