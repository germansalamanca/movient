import { useMovies } from '../hooks/useMovies'
import { useDirectors } from '../hooks/useDirectors'

export function TestDataLayer() {
  const { movies, loading, addMovie } = useMovies()
  const directors = useDirectors(movies)

  async function handleAddMovie() {
    await addMovie({
      name: 'Kill Bill',
      year: 2003,
      director: 'Quentin Tarantino',
    })
  }

  return (
    <div style={{ padding: '2rem', color: '#fff', background: '#1a1a2e', minHeight: '100vh' }}>
      <h1>Data Layer Test</h1>

      {loading && <p data-testid="loading">Loading...</p>}

      <section>
        <h2>Movies ({movies.length})</h2>
        <ul data-testid="movies-list">
          {movies.map(movie => (
            <li key={movie.id} data-testid="movie-item">
              {movie.name} ({movie.year}) - {movie.director}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Directors ({directors.length})</h2>
        <ul data-testid="directors-list">
          {directors.map(director => (
            <li key={director} data-testid="director-item">{director}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleAddMovie} data-testid="add-movie-btn">
        Add Test Movie
      </button>
    </div>
  )
}
