/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          50: "#EEF1F6",
          100: "#D7DDE9",
          200: "#AEBBD4",
          300: "#8699BE",
          400: "#5D77A8",
          500: "#3B5588",
          600: "#2C4169",
          700: "#1B2A4A",
          800: "#141F38",
          900: "#0D1526",
        },
        teal: {
          DEFAULT: "#0E7C7B",
          50: "#E6F4F4",
          100: "#C1E4E3",
          200: "#98D2D0",
          300: "#6DBFBD",
          400: "#3FA9A7",
          500: "#0E7C7B",
          600: "#0C6968",
          700: "#095352",
          800: "#073E3D",
          900: "#042827",
        },
        surface: {
          DEFAULT: "#F8F9FA",
          dim: "#F1F3F5",
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '"IBM Plex Sans"',
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,42,74,0.06), 0 8px 24px -12px rgba(27,42,74,0.12)",
        "card-hover":
          "0 4px 10px rgba(27,42,74,0.08), 0 16px 32px -12px rgba(27,42,74,0.16)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(27,42,74,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,42,74,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
