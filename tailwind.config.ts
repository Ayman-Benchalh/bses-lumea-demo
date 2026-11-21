import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Brand Primary Palette
        rose: {
          mist: "#F7E9E5",
          dusty: "#C78D9D",
          deep: "#A25D71",
          light: "#FCF6F4",
          border: "#EAD6D0",
        },
        sand: {
          warm: "#EEE2D0",
          light: "#F7F2EB",
          dark: "#CDB9A0",
        },
        espresso: {
          DEFAULT: "#43322F",
          light: "#5A4440",
          muted: "#765C57",
          dark: "#2A1E1C",
        },
        pearl: {
          white: "#FFFDFC",
          cream: "#FAF7F2",
          subtle: "#F4EFEA",
        },
        sage: {
          DEFAULT: "#9CAC9C",
          light: "#E1E8E1",
          soft: "#D4DFD4",
          dark: "#6F826F",
        },
        // Semantic Tokens
        semantic: {
          success: "#2E7D32",
          "success-bg": "#E8F5E9",
          warning: "#ED6C02",
          "warning-bg": "#FFF3E0",
          error: "#D32F2F",
          "error-bg": "#FFEBEE",
          info: "#0288D1",
          "info-bg": "#E1F5FE",
          focus: "#C78D9D",
          disabled: "#BDBDBD",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-arabic)", "Traditional Arabic", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(67, 50, 47, 0.04)",
        card: "0 8px 30px rgba(67, 50, 47, 0.06)",
        hover: "0 14px 40px rgba(67, 50, 47, 0.10)",
        floating: "0 20px 50px rgba(67, 50, 47, 0.15)",
        glass: "0 8px 32px 0 rgba(199, 141, 157, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

