/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1020",
        aurora: "#1a2a4a",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
