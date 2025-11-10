export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-bite-gray-900 mb-6">
        Tableau de bord Administrateur
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            CA Total
          </h3>
          <p className="text-4xl font-bold text-green-600">0,00 €</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Commandes
          </h3>
          <p className="text-4xl font-bold text-bite-primary">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Restaurants actifs
          </h3>
          <p className="text-4xl font-bold text-bite-light">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Utilisateurs
          </h3>
          <p className="text-4xl font-bold text-bite-gray-700">0</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h2 className="text-xl font-bold text-bite-gray-900 mb-4">Alertes</h2>
          <div className="text-center py-8 text-bite-gray-500 text-sm">
            Aucune alerte
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h2 className="text-xl font-bold text-bite-gray-900 mb-4">Performance par zone</h2>
          <div className="text-center py-8 text-bite-gray-500 text-sm">
            Aucune donnée disponible
          </div>
        </div>
      </div>
    </div>
  );
}

