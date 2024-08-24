import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        text: {
          50: "rgb(250, 234, 234)",
          100: "rgb(245, 214, 214)",
          200: "rgb(236, 172, 172)",
          300: "rgb(226, 131, 131)",
          400: "rgb(216, 90, 90)",
          500: "rgb(207, 48, 48)",
          600: "rgb(165, 39, 39)",
          700: "rgb(124, 29, 29)",
          800: "rgb(83, 19, 19)",
          900: "rgb(41, 10, 10)",
          950: "rgb(21, 5, 5)",
        },
        background: {
          50: "rgb(250, 234, 235)",
          100: "rgb(246, 213, 215)",
          200: "rgb(236, 172, 175)",
          300: "rgb(227, 130, 135)",
          400: "rgb(217, 89, 95)",
          500: "rgb(208, 47, 55)",
          600: "rgb(166, 38, 44)",
          700: "rgb(125, 28, 33)",
          800: "rgb(83, 19, 22)",
          900: "rgb(42, 9, 11)",
          950: "rgb(21, 5, 6)",
        },
        primary: {
          50: "rgb(250, 234, 236)",
          100: "rgb(245, 214, 217)",
          200: "rgb(236, 172, 179)",
          300: "rgb(226, 131, 141)",
          400: "rgb(216, 90, 102)",
          500: "rgb(207, 48, 64)",
          600: "rgb(165, 39, 51)",
          700: "rgb(124, 29, 39)",
          800: "rgb(83, 19, 26)",
          900: "rgb(41, 10, 13)",
          950: "rgb(21, 5, 6)",
        },
        secondary: {
          50: "rgb(250, 240, 234)",
          100: "rgb(245, 225, 214)",
          200: "rgb(236, 195, 172)",
          300: "rgb(226, 164, 131)",
          400: "rgb(216, 134, 90)",
          500: "rgb(207, 104, 48)",
          600: "rgb(165, 83, 39)",
          700: "rgb(124, 62, 29)",
          800: "rgb(83, 42, 19)",
          900: "rgb(41, 21, 10)",
          950: "rgb(21, 10, 5)",
        },
        accent: {
          50: "rgb(250, 243, 234)",
          100: "rgb(245, 231, 214)",
          200: "rgb(236, 207, 172)",
          300: "rgb(226, 183, 131)",
          400: "rgb(216, 159, 90)",
          500: "rgb(207, 135, 48)",
          600: "rgb(165, 108, 39)",
          700: "rgb(124, 81, 29)",
          800: "rgb(83, 54, 19)",
          900: "rgb(41, 27, 10)",
          950: "rgb(21, 14, 5)",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
  plugins: [],
} satisfies Config;

export default config;
