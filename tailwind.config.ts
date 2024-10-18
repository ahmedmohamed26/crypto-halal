import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // screens: {
      //   sm: { max: "480" },
      //   md: { max: "991" },
      //   lg: { max: "992" },
      // },
      screens: {
        sm: "320px",
        md: "481px",
        lg: "769px",
      },
      colors: {
        primary: "#0B2962",
        black: "#000000",
        yellow: "#FFBB00",
        gray: "#F1F7FD",
        darkGray: "#667085",
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
    },
  },
  plugins: [nextui()],
};
export default config;
