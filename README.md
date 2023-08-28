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

<<<<<<< HEAD

## Middleware

**Demo** : [www.localhost:3000/with-middleware]

**folder** : `app/(protected-routes)/with-middleware`

# Middleware will be invoked for every route in your project by default but can be configured from specific paths. `middleware.ts` must be placed in the root folder.

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

## Parallel routing

### Parallel routing with slots

**Demo**: [www.localhost:3000/parallel-routes]
**Folder** : `/app/(parallel-routes)/parallel-routes`

Parallel Routing allows you to simultaneously or conditionally render one or more pages in the same layout.

Convention:

- `/app`
  - `/dashboard`
    - `@user`
      - `page.tsx`
    - `@info`
      - `page.tsx`
    - `page.tsx`
    - `layout.tsx`

```tsx
// /dashboard/layout.tsx
export default function Layout(props: {
  children: React.ReactNode;
  user: React.ReactNode;
  info: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.user}
      {props.info}
    </>
  );
}
```

The `@` notation marks the folder as a slot and can be used within layout.tsx.

With the above, `/dashboard` will show 2 slots and each slot will fetch it's content at the same time. They will render as soon as they are ready and are independent from each other. This means that if one slot encounters an error, that particular slot will render a fallback error page while the others render as normal.

#### Using parallel routes to create modals

```tsx
// /dashboard/layout.tsx
export default function Layout(props: {
  children: React.ReactNode;
  user: React.ReactNode;
  info: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.user}
      {props.info}
    </>
  );
}
```

With the above layout.tsx, the children: children, user and info exist within the page. It's up to you on how the component are rendered in the UI.

With some CSS tricks. This behavior can be taken advantaged and used to create modals.

You can see them in the below, you can ignore the notation (..) which is not essential at this stage:

**Demo**: [www.localhost:3000/modals] (Please run dev without turbo such as `yarn next dev` instead of `yarn next dev --turbo`, or run `yarn build && yarn start`)
**Folder**: `/app/(parallel-routes)/modals`

### Intercepting Routes

**Demo**: [www.localhost:3000/modals] (Please run dev without turbo such as `yarn next dev` instead of `yarn next dev --turbo`, or run `yarn build && yarn start`)
**Folder**: `/app/(parallel-routes)/modals`

Intercepting routes allows you to create standalone pages for the modal.

Using the previous photo gallery example:

- `/app`
  - `/photo-gallery`
    - `@my-modal`
      - `photos/[id]/page.tsx
      - `default.tsx`
    - `default.tsx`
    - `page.tsx`
    - `layout.tsx`

The pages within @my-modal renders as an overlay of the current layout. If you visit the `localhost:3000/photos/1` directly. You will see it as an overlay. What if I actually define the route by create a `photos` folder outside of @my-modal?

- `/app`
  - `/photo-gallery`
    - `@my-modal`
      - `photos/[id]/page.tsx <-----
      - `default.tsx`
    - `photos/[id]/page.tsx <-----
    - `default.tsx`
    - `page.tsx`
    - `layout.tsx`

If you visit `localhost:3000/photos/1`, it will render the contents in `/photo-gallery/photos/[id]/page.tsx` and overlayed by `@my-modal/photos/[id]/page.tsx`.

In order to have a proper standalone page for `/photo-gallery/photos/1`. We can implement intercepting routes by adding the (..) notation to the `photos` folder within `@my-modal`

- `/app`
  - `/photo-gallery`
    - `@my-modal`
      - `(.)photos/[id]/page.tsx <-----
      - `default.tsx`
    - `photos/[id]/page.tsx <-----
    - `default.tsx`
    - `page.tsx`
    - `layout.tsx`

This tells NextJS that if the route of the annotated folder is visited, it should intercept and display the matched route instead.

- (.) to match segments on the same level
- (..) to match segments one level above
- (..)(..) to match segments two levels above
- (...) to match segments from the root app directory

This way, you can customise how you want the standalone page to look like.

### Parallel routing issues

This parallel routing feature is not production ready and the community has found some bugs:

| Issue                             | Documentation                                                                                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Individual loading doesn't work   | (Next.js parallel routes are awesome (if they worked correctly))[https://www.youtube.com/watch?v=g5V6koptSXs]                                                                                                                                    |
| Modals do not work with turbopack | Modals don't show as modals in `/modals` with `next dev --turbo`                                                                                                                                                                                 |
| Inconsistancy                     | Sometimes `yarn build && yarn start` and `yarn next dev` will produce differenct behavior. For example, the slot may or may not render as a modal, etc. The best bet is to delete the `.next` folder, `yarn build && yarn start` to view the app |

#### Reading segments

Both `useSelectedLayoutSegment` and `useSelectedLayoutSegments` accept a parallelRoutesKey, which allows you read the active route segment within that slot.

```tsx
'use client';

import './global.css';
import GithubCorner from '../components/github-corner/GithubCorner';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Layout(props: {
  children: React.ReactNode;
  slot_one: React.ReactNode;
  slot_two: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment('slot_one');

  console.log('Segment is', segment);

  return (
    <html>
      <body>
        <GithubCorner />
        {props.children}
        {props.slot_two}
        {props.slot_one}
      </body>
    </html>
  );
}
```

The console log returns the string "children" if the argument is on slot_one and if navigated on slot_one, it will return the string 'children'.But according to the documentation, it should return the segment as a string, which should be '/slot_one'.
