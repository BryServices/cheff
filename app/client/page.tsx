import Link from "next/link";

export default function ClientHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur Chef
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez les meilleurs restaurants près de chez vous
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher un restaurant ou un plat..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
            Rechercher
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Tous les types de cuisine</option>
          <option>Français</option>
          <option>Italien</option>
          <option>Asiatique</option>
          <option>Africain</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Tous les départements</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Toutes les notes</option>
          <option>5 étoiles</option>
          <option>4+ étoiles</option>
          <option>3+ étoiles</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>Tous les prix</option>
          <option>€</option>
          <option>€€</option>
          <option>€€€</option>
        </select>
      </div>

      {/* Liste des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link
            key={i}
            href={`/client/restaurant/${i}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Restaurant {i}</h3>
              <p className="text-gray-600 mb-2">Type de cuisine • Quartier</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-700">€€</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

