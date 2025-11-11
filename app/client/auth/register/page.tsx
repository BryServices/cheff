'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { Address, UserPreferences } from '../../../types/user';
import { departments, districts } from '../../../data/restaurants';

export default function RegisterPage() {
  const [step, setStep] = useState<'phone' | 'code' | 'info' | 'address' | 'preferences'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [address, setAddress] = useState<Omit<Address, 'id'>>({
    street: '',
    district: '',
    department: '',
    city: 'Brazzaville',
    isDefault: true,
    label: 'Domicile',
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    favoriteCuisines: [],
    dietaryRestrictions: [],
    allergies: [],
    language: 'fr',
    notifications: {
      sms: true,
      email: false,
      push: true,
    },
  });

  const router = useRouter();
  const { sendVerificationCode, register } = useAuth();

  const cuisineTypes = ['Congolais', 'Burgers', 'Pizza', 'Sushi', 'Italien', 'Asiatique', 'Africain', 'Fast Food', 'Végétarien'];
  const dietaryOptions = ['Végétarien', 'Végan', 'Sans gluten', 'Halal', 'Casher'];
  const allergyOptions = ['Arachides', 'Lait', 'Œufs', 'Poisson', 'Crustacés', 'Soja', 'Fruits à coque'];

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const phoneRegex = /^(\+242|00242)?[0-9]{9}$/;
      const cleanPhone = phone.replace(/\s/g, '');
      
      if (!phoneRegex.test(cleanPhone) && cleanPhone.length < 9) {
        throw new Error('Numéro de téléphone invalide');
      }

      await sendVerificationCode(cleanPhone);
      setStep('code');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi du code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (code.length !== 6) {
      setError('Le code doit contenir 6 chiffres');
      return;
    }

    setStep('info');
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setStep('address');
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!address.street || !address.district || !address.department) {
      setError('Veuillez remplir tous les champs d\'adresse');
      return;
    }

    setStep('preferences');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const addresses: Address[] = [{
        ...address,
        id: `addr_${Date.now()}`,
      }];

      await register({
        firstName,
        lastName,
        phone: phone.replace(/\s/g, ''),
        code,
        addresses,
        preferences,
      });

      router.push('/client');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('242')) {
      return `+242 ${cleaned.slice(3)}`;
    }
    if (cleaned.length <= 9) {
      return cleaned;
    }
    return cleaned;
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  return (
    <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-6 md:p-8 border border-bite-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-bite-text-dark mb-2">CHEFF</h1>
          <h2 className="text-2xl font-heading text-bite-text-dark mb-2">Inscription</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {['phone', 'code', 'info', 'address', 'preferences'].map((s, idx) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  step === s
                    ? 'bg-bite-primary'
                    : ['phone', 'code', 'info', 'address', 'preferences'].indexOf(step) > idx
                    ? 'bg-bite-primary opacity-50'
                    : 'bg-bite-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
            {error}
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="+242 06 123 4567"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le code'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Code de vérification
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark placeholder:text-bite-text-light text-center text-2xl tracking-widest"
                maxLength={6}
                required
              />
              <p className="mt-2 text-sm text-bite-text-light font-body text-center">
                Code envoyé au {phone}
              </p>
            </div>
            <button
              type="submit"
              disabled={code.length !== 6}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50"
            >
              Vérifier
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
            >
              Changer de numéro
            </button>
          </form>
        )}

        {step === 'info' && (
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Prénom
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Nom
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg"
            >
              Continuer
            </button>
          </form>
        )}

        {step === 'address' && (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Libellé de l'adresse (optionnel)
              </label>
              <input
                type="text"
                value={address.label}
                onChange={(e) => setAddress({ ...address, label: e.target.value })}
                placeholder="Domicile, Travail, etc."
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Rue
              </label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                placeholder="Avenue de l'Indépendance"
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Quartier
              </label>
              <select
                value={address.district}
                onChange={(e) => setAddress({ ...address, district: e.target.value })}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              >
                <option value="">Sélectionner un quartier</option>
                {districts.filter(d => d !== 'Tous').map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Arrondissement
              </label>
              <select
                value={address.department}
                onChange={(e) => setAddress({ ...address, department: e.target.value })}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              >
                <option value="">Sélectionner un arrondissement</option>
                {departments.filter(d => d !== 'Tous').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="skipAddress"
                className="w-4 h-4 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAddress({
                      street: '',
                      district: '',
                      department: '',
                      city: 'Brazzaville',
                      isDefault: true,
                      label: '',
                    });
                    setStep('preferences');
                  }
                }}
              />
              <label htmlFor="skipAddress" className="text-sm text-bite-text-light font-body">
                Je ne suis pas à cette adresse actuellement (je la modifierai plus tard)
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg"
            >
              Continuer
            </button>
            <button
              type="button"
              onClick={() => setStep('info')}
              className="w-full text-bite-text-light hover:text-bite-primary transition font-body font-medium text-sm"
            >
              Retour
            </button>
          </form>
        )}

        {step === 'preferences' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Cuisines préférées (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map((cuisine) => (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => setPreferences({
                      ...preferences,
                      favoriteCuisines: toggleArrayItem(preferences.favoriteCuisines, cuisine),
                    })}
                    className={`px-3 py-1 rounded-full text-sm font-body transition ${
                      preferences.favoriteCuisines.includes(cuisine)
                        ? 'bg-bite-primary text-white'
                        : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Restrictions alimentaires (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPreferences({
                      ...preferences,
                      dietaryRestrictions: toggleArrayItem(preferences.dietaryRestrictions, option),
                    })}
                    className={`px-3 py-1 rounded-full text-sm font-body transition ${
                      preferences.dietaryRestrictions.includes(option)
                        ? 'bg-bite-primary text-white'
                        : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Allergies (optionnel)
              </label>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map((allergy) => (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => setPreferences({
                      ...preferences,
                      allergies: toggleArrayItem(preferences.allergies, allergy),
                    })}
                    className={`px-3 py-1 rounded-full text-sm font-body transition ${
                      preferences.allergies.includes(allergy)
                        ? 'bg-bite-primary text-white'
                        : 'bg-bite-gray-light text-bite-text-dark border border-bite-gray-300'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Notifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.sms}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, sms: e.target.checked },
                    })}
                    className="w-4 h-4 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                  />
                  <span className="text-sm font-body text-bite-text-dark">SMS</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.push}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, push: e.target.checked },
                    })}
                    className="w-4 h-4 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                  />
                  <span className="text-sm font-body text-bite-text-dark">Notifications push</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50"
            >
              {isLoading ? 'Inscription...' : 'Créer mon compte'}
            </button>
            <button
              type="button"
              onClick={() => setStep('address')}
              className="w-full text-bite-text-light hover:text-bite-primary transition font-body font-medium text-sm"
            >
              Retour
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-bite-text-light font-body text-sm">
            Déjà un compte ?{' '}
            <Link href="/client/auth/login" className="text-bite-primary hover:text-bite-dark font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

