/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a1c4fd',  // Light primary color
          DEFAULT: '#2196f3', // Primary color
          dark: '#1769aa',    // Dark primary color
        },
        secondary: {
          light: '#d1d5db',   // Light grey secondary color
          DEFAULT: '#9ca3af', // Grey secondary color
          dark: '#6b7280',    // Dark grey secondary color
        },
      },
    },
  },
  plugins: [],
}