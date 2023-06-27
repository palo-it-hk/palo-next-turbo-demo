/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      // this sets the overall font 
      sans: ['Verdana'],
      // the first in the array will be loaded first, while it waits to load,
      // it will load the second font in line which acts as a fallback
      primary: ['var(--open-sans)', 'ui-sans-serif'],
      secondary: ['var(--arvo)'],
      josefin:['var(--josefin-slab)'],
      gluten:['var(--gluten)']
    }
  },
  plugins: [],
};
