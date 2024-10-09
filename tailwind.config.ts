import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2962",
        black: "#000000",
        yellow: "#FFBB00",
        gray: "#707070",
        darkPrimary: "#000101",
        liteBorder: "#758173",
      },
      fontSize: {
        titleSize: "3rem",
        size16: "16px",
        size18: "18px",
        size20: "20px",
        size22: "22px",
        size24: "24px",
      },
      backgroundImage: {
        "hero-image": "url('/public/assets/intro.png')",
      },
    },
  },
  plugins: [],
};
export default config;
