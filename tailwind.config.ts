import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bite: {
          primary: "#8B1E1E",      // Rouge foncé principal (Bite)
          dark: "#6B1515",         // Rouge très foncé
          light: "#DC2626",        // Rouge clair pour les boutons
          accent: "#FCD34D",       // Jaune pour les promotions
          white: "#FFFFFF",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

