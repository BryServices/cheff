export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark mb-4 md:mb-6">
        Mon Profil
      </h1>
      
      <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 space-y-6 md:space-y-8">
        {/* Avatar et actions */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 pb-6 border-b border-bite-gray-200">
          <div className="w-20 h-20 bg-bite-gray-light rounded-full flex items-center justify-center shadow-bite">
            <svg className="w-10 h-10 text-bite-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-heading text-bite-text-dark">Utilisateur</h2>
            <p className="text-bite-text-light font-body">Non connecté</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="px-6 py-2.5 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite">
              S&apos;inscrire
            </button>
            <button className="px-6 py-2.5 border-2 border-bite-primary text-bite-primary rounded-xl hover:bg-bite-gray-light transition font-heading font-bold">
              Se connecter
            </button>
          </div>
        </div>

        {/* Bouton Google Login */}
        <div className="pb-6 border-b border-bite-gray-200">
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-bite-gray-300 rounded-xl hover:bg-bite-gray-light transition font-body font-medium text-bite-text-dark shadow-bite">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuer avec Google</span>
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">Informations personnelles</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Nom
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Prénom
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
                placeholder="Votre téléphone"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">Adresses</h2>
          <div className="text-bite-text-light text-sm font-body">Aucune adresse enregistrée</div>
        </div>
        
        <div>
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">Préférences</h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary" />
              <span className="ml-3 text-bite-text-dark font-body">Recevoir les notifications par email</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary" />
              <span className="ml-3 text-bite-text-dark font-body">Recevoir les offres promotionnelles</span>
            </label>
          </div>
        </div>
        
        <button className="w-full bg-bite-primary text-white py-4 rounded-xl hover:bg-bite-dark transition font-heading font-bold text-lg shadow-bite-lg">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

