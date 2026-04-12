import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Essential for theme switching
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skyish: { 50: "#f8fafc", 500: "#0ea5e9", 600: "#0284c7" },
        neon: { cyan: "#22d3ee", lime: "#a3e635", purple: "#c084fc" },
        deepblack: "#050505",
      },
    },
  },
  plugins: [],
};
export default config;