export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-bite-gray-900 mb-6">
        Mon Profil
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 border border-bite-gray-100 space-y-8">
        {/* Avatar et actions */}
        <div className="flex items-center gap-6 pb-6 border-b border-bite-gray-200">
          <div className="w-20 h-20 bg-bite-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-bite-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-bite-gray-900">Utilisateur</h2>
            <p className="text-bite-gray-600">Non connecté</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-bite-primary text-white rounded-lg hover:bg-bite-dark transition font-medium">
              S'inscrire
            </button>
            <button className="px-6 py-2 border-2 border-bite-primary text-bite-primary rounded-lg hover:bg-bite-gray-50 transition font-medium">
              Se connecter
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-bite-gray-900 mb-4">Informations personnelles</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-bite-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-bite-gray-200 rounded-lg focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bite-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-bite-gray-200 rounded-lg focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-bite-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border-2 border-bite-gray-200 rounded-lg focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition"
                placeholder="Votre téléphone"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-bite-gray-900 mb-4">Adresses</h2>
          <div className="text-bite-gray-600 text-sm">Aucune adresse enregistrée</div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-bite-gray-900 mb-4">Préférences</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary" />
              <span className="ml-3 text-bite-gray-700">Recevoir les notifications par email</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary" />
              <span className="ml-3 text-bite-gray-700">Recevoir les offres promotionnelles</span>
            </label>
          </div>
        </div>
        
        <button className="w-full bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-bold text-lg shadow-lg">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

