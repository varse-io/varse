/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        panel: {
          background: '#18181b',
          border: '#27272a',
        },
        cta: {
          DEFAULT: '#fafafa',
          hover: '#eeeeee',
          text: '#18181b',
        },
        text: {
          1: '#fafafa',
          2: '#a1a1aa',
        },
      },
    },
  },
  plugins: [],
}