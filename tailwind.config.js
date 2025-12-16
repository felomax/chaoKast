/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chile-blue': '#0037A1',
        'chile-red': '#CC0000',
      },
    },
  },
  plugins: [],
}
