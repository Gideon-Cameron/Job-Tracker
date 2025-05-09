/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // 🎨 Custom Dark Theme (based on portfolio)
        darkBackground: "#0a192f",   // bg-dark
        darkPrimaryText: "#ccd6f6",  // text-primary
        darkSecondaryText: "#8892b0", // text-secondary
        darkAccent: "#64ffda",       // hover/accent color

        // Optional aliases
        darkCard: "#112240", // card-like background (optional)
      },
    },
  },
  plugins: [],
};
