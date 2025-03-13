// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from the style guide
        "neutral-black": "#232226",
        charcoal: "#3c4659",
        manatee: "#8a8ba6",
        horizon: {
          DEFAULT: "#5988a6",
          50: "#f0f5f8",
          100: "#daeaf3",
          200: "#b5d5e6",
          300: "#8ebfd9",
          400: "#70a8c0",
          500: "#5988a6", // Base horizon
          600: "#4a7a97",
          700: "#3c6379",
          800: "#304d5c",
          900: "#263b47",
        },
        blush: {
          DEFAULT: "#d9848b",
          50: "#fdf2f3",
          100: "#fbe6e7",
          200: "#f7cccf",
          300: "#f1abb0",
          400: "#e4838b",
          500: "#d9848b", // Base blush
          600: "#c45f67",
          700: "#a24550",
          800: "#873a44",
          900: "#73353e",
        },

        // OVERRIDE: Map all blue shades to corresponding horizon shades
        blue: {
          50: "#f0f5f8", // horizon-50
          100: "#daeaf3", // horizon-100
          200: "#b5d5e6", // horizon-200
          300: "#8ebfd9", // horizon-300
          400: "#70a8c0", // horizon-400
          500: "#5988a6", // horizon (DEFAULT)
          600: "#4a7a97", // horizon-600
          700: "#3c6379", // horizon-700
          800: "#304d5c", // horizon-800
          900: "#263b47", // horizon-900
        },

        // OVERRIDE: Map indigo to charcoal shades
        indigo: {
          50: "#f5f6f9",
          100: "#ebedf2",
          200: "#d9dce5",
          300: "#bec3d0",
          400: "#9ba3b8",
          500: "#7d87a0",
          600: "#636e8a",
          700: "#3c4659", // charcoal
          800: "#313a49",
          900: "#282e3a",
        },

        // OVERRIDE: Map red to blush shades
        red: {
          50: "#fdf2f3", // blush-50
          100: "#fbe6e7", // blush-100
          200: "#f7cccf", // blush-200
          300: "#f1abb0", // blush-300
          400: "#e4838b", // blush-400
          500: "#d9848b", // blush (DEFAULT)
          600: "#c45f67", // blush-600
          700: "#a24550", // blush-700
          800: "#873a44", // blush-800
          900: "#73353e", // blush-900
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(45deg, #232226 0%, #3c4659 25%, #5988a6 50%, #8a8ba6 75%, #d9848b 100%)",
        "gradient-text":
          "linear-gradient(to right, #3c4659 0%, #5988a6 30%, #8a8ba6 60%, #d9848b 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-animate"),

    // Custom plugin for comprehensive gradient overrides
    plugin(({ addUtilities }) => {
      const newUtilities = {
        // Blue-based gradients
        ".bg-gradient-to-r.from-blue-500.to-blue-700": {
          backgroundImage:
            "linear-gradient(to right, #5988a6, #3c6379) !important",
        },
        ".bg-gradient-to-r.from-blue-600.to-blue-700": {
          backgroundImage:
            "linear-gradient(to right, #4a7a97, #3c6379) !important",
        },
        ".bg-gradient-to-r.from-blue-700.to-blue-800": {
          backgroundImage:
            "linear-gradient(to right, #3c6379, #304d5c) !important",
        },
        ".bg-gradient-to-r.from-blue-600.to-blue-800": {
          backgroundImage:
            "linear-gradient(to right, #4a7a97, #304d5c) !important",
        },

        // Blue to indigo gradients
        ".bg-gradient-to-r.from-blue-600.to-indigo-700": {
          backgroundImage:
            "linear-gradient(to right, #4a7a97, #3c4659) !important",
        },
        ".bg-gradient-to-r.from-blue-500.to-indigo-600": {
          backgroundImage:
            "linear-gradient(to right, #5988a6, #636e8a) !important",
        },
        ".bg-gradient-to-br.from-blue-600.to-indigo-800": {
          backgroundImage:
            "linear-gradient(to bottom right, #4a7a97, #313a49) !important",
        },

        // Indigo gradients
        ".bg-gradient-to-r.from-indigo-600.to-indigo-700": {
          backgroundImage:
            "linear-gradient(to right, #636e8a, #3c4659) !important",
        },

        // Add any other gradient patterns you find in your code
        ".bg-gradient-blue": {
          backgroundImage:
            "linear-gradient(to right, #5988a6, #3c4659) !important",
        },

        // For Artifact headers
        ".bg-blue-600": {
          backgroundColor: "#4a7a97 !important",
        },
        ".text-blue-200": {
          color: "#b5d5e6 !important",
        },
        ".text-blue-100": {
          color: "#daeaf3 !important",
        },

        // Border colors
        ".border-blue-700": {
          borderColor: "#3c6379 !important",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
