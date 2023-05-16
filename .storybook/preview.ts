import '../styles/globals.css';

import type { Parameters } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { lightTheme, darkTheme } from '../lib/styling/styled-components/themes';

const GlobalStyles = createGlobalStyle``;

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    Provider: ThemeProvider,
    defaultTheme: 'light',
  }),
];

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
