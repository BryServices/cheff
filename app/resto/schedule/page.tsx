export default function RestoSchedulePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Horaires & Disponibilité
      </h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
          <div key={day} className="flex items-center justify-between">
            <span className="font-semibold">{day}</span>
            <div className="flex items-center gap-4">
              <input type="time" className="px-3 py-2 border border-gray-300 rounded-lg" />
              <span>-</span>
              <input type="time" className="px-3 py-2 border border-gray-300 rounded-lg" />
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm text-gray-600">Fermé</span>
              </label>
            </div>
          </div>
        ))}
        
        <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
          Enregistrer les horaires
        </button>
      </div>
    </div>
  );
}

