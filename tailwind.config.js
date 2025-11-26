/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        bg: "var(--color-bg)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        main: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"]
      },
      backgroundImage: {
        "main-gradient": "var(--gradient-main)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        soft: "var(--shadow-soft)",
      },
      backdropBlur: {
        card: "var(--blur-card)",
      }
    },
  },
  plugins: [],
};
