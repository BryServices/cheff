import { Restaurant, RestaurantFilters } from '../types/restaurant';

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: RestaurantFilters
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    // Recherche par mot-clé (nom de restaurant ou plat)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = restaurant.name.toLowerCase().includes(query);
      const matchesDish = restaurant.dishes?.some((dish) =>
        dish.toLowerCase().includes(query)
      );
      if (!matchesName && !matchesDish) {
        return false;
      }
    }

    // Filtre par type de cuisine
    if (filters.cuisineType && restaurant.cuisineType !== filters.cuisineType) {
      return false;
    }

    // Filtre par département
    if (filters.department && restaurant.address.department !== filters.department) {
      return false;
    }

    // Filtre par quartier
    if (filters.district && restaurant.address.district !== filters.district) {
      return false;
    }

    // Filtre par note minimum
    if (filters.minRating > 0 && restaurant.rating < filters.minRating) {
      return false;
    }

    // Filtre par prix
    if (filters.priceRange) {
      const priceMap: { [key: string]: number } = {
        'F': 1,
        'FF': 2,
        'FFF': 3,
      };
      if (restaurant.priceRange !== priceMap[filters.priceRange]) {
        return false;
      }
    }

    return true;
  });
}

