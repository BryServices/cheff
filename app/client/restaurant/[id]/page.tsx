export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* En-tête du restaurant */}
      <div className="mb-6">
        <div className="h-64 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 rounded-2xl mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">Restaurant {params.id}</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <span className="text-bite-accent text-xl">★★★★☆</span>
                <span className="ml-2">4.5</span>
              </span>
              <span>•</span>
              <span>€€</span>
              <span>•</span>
              <span>30-45 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets de catégories */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-3 border-b border-bite-gray-200">
          {['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons'].map((cat, idx) => (
            <button
              key={cat}
              className={`px-6 py-3 font-medium whitespace-nowrap border-b-2 transition ${
                idx === 0
                  ? 'border-bite-primary text-bite-primary'
                  : 'border-transparent text-bite-gray-600 hover:text-bite-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Catégories de plats */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-bite-gray-900 mb-4">Entrées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Exemple de plat */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-bite-gray-100 hover:shadow-xl transition">
              <div className="h-40 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300"></div>
              <div className="p-4">
                <h3 className="font-bold text-bite-gray-900 mb-2">Nom du plat</h3>
                <p className="text-bite-gray-600 text-sm mb-3">Description du plat</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-bite-primary">15,00 €</span>
                  <button className="bg-bite-primary text-white px-4 py-2 rounded-lg hover:bg-bite-dark transition font-medium">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-bite-gray-900 mb-4">Plats principaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plats */}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-bite-gray-900 mb-4">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plats */}
          </div>
        </section>
      </div>
    </div>
  );
}

