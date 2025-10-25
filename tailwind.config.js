/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add this new fontFamily object
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // This will be our new body font
        'heading': ['Playfair Display', 'serif'] // This will be our new heading font
      },

      // Your existing colors
      colors: {
        'ocean-blue': '#006D77',
        'sand': '#E29578',
        'light-cream': '#FFDDD2',
        'dark-text': '#003249',
      }
    },
  },
  plugins: [],
}