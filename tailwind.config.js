// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1.6rem", // default rem size (16px equivalent)
        sm: "1.4rem",
        lg: "1.8rem",
      },
      colors: {
        gray: {
          900: "#202124",
          800: "#303134",
          700: "#3C4043",
          500: "#9AA0A6",
          400: "#BDC1C6",
        },
      },
    },
  },
};
