import Link from "next/link";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bite-gray-50">
      {/* Header avec style Bite */}
      <nav className="bg-bite-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/client" className="text-3xl font-bold text-white tracking-tight hover:opacity-90 transition">
                Bite
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/client" className="text-white hover:text-bite-accent transition font-medium">
                Accueil
              </Link>
              <Link href="/client/restaurants" className="text-white hover:text-bite-accent transition font-medium">
                Restaurants
              </Link>
              <Link href="/client/cart" className="text-white hover:text-bite-accent transition font-medium flex items-center gap-1">
                <span>Panier</span>
                <span className="bg-bite-accent text-bite-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
              <Link href="/client/orders" className="text-white hover:text-bite-accent transition font-medium">
                Commandes
              </Link>
              <Link href="/client/profile" className="text-white hover:text-bite-accent transition font-medium">
                Profil
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Barre de navigation mobile en bas (style Bite) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-bite-primary border-t border-bite-dark md:hidden">
        <div className="flex justify-around items-center h-16">
          <Link href="/client" className="flex flex-col items-center text-white hover:text-bite-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          <Link href="/client/cart" className="flex flex-col items-center text-white hover:text-bite-accent transition relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs mt-1">Panier</span>
            <span className="absolute top-0 right-0 bg-bite-accent text-bite-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </Link>
          <Link href="/client/orders" className="flex flex-col items-center text-white hover:text-bite-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1">Favoris</span>
          </Link>
          <Link href="/client/profile" className="flex flex-col items-center text-white hover:text-bite-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </nav>
      
      <main className="pb-16 md:pb-0">{children}</main>
    </div>
  );
}

