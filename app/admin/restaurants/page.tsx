export default function AdminRestaurantsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Gestion des Restaurants
        </h1>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
          + Ajouter un restaurant
        </button>
      </div>
      
      {/* Filtres */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Tous les statuts</option>
          <option>Validé</option>
          <option>En attente</option>
          <option>Suspendu</option>
        </select>
      </div>
      
      {/* Liste des restaurants */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Propriétaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Lignes de restaurants */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

