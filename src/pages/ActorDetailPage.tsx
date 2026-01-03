import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Film } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { LoadingPage } from '../components/ui/Loading'
import { MovieGrid } from '../components/features/MovieGrid'
import { useActor } from '../hooks/useQueries'
import { formatDate } from '../utils'

export function ActorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const actorId = parseInt(id || '0')
  const { data: actor, isLoading, error } = useActor(actorId)

  if (isLoading) return <LoadingPage />

  if (error || !actor) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Actor not found</h3>
        <Link to="/actors">
          <Button>Back to Actors</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back Button */}
      <Link to="/actors" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Actors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actor Profile */}
        <div className="lg:col-span-1">
          <Card className="h-96 overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: actor.image_url 
                  ? `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%), url(${actor.image_url})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <CardContent className="relative h-full p-6 flex flex-col justify-end text-white">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold leading-tight">{actor.name}</h1>
                
                <div className="space-y-3 text-sm">
                  {actor.birth_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>Born {formatDate(actor.birth_date)}</span>
                    </div>
                  )}
                  
                  {actor.nationality && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>{actor.nationality}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Film className="h-4 w-4 text-blue-400" />
                    <span>{actor.movies.length} movie{actor.movies.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actor Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          {actor.biography && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Biography</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{actor.biography}</p>
              </CardContent>
            </Card>
          )}

          {/* Movies */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Movies</h2>
            </CardHeader>
            <CardContent>
              {actor.movies.length > 0 ? (
                <MovieGrid movies={actor.movies} />
              ) : (
                <div className="text-center py-8">
                  <Film className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No movies found for this actor.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
