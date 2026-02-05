import { useMovies } from './hooks/useMovies'
import { useDirectors } from './hooks/useDirectors'
import { MovieForm } from './components/MovieForm'
import styles from './App.module.scss'

function App() {
  const { movies, loading, addMovie } = useMovies()
  const directors = useDirectors(movies)

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <header className={styles.header}>
          <h1 className={styles.title}>Movient</h1>
          <p className={styles.subtitle}>Track your favorite movies</p>
        </header>
        <MovieForm onSubmit={addMovie} directors={directors} loading={loading} />
      </section>

      <main className={styles.main}>
        {loading && movies.length === 0 ? (
          <p className={styles.loading} data-testid="loading">Loading...</p>
        ) : (
          <ul className={styles.movieList} data-testid="movies-list">
            {movies.map(movie => (
              <li key={movie.id} className={styles.movieItem} data-testid="movie-item">
                <span className={styles.movieName}>{movie.name}</span>
                <span className={styles.movieMeta}>
                  {movie.year} · {movie.director}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
