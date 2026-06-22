/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ["Qwigley", "cursive"],
        sans: ["Montserrat", "sans-serif"],
      },

      colors: {
        bg: "#FCE6D8",
        surface: "#FAF2EC",
        section: "#EAD8CC",

        primary: "#D95D03",
        "primary-hover": "#B84F02",

        text: {
          primary: "#3C0C04",
          secondary: "#5F4037",
          muted: "#8A6A5E",
        },
      },
    },
  },
  plugins: [],
}