/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
const flowbite = require('flowbite-react/tailwind');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  Mode: 'media',
  theme: {
    screens: {
      sm: '435px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
    },
    extend: {
      colors: {
        'alizarin-crimson': {
          50: '#fdf3f3',
          100: '#fde3e3',
          200: '#fccccc',
          300: '#f8a9a9',
          400: '#f27777',
          500: '#e74c4c',
          600: '#d73d3d',
          700: '#b22323',
          800: '#932121',
          900: '#7b2121',
          950: '#420d0d',
        },
      },
    },
    fontFamily: {
      body: ['Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      sans: ['Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      poppins: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [flowbitePlugin, flowbite.plugin()],
};
