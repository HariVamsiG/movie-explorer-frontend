import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useFavorites } from '../hooks/useFavorites'
import { formatYear } from '../utils'

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">💝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
        <p className="text-gray-600 mb-6">
          Start adding movies to your favorites to see them here.
        </p>
        <Link to="/movies">
          <Button>Browse Movies</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
        <p className="text-gray-600">
          You have {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <Card key={movie.id} hover className="group overflow-hidden">
            <div className="relative">
              {movie.poster_url ? (
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-red-600 hover:text-red-700"
                onClick={() => removeFromFavorites(movie.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {movie.title}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Year: {formatYear(movie.release_year)}</p>
                <p>Director: {movie.director_name}</p>
              </div>

              <Link to={`/movies/${movie.id}`}>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
