import Link from "next/link";

export default function ClientHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* En-tête avec localisation */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-bite-gray-900 mb-2">
            Bienvenue sur Bite
          </h1>
          <div className="flex items-center text-bite-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Localisation</span>
          </div>
        </div>
      </div>

      {/* Bannière promotionnelle style Bite */}
      <div className="mb-6 relative overflow-hidden rounded-2xl h-48 bg-gradient-to-r from-bite-accent to-yellow-400">
        <div className="absolute inset-0 bg-bite-pattern opacity-30"></div>
        <div className="relative h-full flex items-center justify-between px-8">
          <div>
            <h2 className="text-4xl font-bold text-bite-primary mb-2">50%</h2>
            <p className="text-bite-gray-900 text-lg font-semibold">de réduction</p>
            <p className="text-bite-gray-700">sur votre première commande</p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Rechercher un restaurant ou un plat..."
            className="flex-1 px-5 py-3 border-2 border-bite-gray-200 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition"
          />
          <button className="px-8 py-3 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-semibold shadow-lg">
            Rechercher
          </button>
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {['Tous', 'Burgers', 'Pizza', 'Sushi', 'Italien', 'Asiatique'].map((cat, idx) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition ${
                idx === 0
                  ? 'bg-bite-primary text-white'
                  : 'bg-white text-bite-gray-700 hover:bg-bite-gray-100 border border-bite-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des restaurants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link
            key={i}
            href={`/client/restaurant/${i}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden border border-bite-gray-100"
          >
            <div className="h-48 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 relative">
              <div className="absolute top-3 right-3 bg-bite-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                Nouveau
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-bite-gray-900 mb-1">Restaurant {i}</h3>
              <p className="text-bite-gray-600 mb-3 text-sm">Type de cuisine • Quartier</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-bite-accent text-lg">★★★★☆</span>
                  <span className="text-bite-gray-600 text-sm ml-2">4.5</span>
                </div>
                <span className="text-bite-gray-700 font-semibold">€€</span>
              </div>
              <button className="mt-3 w-full bg-bite-primary text-white py-2 rounded-lg hover:bg-bite-dark transition font-medium">
                Voir le menu
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

