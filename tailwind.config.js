/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-light': '#F5F0E8',
        'blue-pastel': '#A8D5E8',
        'green-pastel': '#B8E6C8',
        'pink-pastel': '#F5C6D0'
      }
    },
  },
  plugins: [],
}
