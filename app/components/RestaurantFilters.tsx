'use client';

import { useState } from 'react';
import { RestaurantFilters } from '../types/restaurant';
import { departments, districts, cuisineTypes, priceRanges } from '../data/restaurants';

interface RestaurantFiltersProps {
  filters: RestaurantFilters;
  onFiltersChange: (filters: RestaurantFilters) => void;
  onSearchChange: (query: string) => void;
}

export default function RestaurantFiltersComponent({
  filters,
  onFiltersChange,
  onSearchChange,
}: RestaurantFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof RestaurantFilters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="mb-4 md:mb-6">
      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="flex gap-2 md:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un restaurant ou un plat..."
              value={filters.searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                handleFilterChange('searchQuery', e.target.value);
              }}
              className="w-full px-4 md:px-5 py-3 pl-12 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bite-text-light"
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
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 md:px-6 py-3 bg-white border-2 border-bite-gray-300 rounded-xl hover:bg-bite-gray-light transition font-body font-medium text-bite-text-dark flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="hidden md:inline">Filtres</span>
          </button>
        </div>
      </div>

      {/* Catégories rapides */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 pb-2">
          {cuisineTypes.filter(type => 
            type === 'Tous' || 
            type === 'Congolais' || 
            type === 'Burgers' || 
            type === 'Pizza' || 
            type === 'Sushi' || 
            type === 'Asiatique'
          ).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange('cuisineType', type === 'Tous' ? '' : type)}
              className={`px-4 md:px-6 py-2 rounded-full font-body font-medium whitespace-nowrap transition ${
                filters.cuisineType === type || (type === 'Tous' && !filters.cuisineType)
                  ? 'bg-bite-primary text-white shadow-bite'
                  : 'bg-white text-bite-text-dark hover:bg-bite-gray-light border border-bite-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres avancés */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-bite p-4 md:p-6 border border-bite-gray-200 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-heading text-bite-text-dark">Filtres avancés</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-bite-text-light hover:text-bite-primary transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type de cuisine */}
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Type de cuisine
              </label>
              <select
                value={filters.cuisineType || 'Tous'}
                onChange={(e) => handleFilterChange('cuisineType', e.target.value === 'Tous' ? '' : e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              >
                {cuisineTypes.map((type) => (
                  <option key={type} value={type === 'Tous' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Département */}
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Département
              </label>
              <select
                value={filters.department || 'Tous'}
                onChange={(e) => handleFilterChange('department', e.target.value === 'Tous' ? '' : e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept === 'Tous' ? '' : dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Quartier */}
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Quartier
              </label>
              <select
                value={filters.district || 'Tous'}
                onChange={(e) => handleFilterChange('district', e.target.value === 'Tous' ? '' : e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              >
                {districts.map((district) => (
                  <option key={district} value={district === 'Tous' ? '' : district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix */}
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Prix
              </label>
              <select
                value={filters.priceRange || 'Tous'}
                onChange={(e) => handleFilterChange('priceRange', e.target.value === 'Tous' ? '' : e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              >
                {priceRanges.map((price) => (
                  <option key={price} value={price === 'Tous' ? '' : price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Note minimum */}
          <div className="mt-4">
            <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
              Note minimum : {filters.minRating > 0 ? `${filters.minRating}+ ⭐` : 'Toutes'}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
              className="w-full h-2 bg-bite-gray-300 rounded-lg appearance-none cursor-pointer accent-bite-primary"
            />
            <div className="flex justify-between text-xs text-bite-text-light mt-1">
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          {/* Réinitialiser les filtres */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                onFiltersChange({
                  searchQuery: '',
                  cuisineType: '',
                  department: '',
                  district: '',
                  minRating: 0,
                  priceRange: '',
                });
                onSearchChange('');
              }}
              className="px-4 py-2 text-bite-primary hover:text-bite-dark transition font-body font-medium"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

