const mtConfig = require("@material-tailwind/react").mtConfig;

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [
    mtConfig({
      fonts: {
        sans: "Lato",
        serif: "DM Serif Display",
      },
      colors: {
        primary: {
          default: "#1e3a8a",
          dark: "#172554",
          light: "#3b82f6",
          foreground: "#ffffff",
        },
      },
      darkColors: {
        primary: {
          default: "#5eead4",
          dark: "#2dd4bf",
          light: "#99f6e4",
          foreground: "#030712",
        },
      },
    }),
  ],
};
