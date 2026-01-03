import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { LoadingCard } from '../components/ui/Loading'
import { Pagination } from '../components/ui/Pagination'
import { useActors } from '../hooks/useQueries'

export function ActorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useActors({ 
    page: currentPage, 
    name: searchTerm || undefined 
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Error loading actors</h3>
        <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
      </div>
    )
  }

  const totalPages = data ? Math.ceil(data.count / 10) : 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Actors</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover talented actors from our movie collection
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search actors..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Actors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : data?.results.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No actors found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.results.map((actor) => (
              <Link key={actor.id} to={`/actors/${actor.id}`}>
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    {actor.image_url ? (
                      <img
                        src={actor.image_url}
                        alt={actor.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{actor.name}</h3>
                    
                    {actor.nationality && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{actor.nationality}</p>
                    )}
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {actor.movies_count} movie{actor.movies_count !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {data && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasNext={!!data.next}
              hasPrevious={!!data.previous}
            />
          )}
        </>
      )}
    </div>
  )
}
