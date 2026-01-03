import React, { useState } from 'react'
import { MovieGrid } from '../components/features/MovieGrid'
import { MovieFiltersComponent } from '../components/features/MovieFilters'
import { Pagination } from '../components/ui/Pagination'
import { LoadingPage } from '../components/ui/Loading'
import { useMovies } from '../hooks/useQueries'
import type { MovieFilters } from '../types'

export function MoviesPage() {
  const [filters, setFilters] = useState<MovieFilters>({})
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useMovies({ ...filters, page: currentPage })

  const handleFiltersChange = (newFilters: MovieFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Error loading movies</h3>
        <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
      </div>
    )
  }

  const totalPages = data ? Math.ceil(data.count / 10) : 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Movies</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and explore our collection of {data?.count || 0} movies
        </p>
      </div>

      <MovieFiltersComponent 
        filters={filters} 
        onFiltersChange={handleFiltersChange} 
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <MovieGrid movies={data?.results || []} />
          
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
