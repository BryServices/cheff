export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Mes Commandes
      </h1>
      
      <div className="space-y-4">
        {/* Liste des commandes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">Commande #12345</h3>
              <p className="text-gray-600">Restaurant XYZ</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Livrée
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">15/06/2024</span>
            <span className="font-semibold">25 000 FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

