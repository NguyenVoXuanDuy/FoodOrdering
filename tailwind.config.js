module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        standard: "1.25rem", // Padding tên custom
      },
      colors: {
        opacity: {
          15: ".15",
        },
        primary: {
          DEFAULT: "#fe761e",
        },
        secondary: {
          DEFAULT: "#0a1120",
        },
      },
    },
  },
  plugins: [],
};
