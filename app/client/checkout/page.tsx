export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Paiement
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Adresse de livraison</h2>
          {/* Formulaire d'adresse */}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Moyen de paiement</h2>
          <div className="space-y-4">
            <button className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500">
              MTN MOBILE MONEY
            </button>
            <button className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500">
              AIRTEL MONEY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

