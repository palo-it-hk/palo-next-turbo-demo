# Next.js + Turbopack App Directory Playground

[Turbopack](https://turbo.build/pack) is a new incremental bundler optimized for JavaScript and TypeScript, written in Rust by the creators of Webpack and Next.js at [Vercel](https://vercel.com). On large applications Turbopack updates 10x faster than Vite and 700x faster than Webpack ([benchmark](https://turbo.build/pack/docs/benchmarks)). For the biggest applications the difference grows even more stark with updates up to 20x faster than Vite.

This playground is a mirror of the [Next.js v13 App Directory Playground](https://github.com/vercel/app-playground), but uses Turbopack as the Next.js development server (`next dev --turbo`).

**As a reminder, Turbopack is currently in beta and not yet ready for production. We appreciate your ongoing support as we work to make it ready for everyone.**

## Running Locally

1. Install dependencies: `yarn`
2. Start the dev server: `yarn dev`

## Running Storybook

1. Install dependencies: `yarn`
2. Start the dev server: `yarn storybook`

**Note:** The playground uses [Tailwind CSS](https://tailwindcss.com) via [PostCSS](https://turbo.build/pack/docs/features/css#postcss).

For more information, see: https://turbo.build/pack/docs/features/css#tailwind-css

## Documentation

https://nextjs.link/with-turbopack

## Features not yet supported by Turbopack

| feature/library                 | Description                                                       | docs                                                                                       |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [SVGR](https://react-svgr.com/) | A library that enables importing of svg files as React components | [App fails to build with Turbopack loader](https://github.com/vercel/next.js/issues/48140) |
| Server rendered CSS-in-JS | CSS-in-JS styling such as styled-components, kuma-ui, styled-jsx, etc cannot be server rendered | [css-in-js](https://nextjs.org/docs/app/building-your-application/styling/css-in-js) |

## Issues

### notFound() during dev mode

The Triggering `notFound()` will cause the browser to make requests to the browser non-stop during dev mode. This is a known issue in the community but not yet addressed officially. https://github.com/vercel/next.js/discussions/50429. This will not happen in prod mode.

### Async Server Component Typescript error

To use an async Server Component with TypeScript, ensure you are using TypeScript 5.1.3 or higher and @types/react 18.2.8 or higher.

If you are using an older version of TypeScript, you may see a 'Promise<Element>' is not a valid JSX element type error. Updating to the latest version of TypeScript and @types/react should resolve this issue.

As a temporary workaround, you can add {/_ @ts-expect-error Async Server Component _/} above the component to disable type checking for it.

### API

Throughout this repo, you will see that `/app` will be used as the API to store, produce and fetch data. This is for demo purposes and unlikely to reflect real use-cases.

Pre-rendering static pages that depend on Next APIs will not work properly during prod mode. This is because the APIs are not hosted yet by the time Next is rendering the static pages, therefore unable to resolve the fetch by the time it is rendering.

Read more on [static and dynamic rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering)

```typescript
// page.tsx

async function getData() {
  const res = await fetch('http://localhost:3000/api/data/');
  // await fetch('/api/data/posts') will not work also

  return res.json();
}

export default async function Page() {
  const res: { allPosts: Post[] } = await getData();

  const posts = res.allPosts;

  return (
    <>
      <PostList posts={posts} />
    </>
  );
}

// The above will not render the data
```

You do not see this problem in dev mode because pages are pre-rendered twice.

### CORS

Sometimes you may receive a CORS error from the client side. You can try solving it by deleting the .next file and rebuild.

## Cache behavior

Next stores caches inside `.next`. Failing to clear cache may produce inconsistent behavior especially when running `yarn run build && yarn run start`. Manually removing the `.next` folder is recommended to clear the cache.

## Fonts(Typography)

**Demo**: [www.localhost:3000/fonts](www.localhost:3000/fonts)

**folder**: `app/(fonts)`

With `'next font`, CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. The result is zero layout shift and removes external network requests. It is recommended to use variable fonts.

### Google fonts

Use google fonts by installing `next/font/google`. This way fonts are included in the deployment and served from the same domain as your deployment. No requests are made to Google by the browser.

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

### Fonts with Tailwind(local and google)

This repo implements imported and local fonts using Tailwind and `next/font/google` and `next/font/local`. You can see how it is introduced in the root `layout.tsx`, configured in `tailwind.config.js`, and implemented in the demo.

## Assets

**Demo**: [www.localhost:3000/static-assets](www.localhost:3000/static-assets)

**folder**: `app/(static assets)`

Static files such as images in the `public` in the root directly. Once inside, they can be referenced, by your code starting from the base URL (`/`).

- It's the only directory to serve static assets
- Also where the `robots.txt` and `favicon.ico` are stored
- The file name of the asset should not share the same name as any files in the `app`(ie: if you image is `demo.jpg`, the name will clash with a page that is named `/demo`)
- Only assets that are in the public directory at build time will be served by Next.js. Files added at runtime won't be available. We recommend using a third party service like AWS S3 for persistent file storage.

In webpack and some other frameworks, importing an image returns a string containing that image' URL, but in Next, it returns an object. This is so it can be fed into Next's `<Image>` component as part of optimization.

### SVGs with SVGR

SVGR is a tool that allows us to import SVGs into your React applications as React components.

### Install

1. Install package

`yarn add --dev @svgr/webpack`

2. next.config.js

```typescript
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // ... Other configs
};

module.exports = nextConfig;
```

3. Run. Since turbopack doesn't support SVGR yet, you need to run `yarn next dev` instead `yarn next dev --turbo`

#### issues with Turbopack and SVGR

Although the below is the official way to integrate loaders with Turbopack, it will throw an error: `Processing image failedFailed to parse svg source code for image dimensions`.

```typescript
// next.config.js

experimental: {
    // Required:
    appDir: true,
    turbo: {
      loaders: {
        ".svg":['@svgr/webpack']
      }
    }
  },

```

The issue is documented in the below:

[[turbopack] SVG via svgr support](https://github.com/vercel/turbo/issues/4832)
[App fails to build with Turbopack loader](https://github.com/vercel/next.js/issues/48140)

To use SVGR without turbopack, follow the install steps above and run `yarn next dev`.

## Middleware

**Demo** : [www.localhost:3000/with-middleware]

**folder** : `app/(protected-routes)/with-middleware`

Middleware will be invoked for every route in your project by default but can be configured from specific paths.  `middleware.ts` must be placed in the root folder.

## Data fetching

Data fetching is built on top of the `fetch()` Web API and React Server Components. When using `fetch()`, requests are automatically deduped by default.

Next.js extends the `fetch` options object to allow each request to set its own caching and revalidating.

| Types of fetching | link demo                                      | folder                     |
| ----------------- | ---------------------------------------------- | -------------------------- |
| Static            | [http://www.localhost:3000/get-method/static]  | (REST)/get-method/static   |
| dynamic           | [http://www.localhost:3000/get-method/dynamic] | (Rest)/get-method/dynamic  |
| parallel          | [http://localhost:3000/get-method/parallel]    | (REST)/get-method/parallel |

### Static data fetching

By default, fetch will automatically fetch and cache data indefinitely.

Caching does not occur when:

- Dynamic methods (`next/headers`, `export const POST`, or similar) are used and the fetch is a`POST` request (or uses `Authorization` or `cookie` headers)

- fetchCache is configured to skip cache by default

- `revalidate: 0` or `cache: 'no-store'` is configured on individual fetch

### Dynamic fetching

To fetch fresh data on every fetch request, use the cache: 'no-store' option.

### Parallel fetching

We can save time by initiating fetch requests in parallel, however, the user won't see the rendered result until both promises are resolved.

## Dynamic routes

**demo**: www.localhost:3000/cat-profile/<choose a value between 1 to 3>

**folder** : `/app/(not-found)/cat-profile)` 

A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName]. For example, [id] or [slug].

### Generate dynamic routes on build time

The `generateStaticParams` function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

The function returns a list of `params` to populate the dynamic segment.

#### Single dynamic segment (ie: /product/[id]):

This demo intends to be a page of a product based on product ID. 

**demo**: www.localhost:3000/product/<choose a value between 1 to 100>

**folder** : `/app/(generateStaticParams)/product`

#### multiple dynamic segment (ie: /[brandName]/[productCategory]):

This demo intends to be a page of a category of product of a brand. 

For a full list brand name and categories, run a `GET` request to `https://dummyjson.com/products`

**demo**: www.localhost:3000/<brand-name>/<product-category> (ie:www.localhost:3000/apple/smartphones )  

**folder** : `/app/(generateStaticParams)/[brandName]/[productCategory]]`

#### Catch all segments

`app/product/[...slug]/page.tsx`

```typescript
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params
  // ...
}
```
## Styling

NextJS supports the following styling methods:

- CSS Modules
- Tailwind CSS
- CSS-in-JS
- Sass

| styling choice    | demo | folder |
| ----------- | ----------- |----------- |
| CSS Modules     | [www.localhost:3000/css-modules] | `app/(styling)/css-modules` |
| tailwind     | [www.localhost:3000/tailwind] | `app/(styling)/tailwind` |
| CSS-in-JS     | [www.localhost:3000/css-in-js] | `app/(styling)/css-in-js` |
| Sass     | [www.localhost:3000/sass] | `app/(styling)/sass` |


## CSS Modules

CSS Modules are an optional feature and are only enabled for files with the .module.css extension. Regular `<link>` stylesheets and global CSS files are still supported.

## Tailwind

One of the advantages of Tailwind is it is usable in server components unlike CSS-in-JS libraries You configure Tailwind in the `tailwind.config.js` in the root folder. You do not need to modify `postcss.config.js`.

To apply it, you do it in `app/globals.css` and import it in `app/layout.tsx`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

After installing Tailwind CSS and adding the global styles, you can use Tailwind's utility classes in your application.

## CSS-in-JS

CSS-in-JS libraries which require runtime JavaScript are not currently supported in Server Components.

If you want to style Server Components, we recommend using CSS Modules or other solutions that output CSS files, like PostCSS or Tailwind CSS.

To implement Styled-components, you (1) define the style registry, (2) Wrap the children of the root layout with the style registry component

Defining the style registry:

```typescript
// lib/registry.tsx
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
 
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') return <>{children}</>
 
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

Wrap it in the root layout:

```typescript
//app/layout,tsx
import StyledComponentsRegistry from './lib/registry'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
```

## Sass

Next.js has built-in support for Sass using both the `.scss` and `.sass` extensions. You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

### If you run into the error: `selector “body” is not pure (pure selectors must contain at least one local class or id) – error in NextJs`

You can't directly have simple element selectors like the below in module.css:

```css
body {/* rules here */}
/* or */
div {/* rules here */}
```

You would've put them in globals for general selectors like that.

To solve this error, you need to add classNames:

```css
body.test {
    border: 2px solid blue;
}
```

and use them in the component like the below:

```tsx
import styles from './styles.module.css';
export default function StyledRootLayout({ children }) {
  return (
    <html>
      <head />
      <body className={`${styles.test}`}>{children}</body>
    </html>
  )
}
```

## Global styles

A global styles sheet can be applied by creating a css file such as `globals.css`and then import it in `app/layout.tsx`

``` typescript
// These styles apply to every route in the application
import './global.css'
// you can import external packages this way
import 'bootstrap/dist/css/bootstrap.css'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

In the global style sheet, you can import dependencies from Tailwind. In our `styles/globals.css`, the theme configured in `tailwind.config.js` such as font family and colors can be retrieved by using `theme()` or `@apply`

`styles/globals.css`

```css
h3 {
    font-family: theme('fontFamily.gluten');
    color: theme('colors.secondary')
  }

h4 {
    @apply text-primary
}
```

**Note**: If you disable JavaScript, styles will still be loaded in the production build (next start). However, JavaScript is still required for next dev to enable Fast Refresh.
