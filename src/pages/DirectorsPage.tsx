import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, User } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { LoadingCard } from '../components/ui/Loading'
import { Pagination } from '../components/ui/Pagination'
import { useDirectors } from '../hooks/useQueries'

export function DirectorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useDirectors({ 
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
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading directors</h3>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    )
  }

  const totalPages = data ? Math.ceil(data.count / 10) : 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Directors</h1>
        <p className="text-gray-600">
          Explore the visionary directors behind great movies
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search directors..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Directors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : data?.results.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No directors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.results.map((director) => (
              <Link key={director.id} to={`/directors/${director.id}`}>
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    {director.image_url ? (
                      <img
                        src={director.image_url}
                        alt={director.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-10 w-10 text-purple-600" />
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-lg mb-2">{director.name}</h3>
                    
                    {director.nationality && (
                      <p className="text-gray-600 text-sm mb-2">{director.nationality}</p>
                    )}
                    
                    <p className="text-gray-500 text-sm">
                      {director.movies_count} movie{director.movies_count !== 1 ? 's' : ''}
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
