'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sendVerificationCode, login } = useAuth();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Valider le format du téléphone
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
    setIsLoading(true);

    try {
      const cleanPhone = phone.replace(/\s/g, '');
      await login(cleanPhone, code);
      router.push('/client');
    } catch (err: any) {
      setError(err.message || 'Code de vérification invalide');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    // Formater le téléphone congolais
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('242')) {
      return `+242 ${cleaned.slice(3)}`;
    }
    if (cleaned.length <= 9) {
      return cleaned;
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-bite-gray-light flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-bite-lg p-6 md:p-8 border border-bite-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-heading text-bite-text-dark mb-2">CHEFF</h1>
          <h2 className="text-2xl font-heading text-bite-text-dark mb-2">
            {step === 'phone' ? 'Connexion' : 'Vérification'}
          </h2>
          <p className="text-bite-text-light font-body">
            {step === 'phone'
              ? 'Entrez votre numéro de téléphone'
              : 'Entrez le code reçu par SMS'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
            {error}
          </div>
        )}

        {step === 'phone' ? (
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
              <p className="mt-1 text-xs text-bite-text-light font-body">
                Format: +242 ou 06 123 4567
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le code'}
            </button>
          </form>
        ) : (
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
              disabled={isLoading || code.length !== 6}
              className="w-full bg-bite-primary text-white py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Vérification...' : 'Se connecter'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
              }}
              className="w-full text-bite-primary hover:text-bite-dark transition font-body font-medium text-sm"
            >
              Changer de numéro
            </button>

            <button
              type="button"
              onClick={async () => {
                setError('');
                setIsLoading(true);
                try {
                  const cleanPhone = phone.replace(/\s/g, '');
                  await sendVerificationCode(cleanPhone);
                  setError('');
                } catch (err: any) {
                  setError(err.message || 'Erreur lors de l\'envoi du code');
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
              className="w-full text-bite-text-light hover:text-bite-primary transition font-body font-medium text-sm"
            >
              Renvoyer le code
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-bite-text-light font-body text-sm">
            Pas encore de compte ?{' '}
            <Link href="/client/auth/register" className="text-bite-primary hover:text-bite-dark font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

