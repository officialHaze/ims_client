/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bauhaus_extrabold: ["Bauhaus-extrabold", "sans-serif"],
        lovelo_bold: ["Lovelo-bold", "sans-serif"],
        garet_normal: ["Garet-normal", "sans-serif"],
      },
    },
  },
  plugins: [],
};

