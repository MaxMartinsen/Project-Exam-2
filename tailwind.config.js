/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '435px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
    },
    extend: {
      colors: {},
    },
    fontFamily: {
      body: [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      sans: [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      poppins: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [],
};
