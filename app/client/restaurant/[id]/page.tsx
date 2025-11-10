export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      {/* En-tête du restaurant */}
      <div className="mb-4 md:mb-6">
        <div className="h-48 md:h-64 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 rounded-2xl mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-heading mb-2">Restaurant {params.id}</h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base">
              <span className="flex items-center">
                <span className="text-bite-accent text-lg md:text-xl">★★★★☆</span>
                <span className="ml-2 font-body">4.5</span>
              </span>
              <span>•</span>
              <span className="font-body">€€</span>
              <span>•</span>
              <span className="font-body">30-45 min</span>
            </div>
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
      
      {/* Catégories de plats */}
      <div className="space-y-6 md:space-y-8">
        <section>
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-4">Entrées</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Exemple de plat */}
            <div className="bg-white rounded-2xl shadow-bite overflow-hidden border border-bite-gray-200 hover:shadow-bite-lg transition">
              <div className="h-40 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 relative">
                <div className="absolute top-2 right-2 bg-bite-accent text-bite-dark px-2 py-1 rounded-full text-xs font-heading font-bold shadow-bite">
                  50% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-bite-text-dark mb-2">Nom du plat</h3>
                <p className="text-bite-text-light text-sm mb-3 font-body">Description du plat</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-price text-bite-primary">15,00 €</span>
                  <button className="bg-bite-primary text-white px-4 py-2 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-4">Plats principaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Plats */}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-4">Desserts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Plats */}
          </div>
        </section>
      </div>
    </div>
  );
}

