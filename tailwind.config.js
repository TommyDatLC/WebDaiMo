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
          DEFAULT: '#C62828',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          500: '#EF4444',
          600: '#DC2626',
          700: '#C62828',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        'ink-crimson': '#3B0D11',
        'signal-red': '#C62828',
        'imperial-gold': '#D97706',
        'radiant-amber': '#F59E0B',
        'slate-ochre': '#6B4F4F',
        'mist-amber': '#CDBBA7',
        'cloud': '#FAF7F2',
        'paper': '#ffffff',
        'pebble': '#F5EFE6',
        'hairline': '#EADBCA',
        'carbon': '#0a0a0a',
        'deep-bronze': '#854D0E',
      },
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        title: [
          '"Playfair Display"',
          'Philosopher',
          '"Cormorant Garamond"',
          'Georgia',
          'serif',
        ],
        display: [
          '"Playfair Display"',
          'Philosopher',
          '"Cormorant Garamond"',
          'Georgia',
          'serif',
        ],
        serif: [
          '"Playfair Display"',
          'Philosopher',
          '"Cormorant Garamond"',
          'Georgia',
          'serif',
        ],
      },
      borderRadius: {
        'cards': '24px',
        'productcards': '16px',
        'buttons': '8px',
        'inputs': '8px',
        'badges': '9999px',
      },
      boxShadow: {
        'card': '0 20px 40px -15px rgba(59, 13, 17, 0.08), 0 0 1px 1px rgba(234, 219, 202, 0.5)',
        'floating': '0 25px 50px -12px rgba(59, 13, 17, 0.15)',
        'warm-sm': 'rgba(107, 79, 79, 0.04) 0px 4px 5px 0px, rgba(107, 79, 79, 0.03) 0px 4px 10px 0px, rgba(107, 79, 79, 0.05) 0px 10px 20px 0px',
        'warm-md': 'rgba(107, 79, 79, 0.04) 0px 4px 5px 0px, rgba(107, 79, 79, 0.03) 0px 8px 15px 0px, rgba(107, 79, 79, 0.08) 0px 30px 50px 0px',
      }
    },
  },
  plugins: [],
}
