import React, { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { useGenres } from '../../hooks/useQueries'
import type { MovieFilters } from '../../types'

interface MovieFiltersProps {
  filters: MovieFilters
  onFiltersChange: (filters: MovieFilters) => void
}

export function MovieFiltersComponent({ filters, onFiltersChange }: MovieFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const { data: genresData } = useGenres()

  const handleFilterChange = (key: keyof MovieFilters, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
    setShowAdvanced(false)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search movies..."
              value={filters.title || ''}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showAdvanced ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Director
                </label>
                <Input
                  placeholder="Director name..."
                  value={filters.director || ''}
                  onChange={(e) => handleFilterChange('director', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actor
                </label>
                <Input
                  placeholder="Actor name..."
                  value={filters.actor || ''}
                  onChange={(e) => handleFilterChange('actor', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <select
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={filters.genre || ''}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                >
                  <option value="">All Genres</option>
                  {genresData?.results.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Release Year (From)
                </label>
                <Input
                  type="number"
                  placeholder="1900"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={filters.release_year_gte || ''}
                  onChange={(e) => handleFilterChange('release_year_gte', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Release Year (To)
                </label>
                <Input
                  type="number"
                  placeholder={new Date().getFullYear().toString()}
                  min="1900"
                  max={new Date().getFullYear()}
                  value={filters.release_year_lte || ''}
                  onChange={(e) => handleFilterChange('release_year_lte', e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.rating_gte || ''}
                  onChange={(e) => handleFilterChange('rating_gte', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
