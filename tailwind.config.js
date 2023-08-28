/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      // this sets the overall font
      sans: ['Verdana'],
      // the first in the array will be loaded first, while it waits to load,
      // it will load the second font in line which acts as a fallback
      primary: ['var(--open-sans)', 'ui-sans-serif'],
      secondary: ['var(--arvo)'],
      josefin: ['var(--josefin-slab)'],
      gluten: ['var(--gluten)'],
    },
    // customize responsive breakpoints
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: 'rgb(115,203,153)',
        secondary: 'rgb(237,161,24)',
        warning: 'rgb(252,69,96)',
      },
    },
  },
  plugins: [],
};
