export default function AdminZonesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Gestion des Zones de Livraison
        </h1>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
          + Ajouter une zone
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Zones configurées</h2>
          {/* Liste des zones */}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Frais de livraison par quartier</h2>
          {/* Configuration des frais */}
        </div>
      </div>
    </div>
  );
}

