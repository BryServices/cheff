export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Paiement
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-bite-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Adresse de livraison
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Adresse"
              className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
            />
            <input
              type="text"
              placeholder="Ville"
              className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-bite-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Moyen de paiement
          </h2>
          <div className="space-y-3">
            <button className="w-full p-4 border-2 border-bite-gray-300 rounded-xl hover:border-bite-primary hover:bg-bite-gray-light transition font-body font-medium text-bite-text-dark">
              MTN MOBILE MONEY
            </button>
            <button className="w-full p-4 border-2 border-bite-gray-300 rounded-xl hover:border-bite-primary hover:bg-bite-gray-light transition font-body font-medium text-bite-text-dark">
              AIRTEL MONEY
            </button>
            <button className="w-full p-4 border-2 border-bite-primary bg-bite-gray-light rounded-xl font-body font-bold text-bite-primary">
              Paiement à la livraison
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-6 bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
        <h2 className="text-xl font-heading text-bite-text-dark mb-4">Résumé de la commande</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-bite-text-light font-body">
            <span>Sous-total</span>
            <span className="font-medium">0,00 €</span>
          </div>
          <div className="flex justify-between text-bite-text-light font-body">
            <span>Livraison</span>
            <span className="font-medium text-green-600">Gratuit</span>
          </div>
          <div className="pt-3 border-t-2 border-bite-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading text-bite-text-dark">Total</span>
              <span className="text-2xl font-price text-bite-primary">0,00 €</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-heading font-bold text-lg shadow-bite-lg">
          Confirmer la commande
        </button>
      </div>
    </div>
  );
}

