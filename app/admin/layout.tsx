import Link from "next/link";

export default function AdminLayout({
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
              <Link href="/admin" className="text-2xl font-bold text-orange-600">
                🍽️ Chef Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-orange-600">
                Tableau de bord
              </Link>
              <Link href="/admin/restaurants" className="text-gray-700 hover:text-orange-600">
                Restaurants
              </Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-orange-600">
                Utilisateurs
              </Link>
              <Link href="/admin/payments" className="text-gray-700 hover:text-orange-600">
                Paiements
              </Link>
              <Link href="/admin/zones" className="text-gray-700 hover:text-orange-600">
                Zones
              </Link>
              <Link href="/admin/settings" className="text-gray-700 hover:text-orange-600">
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

