/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffff",
        transparent: "transparent",
        darkiblue: "#001c3d",
        mainblue: "#166acd",
        summer: "#ffd500",
        summerhovered: "#f2ca02",
        myblacki: "#000105",
        babygray: "#565656",
        graypage: "#f6f6f6",
        grayline: "#e2e2e2",
      },
    },
  },
  plugins: [],
};
