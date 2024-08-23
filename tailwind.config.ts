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
          50: "rgb(11, 15, 15)",
          100: "rgb(21, 30, 30)",
          200: "rgb(42, 60, 60)",
          300: "rgb(63, 90, 90)",
          400: "rgb(85, 119, 119)",
          500: "rgb(106, 149, 149)",
          600: "rgb(136, 170, 170)",
          700: "rgb(165, 192, 192)",
          800: "rgb(195, 213, 213)",
          900: "rgb(225, 234, 234)",
          950: "rgb(240, 244, 244)",
        },
        background: {
          50: "rgb(10, 16, 14)",
          100: "rgb(20, 31, 28)",
          200: "rgb(40, 62, 57)",
          300: "rgb(60, 93, 85)",
          400: "rgb(80, 124, 113)",
          500: "rgb(99, 156, 142)",
          600: "rgb(131, 175, 164)",
          700: "rgb(162, 195, 187)",
          800: "rgb(193, 215, 210)",
          900: "rgb(224, 235, 232)",
          950: "rgb(239, 245, 244)",
        },
        primary: {
          50: "rgb(10, 15, 15)",
          100: "rgb(20, 31, 30)",
          200: "rgb(40, 62, 60)",
          300: "rgb(60, 93, 90)",
          400: "rgb(81, 123, 120)",
          500: "rgb(101, 154, 150)",
          600: "rgb(132, 174, 171)",
          700: "rgb(162, 195, 192)",
          800: "rgb(193, 215, 213)",
          900: "rgb(224, 235, 234)",
          950: "rgb(240, 245, 244)",
        },
        secondary: {
          50: "rgb(10, 11, 16)",
          100: "rgb(20, 21, 31)",
          200: "rgb(40, 42, 62)",
          300: "rgb(60, 63, 93)",
          400: "rgb(80, 84, 124)",
          500: "rgb(99, 105, 156)",
          600: "rgb(131, 135, 175)",
          700: "rgb(162, 165, 195)",
          800: "rgb(193, 195, 215)",
          900: "rgb(224, 225, 235)",
          950: "rgb(239, 240, 245)",
        },
        accent: {
          50: "rgb(12, 10, 16)",
          100: "rgb(23, 20, 31)",
          200: "rgb(47, 40, 62)",
          300: "rgb(70, 60, 93)",
          400: "rgb(94, 80, 124)",
          500: "rgb(117, 99, 156)",
          600: "rgb(145, 131, 175)",
          700: "rgb(172, 162, 195)",
          800: "rgb(200, 193, 215)",
          900: "rgb(227, 224, 235)",
          950: "rgb(241, 239, 245)",
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
