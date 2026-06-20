/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f3",
          100: "#dbeee2",
          500: "#2f7a4f",
          600: "#246340",
          700: "#1d4f34",
        },
        sky: {
          50: "#eef7fb",
          500: "#3b8fb5",
        },
        earth: {
          100: "#f5efe6",
          400: "#c89b6b",
        },
      },
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
