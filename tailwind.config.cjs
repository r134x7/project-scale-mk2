/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "colorChange1": "colorChange1 5s infinite",
        "colorChange2": "colorChange2 5s infinite",
        "colorChange3": "colorChange3 5s infinite",
      },
      keyframes: {
        colorChange1: {
          "0%": { backgroundColor: "rgb(103 232 249)"},
          // "20%": { backgroundColor: "rgb(34 211 238)"},
          // "40%": { backgroundColor: "rgb(6 182 212)"},
          // "60%": { backgroundColor: "rgb(8 145 178)"},
          // "80%": { backgroundColor: "rgb(14 116 144)"},
          // "100%": { backgroundColor: "rgb(21 94 117)"},
          "50%": { backgroundColor: "rgb(34 211 238)"},
          "100%": { backgroundColor: "rgb(6 182 212)"},
        },
        colorChange2: {
          "0%": { backgroundColor: "rgb(34 211 238)"},
          // "20%": { backgroundColor: "rgb(6 182 212)"},
          // "40%": { backgroundColor: "rgb(8 145 178)"},
          "50%": { backgroundColor: "rgb(6 182 212)"},
          // "60%": { backgroundColor: "rgb(14 116 144)"},
          // "80%": { backgroundColor: "rgb(21 94 117)"},
          "100%": { backgroundColor: "rgb(103 232 249)"},
        },
        colorChange3: {
          "0%": { backgroundColor: "rgb(6 182 212)"},
          "50%": { backgroundColor: "rgb(103 232 249)"},
          "100%": { backgroundColor: "rgb(34 211 238)"},
          // "0%": { backgroundColor: "rgb(14 116 144)"},
          // "20%": { backgroundColor: "rgb(21 94 117)"},
          // "40%": { backgroundColor: "rgb(103 232 249)"},
          // "60%": { backgroundColor: "rgb(34 211 238)"},
          // "80%": { backgroundColor: "rgb(6 182 212)"},
          // "100%": { backgroundColor: "rgb(8 145 178)"},
        }
      }
    },
  },
  plugins: [],
};
