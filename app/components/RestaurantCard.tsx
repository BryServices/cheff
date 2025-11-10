import Link from 'next/link';
import { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const priceDisplay = '€'.repeat(restaurant.priceRange);
  
  return (
    <Link
      href={`/client/restaurant/${restaurant.id}`}
      className="bg-white rounded-2xl shadow-bite hover:shadow-bite-lg transition-all transform hover:-translate-y-1 overflow-hidden border border-bite-gray-200"
    >
      <div className="h-40 md:h-48 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 relative">
        {restaurant.isPromoted && restaurant.promotion && (
          <div className="absolute top-3 right-3 bg-bite-accent text-bite-dark px-3 py-1 rounded-full text-xs md:text-sm font-heading font-bold shadow-bite">
            {restaurant.promotion}% OFF
          </div>
        )}
        {restaurant.rating >= 4.5 && (
          <div className="absolute top-3 left-3 bg-bite-primary text-white px-2 py-1 rounded-full text-xs font-heading font-bold">
            ⭐ Top
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-heading text-bite-text-dark mb-1">
          {restaurant.name}
        </h3>
        <p className="text-bite-text-light mb-2 text-sm font-body">
          {restaurant.cuisineType} • {restaurant.address.district}
        </p>
        <p className="text-bite-text-light mb-3 text-xs font-body">
          {restaurant.address.street}, {restaurant.address.department}
        </p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-bite-accent text-base md:text-lg">
              {'★'.repeat(Math.floor(restaurant.rating))}
              {'☆'.repeat(5 - Math.floor(restaurant.rating))}
            </span>
            <span className="text-bite-text-light text-xs md:text-sm ml-2 font-body">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bite-text-dark font-body font-medium">{priceDisplay}</span>
            <span className="text-bite-text-light text-xs font-body">•</span>
            <span className="text-bite-text-light text-xs font-body">{restaurant.deliveryTime}</span>
          </div>
        </div>
        <div className="w-full bg-bite-primary text-white py-2.5 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite text-center">
          Voir le menu
        </div>
      </div>
    </Link>
  );
}

