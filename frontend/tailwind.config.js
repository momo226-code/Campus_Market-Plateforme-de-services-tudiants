/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette Premium Ventura
        ventura: {
          dark: '#3D332D',    // Le brun profond pour textes et boutons principaux
          accent: '#E8603C',  // L'orange vif pour les accents et CTA secondaires
          gold: '#C59473',    // Le doré subtil (utilisé dans le logo)
          cream: '#FDFBF9',   // Blanc cassé pour le fond principal (moins agressif)
          beige: '#FAEADE',   // Beige doux pour les séparations et fonds de section
          green: '#7A9E7E',   // Vert doux pour badges et validation
          yellow: '#F2C94C',  // Jaune pour badges et éléments d'alerte
        },
      },
      fontFamily: {
        sans: ['"Neue Haas Grotesk"', 'Inter', 'sans-serif'], // Remplace par ta police grasse si tu en as une
      },
      fontWeight: {
        'black': 1000, // Pour tes titres ultra-gras
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'blob': 'blob 7s infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Assure-toi d'installer ce plugin: npm install tailwindcss-animate
    // require('@tailwindcss/line-clamp'), // Facultatif pour tronquer le texte proprement
  ],
}