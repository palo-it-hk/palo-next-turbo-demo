/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Verdana'],
      primary: ['var(--open-sans)', 'ui-sans-serif'],
      secondary: ['var(--arvo)'],
    },
    extend: {},
  },
  plugins: [],
};
