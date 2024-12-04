/* eslint-disable no-undef */


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode support
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
};
