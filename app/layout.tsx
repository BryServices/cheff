import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import RestaurantAuthProvider from "./components/RestaurantAuthProvider";

export const metadata: Metadata = {
  title: "CHEFF - Plateforme de livraison de repas",
  description: "Application de livraison de repas avec gestion multi-utilisateurs",
  icons: {
    icon: '/icone.png',
    apple: '/icone.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <RestaurantAuthProvider>
            {children}
          </RestaurantAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

