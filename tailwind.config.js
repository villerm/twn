/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00AFF0'
        },
        blue: {
          light: '#EAF8FE',
          dark: '#0093CA'
        },
        gray: {
          1: '#3a3d57',
          2: '#333333',
          3: '#4e5168'
        },
        green: {
          1: '#14cc76',
          2: '#37945C',
          3: '#41e592'
        },
        pink: {
          1: '#ff57a2'
        }
      },
      fontFamily: {
        main: ['BoosterNextFY', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
