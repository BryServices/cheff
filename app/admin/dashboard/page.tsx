export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Tableau de bord Administrateur
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            CA Total
          </h3>
          <p className="text-4xl font-price text-green-600">0 FCFA</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Commandes
          </h3>
          <p className="text-4xl font-heading text-bite-primary">0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Restaurants actifs
          </h3>
          <p className="text-4xl font-heading text-bite-light">0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Utilisateurs
          </h3>
          <p className="text-4xl font-heading text-bite-text-dark">0</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">Alertes</h2>
          <div className="text-center py-8 text-bite-text-light text-sm font-body">
            Aucune alerte
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">Performance par zone</h2>
          <div className="text-center py-8 text-bite-text-light text-sm font-body">
            Aucune donnée disponible
          </div>
        </div>
      </div>
    </div>
  );
}

