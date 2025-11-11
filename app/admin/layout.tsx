import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bite-gray-light">
      <nav className="bg-bite-dark shadow-bite-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-2xl font-heading text-white tracking-tight hover:opacity-90 transition">
                CHEFF Admin
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/admin/dashboard" className="text-white hover:text-bite-accent transition font-body font-medium">
                Tableau de bord
              </Link>
              <Link href="/admin/restaurants" className="text-white hover:text-bite-accent transition font-body font-medium">
                Restaurants
              </Link>
              <Link href="/admin/users" className="text-white hover:text-bite-accent transition font-body font-medium">
                Utilisateurs
              </Link>
              <Link href="/admin/drivers" className="text-white hover:text-bite-accent transition font-body font-medium">
                Livreurs
              </Link>
              <Link href="/admin/payments" className="text-white hover:text-bite-accent transition font-body font-medium">
                Paiements
              </Link>
              <Link href="/admin/zones" className="text-white hover:text-bite-accent transition font-body font-medium">
                Zones
              </Link>
              <Link href="/admin/settings" className="text-white hover:text-bite-accent transition font-body font-medium">
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

