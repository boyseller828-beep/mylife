/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#bfe7ff',
          300: '#90d9ff',
          400: '#5cc0ff',
          500: '#2fa3ff',
          600: '#1c85f0',
          700: '#1d6fd1',
          800: '#1d5aa8',
          900: '#1d4d87',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
