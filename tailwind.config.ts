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
        primary: '#4b5320',
        secondary: '#78866b',
        blue: '#003A71',
        yellow: '#bdb76b',
        red: '#FF0',
        brown: '#7E3908',
        green: '#EAFBF3',
        darkGrey: "#616161",
        purpleButton: "#B3B3B3"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      sm: { max: "1060px" },
      md: { min: "1061px" },
    },
  },
  plugins: [],
};
export default config;
