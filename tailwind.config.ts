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
          primary: "#A30000",      // Rouge principal (Bite)
          dark: "#8B0000",         // Rouge foncé (header)
          light: "#DC2626",        // Rouge clair pour les boutons
          accent: "#FFC107",       // Jaune pour les badges
          gradient: {
            start: "#FFA800",      // Début du dégradé orange-jaune
            end: "#FFC107",        // Fin du dégradé orange-jaune
          },
          white: "#FFFFFF",
          text: {
            dark: "#212121",       // Text Dark
            light: "#757575",      // Text Light
          },
          gray: {
            light: "#F5F5F5",      // Light Gray
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
          },
        },
      },
      fontFamily: {
        heading: ["Poppins", "Montserrat", "sans-serif"],
        body: ["Poppins", "Roboto", "sans-serif"],
        bold: ["Poppins", "Montserrat", "sans-serif"],
      },
      fontWeight: {
        heading: "700",
        body: "400",
        medium: "500",
      },
    },
  },
  plugins: [],
};
export default config;


