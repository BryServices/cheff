export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Menu du Restaurant {params.id}
      </h1>
      
      {/* Catégories de plats */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Entrées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plats */}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Plats principaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plats */}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plats */}
          </div>
        </section>
      </div>
    </div>
  );
}

