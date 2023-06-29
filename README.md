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

| feature/library      | Description | docs |
| ----------- | ----------- | ----------- |
| [SVGR](https://react-svgr.com/)      | A library that enables importing of svg files as React components | [App fails to build with Turbopack loader](https://github.com/vercel/next.js/issues/48140) |


## Issues

### notFound() during dev mode

The Triggering `notFound()` will cause the browser to make requests to the browser non-stop during dev mode. This is a known issue in the community but not yet addressed officially. https://github.com/vercel/next.js/discussions/50429. This will not happen in prod mode.

### Async Server Component Typescript error

To use an async Server Component with TypeScript, ensure you are using TypeScript 5.1.3 or higher and @types/react 18.2.8 or higher.

If you are using an older version of TypeScript, you may see a 'Promise<Element>' is not a valid JSX element type error. Updating to the latest version of TypeScript and @types/react should resolve this issue.

As a temporary workaround, you can add {/* @ts-expect-error Async Server Component */} above the component to disable type checking for it.

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

## Cache behavior

Next stores caches inside `.next`. Failing to clear cache may produce inconsistent behavior especially when running `yarn run build && yarn run start`. Manually removing the `.next` folder is recommended to clear the cache. 

## Fonts(Typography)

**Demo**: [www.localhost:3000/fonts](www.localhost:3000/fonts)

**folder**: `app/(fonts)`

With `'next font`,  CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. The result is zero layout shift and removes external network requests. It is recommended to use variable fonts.

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
      use: ["@svgr/webpack"]
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

## Data fetching

Data fetching is built on top of the `fetch()` Web API and React Server Components. When using `fetch()`, requests are automatically deduped by default.

Next.js extends the `fetch` options object to allow each request to set its own caching and revalidating.

| Types of fetching     | link demo | folder |
| ----------- | ----------- | ----------- |
| Static    | [http://www.localhost:3000/get-method/static]   | (REST)/get-method/static      |
| dynamic   | [http://www.localhost:3000/get-method/dynamic]       |(Rest)/get-method/dynamic      |

### Static data fetching

By default, fetch will automatically fetch and cache data indefinitely. 

Caching does not occur when:

- Dynamic methods (`next/headers`, `export const POST`, or similar) are used and the fetch is a`POST` request (or uses `Authorization` or `cookie` headers)

- fetchCache is configured to skip cache by default

- `revalidate: 0` or `cache: 'no-store'` is configured on individual fetch

### Dynamic fetching

To fetch fresh data on every fetch request, use the cache: 'no-store' option.


