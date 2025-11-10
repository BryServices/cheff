export default function RestoMenuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Gestion du Menu
        </h1>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
          + Ajouter un plat
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Liste des catégories et plats */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Entrées</h2>
            {/* Plats */}
          </div>
        </div>
      </div>
    </div>
  );
}

