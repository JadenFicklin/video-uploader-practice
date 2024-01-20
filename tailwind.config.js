/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '290px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px'
    },
    extend: {
      colors: {
        theme: '#F87171',
        backgroundColor: '#FAFBFF',
        text: '#000000'
      }
    }
  },
  plugins: []
};
