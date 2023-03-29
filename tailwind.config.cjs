/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "colorChange": "colorChange 6s infinite",
      },
      keyframes: {
        colorChange: {
          "0%": { backgroundColor: "rgb(103 232 249)"},
          "20%": { backgroundColor: "rgb(34 211 238)"},
          "40%": { backgroundColor: "rgb(6 182 212)"},
          "60%": { backgroundColor: "rgb(8 145 178)"},
          "80%": { backgroundColor: "rgb(14 116 144)"},
          "100%": { backgroundColor: "rgb(21 94 117)"},
        }
      }
    },
  },
  plugins: [],
};
