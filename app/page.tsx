import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bite-dark">
      <div className="text-center space-y-8 p-8 w-full max-w-5xl">
        {/* Logo avec icône */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/icone.png" 
              alt="CHEFF Logo" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
            <h1 className="text-5xl md:text-7xl font-heading text-white tracking-tight">
              CHEFF
            </h1>
          </div>
          <div className="w-24 h-1 bg-white mx-auto opacity-80"></div>
        </div>
        
        <p className="text-2xl text-white mb-12 font-body font-light">
          Plateforme de livraison de repas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/client"
            className="bg-white p-8 rounded-2xl shadow-bite-lg hover:shadow-bite transition-all transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-2xl font-heading text-bite-primary mb-3">
              Client
            </h2>
            <p className="text-bite-gray-text-light font-body">
              Recherchez des restaurants, commandez et suivez vos commandes
            </p>
          </Link>

          <Link 
            href="/resto"
            className="bg-white p-8 rounded-2xl shadow-bite-lg hover:shadow-bite transition-all transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="text-5xl mb-4">🏪</div>
            <h2 className="text-2xl font-heading text-bite-primary mb-3">
              Restaurateur
            </h2>
            <p className="text-bite-gray-text-light font-body">
              Gérez votre menu, vos commandes et vos statistiques
            </p>
          </Link>

          <Link 
            href="/driver"
            className="bg-white p-8 rounded-2xl shadow-bite-lg hover:shadow-bite transition-all transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="text-5xl mb-4">🛵</div>
            <h2 className="text-2xl font-heading text-bite-primary mb-3">
              Livreur
            </h2>
            <p className="text-bite-gray-text-light font-body">
              Recevez des missions, livrez les commandes et confirmez les livraisons
            </p>
          </Link>

          <Link 
            href="/admin"
            className="bg-white p-8 rounded-2xl shadow-bite-lg hover:shadow-bite transition-all transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-2xl font-heading text-bite-primary mb-3">
              Administrateur
            </h2>
            <p className="text-bite-gray-text-light font-body">
              Administration globale de la plateforme
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

