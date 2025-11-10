export default function RestoOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Gestion des Commandes
      </h1>
      
      {/* Filtres */}
      <div className="mb-6 flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Tous les statuts</option>
          <option>Reçue</option>
          <option>En préparation</option>
          <option>Prête</option>
          <option>En cours de livraison</option>
          <option>Livrée</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      
      {/* Liste des commandes */}
      <div className="space-y-4">
        {/* Commandes */}
      </div>
    </div>
  );
}

