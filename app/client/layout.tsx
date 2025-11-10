import Link from "next/link";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/client" className="text-2xl font-bold text-orange-600">
                🍽️ Chef
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/client" className="text-gray-700 hover:text-orange-600">
                Accueil
              </Link>
              <Link href="/client/restaurants" className="text-gray-700 hover:text-orange-600">
                Restaurants
              </Link>
              <Link href="/client/cart" className="text-gray-700 hover:text-orange-600">
                Panier
              </Link>
              <Link href="/client/orders" className="text-gray-700 hover:text-orange-600">
                Mes Commandes
              </Link>
              <Link href="/client/profile" className="text-gray-700 hover:text-orange-600">
                Profil
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

