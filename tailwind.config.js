/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'fondo_contacto': "src('/static/images/logo_uoh.png')",
      },
    },
  },
  plugins: [],
}
