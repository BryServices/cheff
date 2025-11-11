import { Restaurant } from '../types/restaurant';
import { restaurants } from '../data/restaurants';

export function getRestaurantById(id: number): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function getRestaurantsByCuisineType(cuisineType: string): Restaurant[] {
  if (!cuisineType || cuisineType === 'Tous') {
    return restaurants;
  }
  return restaurants.filter((restaurant) => restaurant.cuisineType === cuisineType);
}

