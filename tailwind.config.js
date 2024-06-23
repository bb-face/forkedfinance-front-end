/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        header: "128px",
        footer: "64.25px",
      },

      boxShadow: {
        "3d": "4px 4px 0px 0 rgba(0, 0, 0, 0.25)",
      },
      colors: {
        font: "#eee",
        button: {
          shadow: "#eee",
          border: "#eee",
        },
        input: {
          outline: "#eee",
        },
        primary: {
          light: "#cccccc",
          DEFAULT: "#000",
          dark: "#444444",
        },
        secondary: {
          light: "#d1fae5",
          DEFAULT: "#10b981",
          dark: "#047857",
        },
        tertiary: {
          light: "#ff7d85",
          DEFAULT: "#ff4949",
          dark: "#b91c1c",
        },
        background: "#242427",
        error: {
          light: "#fda4af",
          DEFAULT: "#f87171",
          dark: "#c24141",
        },
        warning: {
          light: "#fde047",
          DEFAULT: "#facc15",
          dark: "#ca8a04",
        },
        info: {
          light: "#bfdbfe",
          DEFAULT: "#60a5fa",
          dark: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};
