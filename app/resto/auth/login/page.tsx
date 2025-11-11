'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RestoLoginPage() {
  const router = useRouter();
  
  // Rediriger vers le dashboard qui a l'authentification intégrée
  useEffect(() => {
    router.push('/resto/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
        <p className="mt-4 text-bite-text-light font-body">Redirection...</p>
      </div>
    </div>
  );
}


