/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
const flowbite = require('flowbite-react/tailwind');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
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
        'athens-gray': {
          50: '#eff2f7',
          100: '#e7ebf2',
          200: '#d4dce9',
          300: '#b6c5da',
          400: '#93a7c7',
          500: '#798db8',
          600: '#6778a9',
          700: '#5b689a',
          800: '#4e577f',
          900: '#424966',
          950: '#2b2f40',
        },
      },
    },
    fontFamily: {
      body: ['Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      sans: ['Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      poppins: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [
    flowbitePlugin,
    flowbite.plugin(),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
  ],
};
