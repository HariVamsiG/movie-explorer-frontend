import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Calendar, Clock } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { useFavorites } from '../../hooks/useFavorites'
import { formatYear, formatDuration, formatRating, truncateText, cn } from '../../utils'
import type { Movie } from '../../types'

interface MovieCardProps {
  movie: Movie
  className?: string
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url,
      release_year: movie.release_year,
      director_name: movie.director_name,
    })
  }

  return (
    <Link to={`/movies/${movie.id}`}>
      <Card hover className={cn('group overflow-hidden', className)}>
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
            className={cn(
              'absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm',
              favorite ? 'text-red-500' : 'text-gray-600'
            )}
            onClick={handleToggleFavorite}
          >
            <Heart className={cn('h-4 w-4', favorite && 'fill-current')} />
          </Button>

          {movie.average_rating && (
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              {formatRating(movie.average_rating)}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatYear(movie.release_year)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">Director:</span>
              <span>{movie.director_name}</span>
            </div>

            {movie.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(movie.duration)}</span>
              </div>
            )}

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
                {movie.genres.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{movie.genres.length - 3}
                  </span>
                )}
              </div>
            )}

            {movie.review_count > 0 && (
              <div className="text-xs text-gray-500 mt-2">
                {movie.review_count} review{movie.review_count !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
