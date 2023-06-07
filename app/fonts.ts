import { Arvo, Open_Sans } from 'next/font/google';
import CustomFont from 'next/font/local';

export const open_sans = Open_Sans({
  variable: '--open-sans',
  preload: false,
  display: 'fallback',
});

export const arvo = Arvo({
  weight: ['400', '700'],
  variable: '--arvo',
  preload: false,
  display: 'fallback',
});

// Used CustomFont() rather than localfont() because the latter is not working
// https://stackoverflow.com/questions/75439877/error-while-trying-to-add-external-local-fonts-in-nextjs
export const josefinSlab = CustomFont({
  src: '../public/fonts/josefinslab-variablefont_wght.ttf',
  variable: '--josefin-slab',
  display: 'fallback',
});

//single custom font with multiple fonts
export const gluten = CustomFont({
  src: [
    { path: '../public/fonts/gluten-regular.ttf', weight: '400' },
    { path: '../public/fonts/gluten-bold.ttf', weight: '700' },
  ],
  variable: '--gluten',
  display: 'fallback',
});
