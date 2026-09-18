/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B4DF5',
          50: '#F4F2FF',
          100: '#E9E6FF',
          200: '#D5D0FE',
          500: '#5B4DF5',
          600: '#4D3EE0',
          700: '#3F30C8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      boxShadow: {
        'card': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
