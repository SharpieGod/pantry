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
          50: "rgb(233, 237, 252)",
          100: "rgb(211, 218, 248)",
          200: "rgb(166, 181, 242)",
          300: "rgb(122, 145, 235)",
          400: "rgb(78, 108, 228)",
          500: "rgb(33, 71, 222)",
          600: "rgb(27, 57, 177)",
          700: "rgb(20, 43, 133)",
          800: "rgb(13, 28, 89)",
          900: "rgb(7, 14, 44)",
          950: "rgb(3, 7, 22)",
        },
        background: {
          50: "rgb(233, 236, 252)",
          100: "rgb(211, 217, 248)",
          200: "rgb(166, 179, 242)",
          300: "rgb(122, 141, 235)",
          400: "rgb(78, 103, 228)",
          500: "rgb(33, 65, 222)",
          600: "rgb(27, 52, 177)",
          700: "rgb(20, 39, 133)",
          800: "rgb(13, 26, 89)",
          900: "rgb(7, 13, 44)",
          950: "rgb(3, 6, 22)",
        },
        primary: {
          50: "rgb(233, 237, 252)",
          100: "rgb(211, 220, 248)",
          200: "rgb(167, 184, 241)",
          300: "rgb(123, 149, 234)",
          400: "rgb(79, 113, 227)",
          500: "rgb(34, 78, 221)",
          600: "rgb(28, 62, 176)",
          700: "rgb(21, 47, 132)",
          800: "rgb(14, 31, 88)",
          900: "rgb(7, 16, 44)",
          950: "rgb(3, 8, 22)",
        },
        secondary: {
          50: "rgb(241, 233, 252)",
          100: "rgb(228, 211, 248)",
          200: "rgb(200, 167, 241)",
          300: "rgb(173, 123, 234)",
          400: "rgb(146, 79, 227)",
          500: "rgb(118, 34, 221)",
          600: "rgb(95, 28, 176)",
          700: "rgb(71, 21, 132)",
          800: "rgb(47, 14, 88)",
          900: "rgb(24, 7, 44)",
          950: "rgb(12, 3, 22)",
        },
        accent: {
          50: "rgb(244, 233, 252)",
          100: "rgb(233, 211, 248)",
          200: "rgb(211, 167, 241)",
          300: "rgb(190, 123, 234)",
          400: "rgb(168, 79, 227)",
          500: "rgb(146, 34, 221)",
          600: "rgb(117, 28, 176)",
          700: "rgb(88, 21, 132)",
          800: "rgb(58, 14, 88)",
          900: "rgb(29, 7, 44)",
          950: "rgb(15, 3, 22)",
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
