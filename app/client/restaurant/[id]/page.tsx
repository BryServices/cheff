import { getRestaurantById } from '../../utils/restaurants';
import { notFound } from 'next/navigation';

export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = getRestaurantById(parseInt(params.id));
  
  if (!restaurant) {
    notFound();
  }

  const getPriceDisplay = (range: number) => {
    switch (range) {
      case 1:
        return 'F';
      case 2:
        return 'FF';
      case 3:
        return 'FFF';
      default:
        return 'F';
    }
  };

  const priceDisplay = getPriceDisplay(restaurant.priceRange);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      {/* En-tête du restaurant */}
      <div className="mb-4 md:mb-6">
        <div className="h-48 md:h-64 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 rounded-2xl mb-4 relative overflow-hidden">
          {restaurant.isPromoted && restaurant.promotion && (
            <div className="absolute top-4 right-4 bg-bite-accent text-bite-dark px-4 py-2 rounded-full text-sm font-heading font-bold shadow-bite z-10">
              {restaurant.promotion}% OFF
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-heading mb-2">{restaurant.name}</h1>
            <p className="text-sm md:text-base font-body opacity-90 mb-2">{restaurant.description}</p>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base">
              <span className="flex items-center">
                <span className="text-bite-accent text-lg md:text-xl">
                  {'★'.repeat(Math.floor(restaurant.rating))}
                  {'☆'.repeat(5 - Math.floor(restaurant.rating))}
                </span>
                <span className="ml-2 font-body">{restaurant.rating.toFixed(1)}</span>
              </span>
              <span>•</span>
              <span className="font-body">{priceDisplay}</span>
              <span>•</span>
              <span className="font-body">{restaurant.deliveryTime}</span>
            </div>
            <p className="mt-2 text-xs md:text-sm font-body opacity-80">
              {restaurant.address.street}, {restaurant.address.district}, {restaurant.address.department}
            </p>
          </div>
        </div>
      </div>

      {/* Onglets de catégories */}
      <div className="mb-4 md:mb-6 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 border-b-2 border-bite-gray-200">
          {['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons'].map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 md:px-6 py-3 font-body font-medium whitespace-nowrap border-b-2 transition ${
                idx === 0
                  ? 'border-bite-primary text-bite-primary'
                  : 'border-transparent text-bite-text-light hover:text-bite-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Plats du restaurant */}
      <div className="space-y-6 md:space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-4">
            Nos spécialités
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {restaurant.dishes && restaurant.dishes.length > 0 ? (
              restaurant.dishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-bite overflow-hidden border border-bite-gray-200 hover:shadow-bite-lg transition"
                >
                  <div className="h-40 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 relative">
                    {restaurant.isPromoted && restaurant.promotion && idx === 0 && (
                      <div className="absolute top-2 right-2 bg-bite-accent text-bite-dark px-2 py-1 rounded-full text-xs font-heading font-bold shadow-bite">
                        {restaurant.promotion}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-bite-text-dark mb-2">{dish}</h3>
                    <p className="text-bite-text-light text-sm mb-3 font-body">
                      {restaurant.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-price text-bite-primary">
                        {restaurant.priceRange === 1 ? '5 000' : restaurant.priceRange === 2 ? '10 000' : '15 000'} FCFA
                      </span>
                      <button className="bg-bite-primary text-white px-4 py-2 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite">
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-bite-text-light font-body">
                Aucun plat disponible pour le moment
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
