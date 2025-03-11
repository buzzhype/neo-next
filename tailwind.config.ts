import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

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
        horizon: "#5988a6",
        blush: "#d9848b",

        // Functional colors mapped to brand colors
        background: "#f8fafc", // Will keep this light for now
        foreground: "#232226", // Using Neutral Black for text
        primary: {
          DEFAULT: "#5988a6", // Horizon as primary color
          light: "#8a8ba6", // Manatee as light variant
          dark: "#3c4659", // Charcoal as dark variant
        },
        secondary: "#8a8ba6", // Manatee
        accent: "#d9848b", // Blush as accent color
        success: "#5988a6", // Horizon for success
        warning: "#d9848b", // Blush for warning
        error: "#d9848b", // Blush for error but darker
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
        },
        content: {
          DEFAULT: "#232226", // Neutral Black
          secondary: "#3c4659", // Charcoal
        },
        border: "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        display: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        form: "42rem",
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
      strategy: "class", // use class strategy to avoid conflicts with custom styles
    }),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
