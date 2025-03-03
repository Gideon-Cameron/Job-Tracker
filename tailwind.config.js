/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#1E1E1E",
        darkCard: "#292929",
        darkText: "#E0E0E0",
      },
    },
  },
  plugins: [],
};
