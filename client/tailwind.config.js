/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#ffffff',
        secondary: '#a1a1aa',
        accent: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        oregon: ['"Oregon Regular"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
