# Fonts

`'next font` automatically optimize your fonts with zero layout shift and remove external network requests.

## Google fonts

Use google fonts by installing `next/font/google`. This way fonts are included in the deployment and served from the same domain as your deployment. No requests are made to Google by the browser.

```
import { Inter } from 'next/font/google';
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Fonts with Tailwind

This repo implements fonts using Tailwind. You can see how it is introduced in the root `layout.tsx`, `tailwind.config.js`, and `(fonts)`.

## Local fonts