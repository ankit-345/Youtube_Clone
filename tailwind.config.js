/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "background-black": "#0f0f0f",
      },
      fontFamily: {
        base: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
