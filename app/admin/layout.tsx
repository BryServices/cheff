import Link from "next/link";
import Image from "next/image";

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
              <Link href="/admin" className="flex items-center gap-2 hover:opacity-90 transition">
                <Image 
                  src="/icone.png" 
                  alt="CHEFF" 
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-2xl font-heading text-white tracking-tight">
                  CHEFF Admin
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/admin/dashboard#tableau" className="text-white hover:text-bite-accent transition font-body font-medium">
                Tableau de bord
              </Link>
              <Link href="/admin/dashboard#restaurants" className="text-white hover:text-bite-accent transition font-body font-medium">
                Restaurants
              </Link>
              <Link href="/admin/dashboard#utilisateurs" className="text-white hover:text-bite-accent transition font-body font-medium">
                Utilisateurs
              </Link>
              <Link href="/admin/dashboard#livreurs" className="text-white hover:text-bite-accent transition font-body font-medium">
                Livreurs
              </Link>
              <Link href="/admin/dashboard#paiements" className="text-white hover:text-bite-accent transition font-body font-medium">
                Paiements
              </Link>
              <Link href="/admin/dashboard#zones" className="text-white hover:text-bite-accent transition font-body font-medium">
                Zones
              </Link>
              <Link href="/admin/dashboard#parametres" className="text-white hover:text-bite-accent transition font-body font-medium">
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

