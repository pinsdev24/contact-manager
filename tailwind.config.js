/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f7fa',
        primary: '#6c63ff',
        secondary: '#ff6584',
        text: '#333',
      },
      borderRadius: {
        custom: '20px',
      },
      boxShadow: {
        custom: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}