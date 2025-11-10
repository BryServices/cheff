import Link from "next/link";

export default function RestoLayout({
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
              <Link href="/resto" className="text-2xl font-bold text-orange-600">
                🍽️ Chef Restaurateur
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/resto/dashboard" className="text-gray-700 hover:text-orange-600">
                Tableau de bord
              </Link>
              <Link href="/resto/menu" className="text-gray-700 hover:text-orange-600">
                Menu
              </Link>
              <Link href="/resto/orders" className="text-gray-700 hover:text-orange-600">
                Commandes
              </Link>
              <Link href="/resto/schedule" className="text-gray-700 hover:text-orange-600">
                Horaires
              </Link>
              <Link href="/resto/stats" className="text-gray-700 hover:text-orange-600">
                Statistiques
              </Link>
              <Link href="/resto/settings" className="text-gray-700 hover:text-orange-600">
                Paramètres
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

