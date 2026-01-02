import { useState, useEffect } from 'react'
import type { FavoriteMovie } from '../types'

const FAVORITES_KEY = 'movie-explorer-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
      }
    }
  }, [])

  const addToFavorites = (movie: FavoriteMovie) => {
    const newFavorites = [...favorites, movie]
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (movieId: number) => {
    const newFavorites = favorites.filter(movie => movie.id !== movieId)
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const toggleFavorite = (movie: FavoriteMovie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  }
}
