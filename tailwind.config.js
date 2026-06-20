/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#F4F6FB",
          100: "#E7EBF5",
          200: "#CBD4E6",
          300: "#9FACC8",
          400: "#6B7BA3",
          500: "#475580",
          600: "#324066",
          700: "#1E2D52",
          800: "#172242",
          900: "#0F1730",
          950: "#0A0F1F",
        },
        stamp: {
          50: "#FFF8EC",
          100: "#FEEDC8",
          200: "#FCD988",
          300: "#F8C04C",
          400: "#F0A724",
          500: "#D98A12",
          600: "#B06B0B",
          700: "#8A510C",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8FC",
          dark: "#0F1730",
          "dark-subtle": "#151E38",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 48, 0.04), 0 8px 24px -8px rgba(15, 23, 48, 0.10)",
        "soft-lg": "0 4px 12px rgba(15, 23, 48, 0.06), 0 24px 48px -16px rgba(15, 23, 48, 0.16)",
        "stamp-ring": "0 0 0 3px rgba(240, 167, 36, 0.35)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(30,45,82,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,45,82,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1E2D52", // ink-700
          secondary: "#F0A724", // stamp-400
          accent: "#D98A12", // stamp-500
          neutral: "#172242", // ink-800
          "base-100": "#FFFFFF", // white
          "base-200": "#F7F8FC", // surface-subtle
          "base-300": "#E7EBF5", // ink-100
        },
        dark: {
          primary: "#F0A724", // stamp-400
          secondary: "#1E2D52", // ink-700
          accent: "#D98A12",
          neutral: "#E7EBF5",
          "base-100": "#0F1730", // surface-dark
          "base-200": "#151E38", // surface-dark-subtle
          "base-300": "#1E2D52",
        },
      },
    ],
  },
};
