export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Mon Panier
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Liste des articles du panier */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Votre panier est vide</p>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Résumé de la commande */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Résumé</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>0,00 €</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>0,00 €</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>0,00 €</span>
              </div>
            </div>
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

