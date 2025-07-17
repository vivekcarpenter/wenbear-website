/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 important
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0088cc",
        secondary: "#00aa55",
      },
      borderRadius: {
        button: "8px",
      },
    },
  },
  
};
