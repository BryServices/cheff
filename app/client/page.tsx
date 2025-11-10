import Link from "next/link";

export default function ClientHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      {/* En-tête avec localisation */}
      <div className="mb-4 md:mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-2">
            Bienvenue sur Bite
          </h1>
          <div className="flex items-center text-bite-text-light font-body">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Localisation</span>
          </div>
        </div>
      </div>

      {/* Bannière promotionnelle style Bite avec dégradé orange-jaune */}
      <div className="mb-4 md:mb-6 relative overflow-hidden rounded-2xl h-40 md:h-48 bg-bite-gradient shadow-bite-lg">
        <div className="absolute inset-0 bg-bite-pattern opacity-20"></div>
        <div className="relative h-full flex items-center justify-between px-4 md:px-8">
          <div>
            <div className="inline-block bg-bite-accent text-bite-dark px-4 py-1 rounded-full text-sm font-bold mb-2 shadow-bite">
              50% OFF
            </div>
            <h2 className="text-3xl md:text-4xl font-heading text-bite-dark mb-1">50%</h2>
            <p className="text-bite-text-dark text-base md:text-lg font-body font-medium">de réduction</p>
            <p className="text-bite-text-light text-sm md:text-base font-body">sur votre première commande</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4 md:mb-6">
        <div className="flex gap-2 md:gap-3">
          <input
            type="text"
            placeholder="Rechercher un restaurant ou un plat..."
            className="flex-1 px-4 md:px-5 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
          />
          <button className="px-6 md:px-8 py-3 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite">
            Rechercher
          </button>
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-4 md:mb-6 overflow-x-auto">
        <div className="flex gap-2 md:gap-3 pb-2">
          {['Tous', 'Burgers', 'Pizza', 'Sushi', 'Italien', 'Asiatique'].map((cat, idx) => (
            <button
              key={cat}
              className={`px-4 md:px-6 py-2 rounded-full font-body font-medium whitespace-nowrap transition ${
                idx === 0
                  ? 'bg-bite-primary text-white shadow-bite'
                  : 'bg-white text-bite-text-dark hover:bg-bite-gray-light border border-bite-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des restaurants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link
            key={i}
            href={`/client/restaurant/${i}`}
            className="bg-white rounded-2xl shadow-bite hover:shadow-bite-lg transition-all transform hover:-translate-y-1 overflow-hidden border border-bite-gray-200"
          >
            <div className="h-40 md:h-48 bg-gradient-to-br from-bite-gray-200 to-bite-gray-300 relative">
              <div className="absolute top-3 right-3 bg-bite-accent text-bite-dark px-3 py-1 rounded-full text-xs md:text-sm font-heading font-bold shadow-bite">
                50% OFF
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-heading text-bite-text-dark mb-1">Restaurant {i}</h3>
              <p className="text-bite-text-light mb-3 text-sm font-body">Type de cuisine • Quartier</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-bite-accent text-base md:text-lg">★★★★☆</span>
                  <span className="text-bite-text-light text-xs md:text-sm ml-2 font-body">4.5</span>
                </div>
                <span className="text-bite-text-dark font-body font-medium">€€</span>
              </div>
              <button className="w-full bg-bite-primary text-white py-2.5 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite">
                Voir le menu
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

