import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          🍽️ Chef
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plateforme de livraison de repas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <Link 
            href="/client"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-200 hover:border-orange-400"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              👤 Client
            </h2>
            <p className="text-gray-600">
              Recherchez des restaurants, commandez et suivez vos commandes
            </p>
          </Link>

          <Link 
            href="/resto"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-200 hover:border-orange-400"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              🏪 Restaurateur
            </h2>
            <p className="text-gray-600">
              Gérez votre menu, vos commandes et vos statistiques
            </p>
          </Link>

          <Link 
            href="/admin"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-200 hover:border-orange-400"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              ⚙️ Administrateur
            </h2>
            <p className="text-gray-600">
              Administration globale de la plateforme
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

