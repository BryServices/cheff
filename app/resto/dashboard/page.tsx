export default function RestoDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Tableau de bord
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Commandes aujourd&apos;hui
          </h3>
          <p className="text-4xl font-heading text-bite-primary">0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Chiffre d&apos;affaires
          </h3>
          <p className="text-4xl font-price text-green-600">0 FCFA</p>
        </div>
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h3 className="text-sm font-body font-medium text-bite-text-light mb-2 uppercase tracking-wide">
            Commandes en attente
          </h3>
          <p className="text-4xl font-heading text-bite-light">0</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
        <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-4">Commandes récentes</h2>
        <div className="text-center py-12 text-bite-text-light font-body">
          Aucune commande récente
        </div>
      </div>
    </div>
  );
}

