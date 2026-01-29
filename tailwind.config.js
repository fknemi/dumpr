/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        rethink: ['rethink-sans-v7-latin-regular'],
        'rethink-medium': ['rethink-sans-v7-latin-500'],
        'rethink-semibold': ['rethink-sans-v7-latin-600'],
        'rethink-bold': ['rethink-sans-v7-latin-700'],
        'rethink-extrabold': ['rethink-sans-v7-latin-800'],
        'rethink-italic': ['rethink-sans-v7-latin-italic'],
        'rethink-medium-italic': ['rethink-sans-v7-latin-500italic'],
        'rethink-semibold-italic': ['rethink-sans-v7-latin-600italic'],
        'rethink-bold-italic': ['rethink-sans-v7-latin-700italic'],
        'rethink-extrabold-italic': ['rethink-sans-v7-latin-800italic'],
      },
    },
  },
  plugins: [],
};
