import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chef - Plateforme de livraison de repas",
  description: "Application de livraison de repas avec gestion multi-utilisateurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

