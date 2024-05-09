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
        zinnwaldite: {
          50: '#fdf6f3',
          100: '#fbece5',
          200: '#f9dccf',
          300: '#f6cebc',
          400: '#ec9f7d',
          500: '#df7f54',
          600: '#cb6537',
          700: '#ab522a',
          800: '#8d4727',
          900: '#763f26',
          950: '#401e0f',
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
