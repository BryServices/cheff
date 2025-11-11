import Link from "next/link";

export default function RestoLayout({
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
              <Link href="/resto" className="text-2xl font-heading text-white tracking-tight hover:opacity-90 transition">
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
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

