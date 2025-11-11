'use client';

import { useState, useMemo } from 'react';
import RestaurantCard from '@/app/components/RestaurantCard';
import RestaurantFiltersComponent from '@/app/components/RestaurantFilters';
import { restaurants } from '@/app/data/restaurants';
import { RestaurantFilters } from '@/app/types/restaurant';
import { filterRestaurants } from '@/app/utils/filterRestaurants';

export default function RestaurantsPage() {
  const [filters, setFilters] = useState<RestaurantFilters>({
    searchQuery: '',
    cuisineType: '',
    department: '',
    district: '',
    minRating: 0,
    priceRange: '',
  });

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(restaurants, filters);
  }, [filters]);

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Tous les restaurants
      </h1>

      {/* Composant de recherche et filtres */}
      <RestaurantFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onSearchChange={handleSearchChange}
      />

      {/* Résultats */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-bite-text-light font-body">
          {filteredRestaurants.length} restaurant{filteredRestaurants.length > 1 ? 's' : ''} trouvé{filteredRestaurants.length > 1 ? 's' : ''}
        </p>
        {filters.searchQuery || filters.cuisineType || filters.department || filters.district || filters.minRating > 0 || filters.priceRange ? (
          <button
            onClick={() => {
              setFilters({
                searchQuery: '',
                cuisineType: '',
                department: '',
                district: '',
                minRating: 0,
                priceRange: '',
              });
            }}
            className="text-sm text-bite-primary hover:text-bite-dark transition font-body font-medium"
          >
            Effacer tous les filtres
          </button>
        ) : null}
      </div>

      {/* Liste des restaurants */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <svg
            className="w-16 h-16 mx-auto text-bite-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-bite-text-dark text-lg font-body mb-2">
            Aucun restaurant trouvé
          </p>
          <p className="text-bite-text-light text-sm font-body">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
}

