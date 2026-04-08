/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          100: '#F1F3E0',
          200: '#D2DCB6',
          300: '#A1BC98',
          700: '#778873',
          800: '#5d6b5a', // darker variant
        },
        primary: '#778873',
        surface: '#FFFFFF',
        'surface-hover': '#F1F3E0',
        danger: '#e07a5f',
        success: '#A1BC98',
        'text-main': '#2A3129',
        'text-muted': '#778873'
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
