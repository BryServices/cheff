'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { RestaurantFilters } from '../types/restaurant';
import { filterRestaurants } from '../utils/filterRestaurants';
import { cuisineTypes } from '../data/restaurants';

export default function ClientHome() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Filtrer les restaurants promus pour la page d'accueil
  const featuredRestaurants = useMemo(() => {
    let filtered = restaurants.filter((r) => r.isPromoted || r.rating >= 4.5);
    
    // Appliquer la recherche si présente
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.dishes?.some((dish) => dish.toLowerCase().includes(query))
      );
    }

    // Appliquer le filtre de cuisine si présent
    if (selectedCuisine && selectedCuisine !== 'Tous') {
      filtered = filtered.filter((r) => r.cuisineType === selectedCuisine);
    }

    return filtered.slice(0, 6); // Limiter à 6 restaurants sur la page d'accueil
  }, [searchQuery, selectedCuisine]);

  const handleSearch = () => {
    if (searchQuery || selectedCuisine) {
      const filters: RestaurantFilters = {
        searchQuery,
        cuisineType: selectedCuisine === 'Tous' ? '' : selectedCuisine,
        department: '',
        district: '',
        minRating: 0,
        priceRange: '',
      };
      // Rediriger vers la page restaurants avec les filtres
      router.push('/client/restaurants');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      {/* En-tête avec localisation */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-2">
            Bienvenue sur Bite
          </h1>
          <div className="flex items-center text-bite-text-light font-body">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Paris, France</span>
          </div>
        </div>
      </div>

      {/* Bannière promotionnelle style Bite avec dégradé orange-jaune */}
      <div className="mb-4 md:mb-6 relative overflow-hidden rounded-2xl h-40 md:h-48 bg-bite-gradient shadow-bite-lg">
        <div className="absolute inset-0 bg-bite-pattern opacity-20"></div>
        <div className="relative h-full flex items-center justify-between px-4 md:px-8">
          <div>
            <div className="inline-block bg-bite-accent text-bite-dark px-4 py-1 rounded-full text-sm font-bold mb-2 shadow-bite">
              50% OFF
            </div>
            <h2 className="text-3xl md:text-4xl font-heading text-bite-dark mb-1">50%</h2>
            <p className="text-bite-text-dark text-base md:text-lg font-body font-medium">de réduction</p>
            <p className="text-bite-text-light text-sm md:text-base font-body">sur votre première commande</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4 md:mb-6">
        <div className="flex gap-2 md:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher un restaurant ou un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
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
            onClick={handleSearch}
            className="px-6 md:px-8 py-3 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-4 md:mb-6 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 pb-2">
          {cuisineTypes.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCuisine(cat);
                if (cat !== 'Tous') {
                  router.push('/client/restaurants');
                }
              }}
              className={`px-4 md:px-6 py-2 rounded-full font-body font-medium whitespace-nowrap transition ${
                selectedCuisine === cat || (cat === 'Tous' && !selectedCuisine)
                  ? 'bg-bite-primary text-white shadow-bite'
                  : 'bg-white text-bite-text-dark hover:bg-bite-gray-light border border-bite-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des restaurants */}
      {featuredRestaurants.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark">
              Restaurants populaires
            </h2>
            <a
              href="/client/restaurants"
              className="text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
            >
              Voir tout →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </>
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
          <p className="text-bite-text-light text-sm font-body mb-4">
            Essayez de modifier vos critères de recherche
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('');
            }}
            className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}

