'use client';

import Link from "next/link";
import { useRestaurantAuth } from "@/app/context/RestaurantAuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, owner, logout } = useRestaurantAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Pages qui nécessitent une authentification
  const protectedRoutes = ['/resto/dashboard', '/resto/menu', '/resto/orders', '/resto/schedule', '/resto/stats', '/resto/settings'];
  const requiresAuth = protectedRoutes.some(route => pathname?.startsWith(route));

  // Rediriger vers la page de connexion si nécessaire
  useEffect(() => {
    if (!isLoading && !isAuthenticated && requiresAuth && !pathname?.startsWith('/resto/auth')) {
      router.push('/resto/auth/login');
    }
  }, [isAuthenticated, isLoading, pathname, router, requiresAuth]);

  // Ne pas afficher le layout si on est sur les pages d'authentification
  if (pathname?.startsWith('/resto/auth')) {
    return <>{children}</>;
  }

  if (isLoading && requiresAuth) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bite-gray-light">
      <nav className="bg-bite-dark shadow-bite-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/resto/dashboard" className="text-2xl font-heading text-white tracking-tight hover:opacity-90 transition">
                CHEFF Restaurateur
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/resto/dashboard" className="text-white hover:text-bite-accent transition font-body font-medium">
                Tableau de bord
              </Link>
              <Link href="/resto/menu" className="text-white hover:text-bite-accent transition font-body font-medium">
                Menu
              </Link>
              <Link href="/resto/orders" className="text-white hover:text-bite-accent transition font-body font-medium">
                Commandes
              </Link>
              <Link href="/resto/schedule" className="text-white hover:text-bite-accent transition font-body font-medium">
                Horaires
              </Link>
              <Link href="/resto/stats" className="text-white hover:text-bite-accent transition font-body font-medium">
                Statistiques
              </Link>
              <Link href="/resto/settings" className="text-white hover:text-bite-accent transition font-body font-medium">
                Paramètres
              </Link>
              {isAuthenticated && owner && (
                <button
                  onClick={logout}
                  className="text-white hover:text-bite-accent transition font-body font-medium"
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

