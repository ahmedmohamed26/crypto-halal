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
        secondary: "#1f241f",
        gray: "#707070",
        darkPrimary: "#000101",
        liteBorder: "#758173",
      },
      fontSize: {
        "title-size": "3rem",
      },
    },
  },
  plugins: [],
};
export default config;
