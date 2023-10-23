/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: '20rem 1fr'
      }
    },
  },
  plugins: [],
}

