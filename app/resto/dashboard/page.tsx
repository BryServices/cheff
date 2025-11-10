export default function RestoDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-bite-gray-900 mb-6">
        Tableau de bord
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Commandes aujourd&apos;hui
          </h3>
          <p className="text-4xl font-bold text-bite-primary">0</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Chiffre d&apos;affaires
          </h3>
          <p className="text-4xl font-bold text-green-600">0,00 €</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
          <h3 className="text-sm font-medium text-bite-gray-600 mb-2 uppercase tracking-wide">
            Commandes en attente
          </h3>
          <p className="text-4xl font-bold text-bite-light">0</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100">
        <h2 className="text-2xl font-bold text-bite-gray-900 mb-4">Commandes récentes</h2>
        <div className="text-center py-12 text-bite-gray-500">
          Aucune commande récente
        </div>
      </div>
    </div>
  );
}

