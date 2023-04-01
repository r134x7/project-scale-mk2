/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "colorChange1": "colorChange1 8s infinite",
        "colorChange2": "colorChange2 8s infinite",
        "colorChange3": "colorChange3 8s infinite",
      },
      keyframes: {
        colorChange1: {
          "0%": { backgroundColor: "rgb(103 232 249)"},
          // "20%": { backgroundColor: "rgb(34 211 238)"},
          // "40%": { backgroundColor: "rgb(6 182 212)"},
          // "60%": { backgroundColor: "rgb(8 145 178)"},
          // "80%": { backgroundColor: "rgb(14 116 144)"},
          // "100%": { backgroundColor: "rgb(21 94 117)"},
          "25%": { backgroundColor: "rgb(34 211 238)"},
          "50%": { backgroundColor: "rgb(6 182 212)"},
          "75%": { backgroundColor: "rgb(34 211 238)"},
          "100%": { backgroundColor: "rgb(103 232 249)"},
        },
        colorChange2: {
          "0%": { backgroundColor: "rgb(34 211 238)"},
          // "20%": { backgroundColor: "rgb(6 182 212)"},
          // "40%": { backgroundColor: "rgb(8 145 178)"},
          // "60%": { backgroundColor: "rgb(14 116 144)"},
          // "80%": { backgroundColor: "rgb(21 94 117)"},
          "25%": { backgroundColor: "rgb(6 182 212)"},
          "50%": { backgroundColor: "rgb(103 232 249)"},
          "75%": { backgroundColor: "rgb(6 182 212)"},
          "100%": { backgroundColor: "rgb(34 211 238)"},
        },
        colorChange3: {
          "0%": { backgroundColor: "rgb(6 182 212)"},
          "25%": { backgroundColor: "rgb(103 232 249)"},
          "50%": { backgroundColor: "rgb(34 211 238)"},
          "75%": { backgroundColor: "rgb(103 232 249)"},
          "100%": { backgroundColor: "rgb(6 182 212)"},
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
