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
          50: "rgb(24, 6, 1)",
          100: "rgb(48, 12, 3)",
          200: "rgb(97, 23, 5)",
          300: "rgb(145, 35, 8)",
          400: "rgb(194, 47, 10)",
          500: "rgb(242, 59, 13)",
          600: "rgb(245, 98, 61)",
          700: "rgb(247, 137, 110)",
          800: "rgb(250, 176, 158)",
          900: "rgb(252, 216, 207)",
          950: "rgb(254, 235, 231)",
        },
        background: {
          50: "rgb(24, 5, 2)",
          100: "rgb(47, 11, 4)",
          200: "rgb(95, 22, 7)",
          300: "rgb(142, 33, 11)",
          400: "rgb(190, 44, 14)",
          500: "rgb(237, 54, 18)",
          600: "rgb(241, 95, 65)",
          700: "rgb(244, 135, 113)",
          800: "rgb(248, 175, 160)",
          900: "rgb(251, 215, 208)",
          950: "rgb(253, 235, 231)",
        },
        primary: {
          50: "rgb(24, 5, 1)",
          100: "rgb(49, 9, 2)",
          200: "rgb(98, 18, 4)",
          300: "rgb(147, 27, 6)",
          400: "rgb(196, 36, 8)",
          500: "rgb(245, 45, 10)",
          600: "rgb(247, 87, 59)",
          700: "rgb(249, 129, 108)",
          800: "rgb(251, 171, 157)",
          900: "rgb(253, 213, 206)",
          950: "rgb(254, 234, 231)",
        },
        secondary: {
          50: "rgb(24, 18, 1)",
          100: "rgb(49, 36, 2)",
          200: "rgb(98, 71, 4)",
          300: "rgb(147, 107, 6)",
          400: "rgb(196, 143, 8)",
          500: "rgb(245, 178, 10)",
          600: "rgb(247, 194, 59)",
          700: "rgb(249, 209, 108)",
          800: "rgb(251, 224, 157)",
          900: "rgb(253, 240, 206)",
          950: "rgb(254, 247, 231)",
        },
        accent: {
          50: "rgb(24, 21, 1)",
          100: "rgb(49, 41, 2)",
          200: "rgb(98, 82, 4)",
          300: "rgb(147, 123, 6)",
          400: "rgb(196, 165, 8)",
          500: "rgb(245, 206, 10)",
          600: "rgb(247, 216, 59)",
          700: "rgb(249, 225, 108)",
          800: "rgb(251, 235, 157)",
          900: "rgb(253, 245, 206)",
          950: "rgb(254, 250, 231)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
