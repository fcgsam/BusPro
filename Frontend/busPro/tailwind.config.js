/** @type {import('tailwindcss').Config} */
// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'first-color': '#415a77',
      },
    },
  },
  plugins: [],
};

