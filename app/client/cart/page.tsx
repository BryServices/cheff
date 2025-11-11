export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Mon Panier
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          {/* Liste des articles du panier */}
          <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-bite-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-bite-text-dark text-lg font-body mb-2">Votre panier est vide</p>
              <p className="text-bite-text-light text-sm font-body">Ajoutez des articles pour commencer</p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Résumé de la commande */}
          <div className="bg-white rounded-2xl shadow-bite p-6 sticky top-4 border border-bite-gray-200">
            <h2 className="text-xl md:text-2xl font-heading text-bite-text-dark mb-6">Résumé</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-bite-text-light font-body">
                <span>Sous-total</span>
                <span className="font-medium">0 FCFA</span>
              </div>
              <div className="flex justify-between text-bite-text-light font-body">
                <span>Frais de livraison</span>
                <span className="font-medium text-green-600">Gratuit</span>
              </div>
              <div className="pt-4 border-t-2 border-bite-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-heading text-bite-text-dark">Total</span>
                  <span className="text-2xl font-price text-bite-primary">0 FCFA</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-heading font-bold text-lg shadow-bite-lg">
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

