import { useState, useRef } from 'react'
import type { Movie, Director } from '../../types/movie'
import styles from './MovieForm.module.scss'

interface MovieFormProps {
  onSubmit: (movie: Omit<Movie, 'id'>) => Promise<Movie>
  directors: Director[]
  loading: boolean
}

export function MovieForm({ onSubmit, directors, loading }: MovieFormProps) {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [director, setDirector] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const directorInputRef = useRef<HTMLInputElement>(null)

  const filteredDirectors = director
    ? directors.filter(d => d.toLowerCase().includes(director.toLowerCase()))
    : directors

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !year || !director) return

    setIsSubmitting(true)
    await onSubmit({
      name,
      year: parseInt(year, 10),
      director,
    })
    setName('')
    setYear('')
    setDirector('')
    setIsSubmitting(false)
  }

  function handleDirectorFocus() {
    setShowSuggestions(true)
  }

  function handleDirectorBlur() {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 150)
  }

  function handleSuggestionClick(suggestion: string) {
    setDirector(suggestion)
    setShowSuggestions(false)
    directorInputRef.current?.blur()
  }

  const isDisabled = loading || isSubmitting

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-testid="movie-form">
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Movie name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isDisabled}
          data-testid="input-name"
        />
      </div>

      <div className={styles.field}>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
          disabled={isDisabled}
          min="1888"
          max="2099"
          data-testid="input-year"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.autocomplete}>
          <input
            ref={directorInputRef}
            type="text"
            placeholder="Director"
            value={director}
            onChange={e => setDirector(e.target.value)}
            onFocus={handleDirectorFocus}
            onBlur={handleDirectorBlur}
            disabled={isDisabled}
            data-testid="input-director"
          />
          {showSuggestions && filteredDirectors.length > 0 && (
            <ul className={styles.suggestions} data-testid="director-suggestions">
              {filteredDirectors.map(d => (
                <li
                  key={d}
                  onClick={() => handleSuggestionClick(d)}
                  data-testid="suggestion-item"
                >
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button type="submit" disabled={isDisabled} data-testid="submit-btn">
        {isSubmitting ? 'Adding...' : 'Add Movie'}
      </button>
    </form>
  )
}
