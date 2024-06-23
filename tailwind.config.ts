import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        highlight: "highlight 3s linear",
      },
      keyframes: {
        highlight: {
          from: { backgroundColor: "yellow" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
