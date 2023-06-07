# Fonts

`'next font` automatically optimize your fonts with zero layout shift and remove external network requests. It is recommended to use variable fonts.

## Google fonts

Use google fonts by installing `next/font/google`. This way fonts are included in the deployment and served from the same domain as your deployment. No requests are made to Google by the browser.


`/app/layout.tsx`
```typescript
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

## Fonts with Tailwind(local and google)

This repo implements imported and local fonts using Tailwind and `next/font/google` and `next/font/local`. You can see how it is introduced in the root `layout.tsx`, configured in `tailwind.config.js`, and implemented in `(fonts)`.

## Preloading

