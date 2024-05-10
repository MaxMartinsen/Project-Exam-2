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
      sm: '370px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
      xxl: '1536px',
    },
    extend: {
      colors: {
        'mandys-pink': {
          300: '#ecbba8',
        },

        'fuscous-gray': {
          700: '#4e4e4e',
        },
        'mine-shaft': {
          900: '#333333',
        },

        'mountain-mist': {
          400: '#8f8f8f',
        },
        pelorous: {
          50: '#f0fafb',
          100: '#d8f0f5',
          200: '#b6e1eb',
          300: '#84cbdc',
          400: '#42a8c3',
          500: '#2f8fab',
          600: '#2a7490',
          700: '#285f76',
          800: '#285062',
          900: '#254354',
          950: '#142b38',
        },
      },
    },
    fontFamily: {
      body: ['Roboto', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      sans: ['Roboto', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      lato: ['Lato', 'sans-serif'],
    },
  },
  plugins: [flowbitePlugin, flowbite.plugin(), require('flowbite/plugin')],
};
