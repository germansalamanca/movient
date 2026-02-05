import { useState, useEffect } from 'react'
import type { Movie } from '../types/movie'
import initialMovies from '../data/movies.json'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovies()
  }, [])

  async function loadMovies() {
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    setMovies(initialMovies)
    setLoading(false)
  }

  async function addMovie(movie: Omit<Movie, 'id'>) {
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const newMovie: Movie = {
      ...movie,
      id: crypto.randomUUID(),
    }
    setMovies(prev => [...prev, newMovie])
    setLoading(false)
    return newMovie
  }

  return { movies, loading, addMovie }
}
