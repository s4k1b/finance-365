/* eslint-disable no-undef */
module.exports = {
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: [
        'grid-cols-4',
        'gap-4',
        'text-green-500',
        'text-gray-500',
        'text-red-500',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      height: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}
