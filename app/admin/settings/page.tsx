export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Configuration de la Plateforme
      </h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Taxes et TVA</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taux de TVA (%)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="18"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Paramètres RGPD</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Activer le consentement cookies</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Activer le droit à l'oubli</span>
            </label>
          </div>
        </div>
        
        <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
          Enregistrer les paramètres
        </button>
      </div>
    </div>
  );
}

