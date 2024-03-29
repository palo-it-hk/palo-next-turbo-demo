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

## Features covered in this documentation

1. Concepts
   - Caching
   - prefetching
   - Static and dynamic rendering
   - Navigation (soft & hard)
   - Streaming
   - Project organization
2. Routing
   - Special files
     - default.tsx
     - error.tsx
     - layout.tsx
     - loading.tsx
     - not-found.tsx
     - page.tsx
     - route.tsx
     - template.tsx
   - Dynamic routes & catch-all segments
   - Parallel Routes
   - Intercepting routes
   - Middleware

3) Rendering
   - Static rendering
   - Dynamic rendering
4) Data fetching
   - Fetching
     - Static fetching
     - Dynamic fetching
     - Parallel fetching
     - Sequential data fetching
     - Third party data fetching (WIP)
   - Caching
   - Revalidation
   - Server Actions
5) Syntax
   - <Link>
6) Functions
   - usePathname()
   - useRouter()
   - revalidatePat()h & revalidateTag()
   - generateStaticParams()
   - dynamic() (WIP)
7) Styling
   - CSS Modules
   - Tailwind CSS
   - CSS-in-JS
   - Sass
8) Assets
   - images
   - Fonts
9) Optimizing
   - Metadata
   - State Management
10) Others
    - Security

### Functions(Usage can be found across this readme)

- Draft mode (WIP)
- Accessability

## Features not yet supported by Turbopack

| feature/library                 | Description                                                       | docs                                                                                       |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [SVGR](https://react-svgr.com/) | A library that enables importing of svg files as React components | [App fails to build with Turbopack loader](https://github.com/vercel/next.js/issues/48140) |
| Modals with Parallel routes     | Modals will not work when running dev mode with turbo             |                                                                                            |

## Features not yet supported by Server components

| feature/library           | Description                                                                                     | docs                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
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

## 1. Concepts

### Caching

There are of caching bahaviors both in the client-side and server-side:

#### client-side

Also known as Router Cache, this is a client side caching feature. As users navigates between pages, the visited pages are cached as well as page links wrapper with `<Link>` when they are physically hovered over. This allows a quick and seamless browsing experience.

The React Server Component Payload is stored in the client-side Router Cache - a separate in-memory cache, split by individual route segment. This Router Cache is used to improve the navigation experience by storing previously visited routes and prefetching future routes.

On subsequent navigations or during prefetching, Next.js will check if the React Server Components Payload is stored in Router Cache. If so, it will skip sending a new request to the server.

If the route segments are not in the cache, Next.js will fetch the React Server Components Payload from the server, and populate the Router Cache on the client.

#### Server-side

##### Request memoization

If you make the same call multiple times in the same React component tree, you might make the fetch on the top most component and pass the data down as props. With React's request memoization, fetch results are cached so that when you call the same fetch the second time, NextJS will automatically retrieve the fetch results from the cache so you don't have rely on state management or props.

Please note that:

- Memoization only applies to GET requests
- Does not apply within `route.tsx`

To opt out of memoization:

```typescript
const { signal } = new AbortController();
fetch(url, { signal });
```

##### Full route cache

Next.js automatically renders and caches routes at build time. Therefore if you have side effects that are in `route.ts` such as console logs and setTimeouts It will only run in build time.

If you have a POST method in `route.ts` or have `export const revalidate = 0` or `export const dynamic = 'force-dynamic'` on top of the `route.ts`, it will disable the caching.

##### Data cache

Next.js has a built-in Data Cache that persists the result of data fetches.

The first time a fetch request is called during rendering, Next.js checks the Data Cache for a cached response and will cache it if it's not found.

Revalidation controls how often a fetch method can be reached to the API. The revalidation period can be set in seconds such as:

```typescript
// Revalidate at most every hour
fetch('https://...', { next: { revalidate: 3600 } });
```

And can also be revalidated on demand using `revalidatePath` and `revalidateTag` which are both explained in more detail in this Readme.

Please note that if the route has full route cache enabled, even if the revalidation time is up and the the call to the API is allowed, you are still fetching cached data because Next.js automatically renders and caches routes at build time.

This means that if you are fetching the current time with this route using no-cache or no-store:

```typescript
// api/time/route.ts
export async function GET(request: NextRequest) {
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}
```

The value of currentTime is still whenever the server was built because it is cached due to full route cache.

To fix it, add `export const revalidate = 0`:

```typescript
export const revalidate = 0;
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('time GET()');
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}
```

```typescript
await fetch('http:localhost:3000/api/data/time', {
  cache: 'no-cache',
});

await fetch('http:localhost:3000/api/data/time', {
  cache: 'no-store',
});
```

The no-cache option is the same as no-store.

### Prefetching

NextJS improves user experience by allowing quicker navigation by prefetching pages that are not currently in view.

When a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render - improving the navigation experience and performance.

The pre-fetched page is stored in the client-side called the Router Cache.

Only the route segments that change on navigation re-render on the client, and any shared segments are preserved. Which means if the 2 pages share the same component or layout, it will not be rerendered. This is also known as Partial Rendering.

If a link is wrapped using Next's `<Link>`, prefetching will occur in the background when the link is hovered over. More info in the `<Link>` section.

### Static and dynamic rendering

#### Static rendering

By default, Next.js statically renders routes to improve performance. At build time, Server and Client components are rendered on the server, and the result of the work is cached and reused on subsequent requests.

Note that:

- If you have a console.log in client components, it will also print in the server side.
- If you are fetching data from `/api` and the fetch method is not revalidate-able, then your page will never show data.

#### Dynamic rendering

With Dynamic Rendering, both Server and Client Components for a route are rendered on the server at request time.

During rendering, if a dynamic function (see Dynamic functions) or uncached data request is discovered, Next.js will switch to dynamically rendering the whole route because the rendering needs info that can only be acquired by client-side input.

### Navigation (soft & hard)

There are two ways to navigate between routes in Next.js:

- Using the `<Link>` Component
- Using the useRouter Hook, that allows you to programmatically change routes

When a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render. Partial rendering will be done if there are shared segments.

And in soft navigation, it also preserves React and browser state, and there is no full page reload, which contrasts with classical browser navigation (hard navigation) that refreshes state.

### Streaming

To improve user experience during loading times, NextJS has a specially reserved file `loading.tsx` that can be rendered automatically once the `page.tsx` is running async activities such as fetching.

One of the limitations of traditional SSR is that the page has to have all the JSONs before the page can be rendered. Furthermore, it is a blocking processing where one fetching process has to wait for the completion of the previous.

With React's `<Suspense>`, the server can first render and show the skeleton while have components that are wrapped in `<Suspense>` to fetch and render as soon as they are ready while doing so concurrently with other suspense wrapped components. Such is demo'd in `/src/app/(rendering)/progressive-rendering`

If you want more important content to render first, you can control the sequence as demo'd in `/src/app/(rendering)/sequential-rendering`.

More info is in this README on `loading.tsx`, sequential and progressive rendering.

### Project Organization

#### Routing

Routes are made accessible in the browser by defining a `page.tsx` within the `/app` as well as sub-folders inside it. Since only the content in `page.tsx` is shown to the client, it means that you can create other files that are not `page.tsx` without conflict.

- app
  - dashboard
    - page.tsx
    - Hero.tsx

The above Hero.tsx file will not effect the showing of `page.tsx` when the browser loads `/dashboard`.

#### Private folders

You can create private folders in `/app` to opt out of routing but prefixing the folder name with an underscore. For example naming a folder as `_example`

#### Route groups

In the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

Example:

- app
  - (users)
    - layout.tsx
    - login
      - page.tsx
    - dashboard
      - page.tsx

In the above the URL to reach the dashboard is localhost:3000/layout and localhost:3000/dashboard. You can also add a layout which can be shared amongst them.

You can also create multiple root layouts this way:

- app
  - (users)
    - layout.tsx
    - user-login
      - page.tsx
    - user-dashboard
      - page.tsx
  - (admin)
    - layout.tsx
    - admin-login
      - page.tsx
    - admin-dashboard
      - page.tsx

Be careful that the folder structuring does not resolve into the same url.

If you use multiple root layouts without a top-level `layout.tsx` file, your home `page.tsx` file should be defined in one of the route groups, For example: app/(marketing)/page.tsx.

Take note that, navigating across multiple root layouts will cause a full page load.

## 2. Routing

By default, components inside `app/` are React Server Components. To use client-side rendering, add `'use client';` before on the top of your components file.

```tsx
'use client';

export default function Page() {}
```

### Special files

| File Conventions | link demo                     | folder                                                  |
| ---------------- | ----------------------------- | ------------------------------------------------------- |
| page.tsx         | Available throughout the repo | Available through the the repo                          |
| layout.tsx       | /page-and-nested-page-demo    | `/src/app/(layout-vs-template)`                         |
| loading.tsx      | /suspense-with-loadingtsx     | `/src/app/(suspense boundary)/suspense-with-loadingtsx` |
| not-found.tsx    | /cat-profile/<1 - 2>          | `/src/app/(not-found)`                                  |
| error.tsx        | /error-route                  | `/src/app/(error-boundary)`                             |
| route.ts         | GET /api/data/                | `/src/app/api`                                          |
| template.tsx     | /page-and-nested-page-demo    | `/src/app/(layout-vs-template)`                         |

#### page.tsx

Replaces index.ts in the Nextjs version that uses pages for the UI.

#### layout.tsx

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render.

- The top-most layout is called the Root Layout. This required layout is shared across all pages in an application. Root layouts must contain html and body tags.
- To create multiple root layouts, you can have a layout.tsx in each route group

For example:

- App
  - (marketing)
    - layout.tsx
  - (shop)
    - layout.tsx

_Notes on Rendering_: Aside from the root `layout.tsx`, `layout.tsx`s can be client side components, without automatically turning it's children into client components. However lets say you have a `page.tsx` that you've made into a client component by adding `use client`, then the children components are automatically turned into client components, even if you don't add `use client` into them. Which means child components of client components will be re-rendered everytime the wrapper updates. Whereas in server components, if their children components don't change, then the children will not reload.

#### loading.tsx

This component will be rendered whenever the suspense boundary is triggered.

#### not-found.tsx

This component will rendered when a `notFound()` is triggered.

#### error.tsx

The error.js file convention allows you to gracefully handle runtime errors in nested routes It does it by automatically creating an React Error Boundary that wraps a nested child segment or page.tsx component. The error.tsx must be a client component.

#### route.tsx

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

Any file inside the folder pages/api is mapped to /api/\* and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.

A route file allows you to create custom request handlers for a given route. The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

The following defines a GET request:

```typescript
// /app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello world!',
  });
}
```

#### template.tsx

Templates are similar to layouts in that they wrap each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized.

### Route segment config

## Middleware

**Demo** : [www.localhost:3000/with-middleware]

**folder** : `app/(protected-routes)/with-middleware`

Middleware will be invoked for every route in your project by default but can be configured from specific paths. `middleware.ts` must be placed in the root folder.

## 5. Syntax

### Link

`<Link>` is a React component that extends the HTML `<a>` element to provide prefetching and client-side navigation between routes.

The prefetch feature of NextJS allows the prefetching of the website. For example, if a link that uses `<Link>` is hovered over. It will prefetch the page in the background.

The fetching behavior is different for static and dynamic sites.

Static: prefetch defaults to `true`. The entire route is prefetched and cached.

dynamic: Because the fetch methods in the dynamic page are not prefetched, only the static content such as shared layout down until the first loading.js file is prefetched and cached for 30s. This reduces the cost of fetching an entire dynamic route, and it means you can show an instant loading state for better visual feedback to users.

#### Limitations

Next.js has an in-memory client-side cache called the Router Cache. As users navigate around the app, the React Server Component Payload of prefetched route segments and visited routes are stored in the cache.

`<Link>` is a form of soft navigation that uses cache, which is an issue in cases where you'd like to rebuild the page upon navigation in order to show updated content.

To opt out of caching, you can use the good ol' `<a>` tag but will lose the prefetch function.

## Cache behavior

Next stores caches inside `.next`. Failing to clear cache may produce inconsistent behavior especially when running `yarn run build && yarn run start`. Manually removing the `.next` folder is recommended to clear the cache.

## Assets

### Images (Static Assets)

**Demo**: [www.localhost:3000/static-assets](www.localhost:3000/static-assets)

**folder**: `app/(static assets)`

Static files such as images in the `public` in the root directly. Once inside, they can be referenced, by your code starting from the base URL (`/`).

- It's the only directory to serve static assets
- Also where the `robots.txt` and `favicon.ico` are stored
- The file name of the asset should not share the same name as any files in the `app`(ie: if you image is `demo.jpg`, the name will clash with a page that is named `/demo`)
- Only assets that are in the public directory at build time will be served by Next.js. Files added at runtime won't be available. We recommend using a third party service like AWS S3 for persistent file storage.

In webpack and some other frameworks, importing an image returns a string containing that image' URL, but in Next, it returns an object. This is so it can be fed into Next's `<Image>` component as part of optimization.

```tsx
<Image src="/spinner.gif" width={50} height={50} alt="spinner" />
```

In the above, `/spinner.gif` is provided for a remote image. This is possible because of the loader architecture.

A loader is a function that generates the URLs for your image. It modifies the provided src, and generates multiple URLs to request the image at different sizes.

The default loader for Next.js applications uses the built-in Image Optimization API, which optimizes images from anywhere on the web, and then serves them directly from the Next.js web server.

If you are using the default loader, you have to install sharp by `yarn add sharp`.

To define your own loader:

```tsx
'use client';

import Image from 'next/image';

const imageLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function Page() {
  return (
    <Image
      loader={imageLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
}
```

### SVGs with SVGR

SVGR is a tool that allows us to import SVGs into your React applications as React components.

##### Install

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

##### issues with Turbopack and SVGR

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

### Fonts(Typography)

**Demo**: [www.localhost:3000/fonts](www.localhost:3000/fonts)

**folder**: `app/(fonts)`

With `'next font`, CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. The result is zero layout shift and removes external network requests. It is recommended to use variable fonts.

#### Google fonts

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

#### Fonts with Tailwind(local and google)

This repo implements imported and local fonts using Tailwind and `next/font/google` and `next/font/local`. You can see how it is introduced in the root `layout.tsx`, configured in `tailwind.config.js`, and implemented in the demo.

## Data fetching

Data fetching is built on top of the `fetch()` Web API and React Server Components. When using `fetch()`, requests are automatically deduped by default.

Next.js extends the `fetch` options object to allow each request to set its own caching and revalidating.

| Types of fetching | link demo                                    | folder                     |
| ----------------- | -------------------------------------------- | -------------------------- |
| Static            | http://www.localhost:3000/get-method/static  | (REST)/get-method/static   |
| dynamic           | http://www.localhost:3000/get-method/dynamic | (REST)/get-method/dynamic  |
| parallel          | http://localhost:3000/get-method/parallel    | (REST)/get-method/parallel |

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

## Rendering

| sequential-rendering | [http://localhost:3000/get-method/sequential-rendering] | (REST)/get-method/sequential-rendering |
| progressive-rendering| [http://localhost:3000/get-method/progressive-rendering] | (REST)/get-method/progressive-rendering |

### Sequential rendering

With components as async functions, we can control the sequence of rendering, by having a child components fetch to wait for the parent component's fetch to finish first.

### Progressive rendering

One of the downsides of SSR is that it has to has to fetch all data before sending the generated page to the client. And, on the client, React can only hydrate the UI once the code for all components in the page has been downloaded. To enable streaming, you wrap individual components that need hydration with Suspense like below:

```typescript
<Suspense fallback={<p>Loading..</p>}>
  <Album />
</Suspense>
```

### Revalidation and API caching

Next.js allows you to update specific static routes without needing to rebuild your entire site.

There are 2 ways of revalidation:

**Background revalidation**: You can set the revalidation of the data at a specific time interval.

**On-demand revalidation**: When you have set the revalidation period, but in some use-cases you don't want users to wait until the end of the revalidation period. Next.js App Router supports revalidating content on-demand based on a route or cache tag.

| Types of revalidation | link demo                                                      | folder                                    |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------- |
| background            | [http://www.localhost:3000/get-method/revalidation/background] | (REST)/get-method/revalidation/background |
| on-demand             | [http://www.localhost:3000/get-method/revalidation/on-demand]  | (REST)/get-method/revalidation/on-demand  |

Before implementing revalidation to your fetching, you need to understand that:

- By default, when the app is being built with `yarn build`, the APIs will run once and have it's results cached. Let's say a function includes a variable that stores the value of `new Date()`, that variable will store the value of whenever the API was being built. Therefore, for cached APIs, side affects such as `console.log` will also run during build, but not when called after built.

- To avoid having the API's results cached, you can add `export const revalidate = 0;` on top of your `route.ts`. If you have a POST method in `route.ts`, the other methods within the same file will also disable cache. This makes sense when you are creating a route that allows users to modify data.

Since revalidation is a feature that controls how often you can call the API and rebuild the page. On-demand revalidation allows users to invalidate the cache and build pages without having to wait for the whole revalidation period. This is done by creating an API with NextJS' `revalidatePath` and `revalidateTag`, hit the API, and then fetch whatever that needs to be revalidated. More on these 2 below.

You should know:

- If the page is static, meaning that no revalidation period has been set at the `page.tsx` or `layout.tsx`, then even if the `route.tsx` is set to allow updated data, it will not fetch new results. The page is truly static. In the below example, `/page` the time will not change upon refresh.

```tsx
// /app/page.tsx

async function getCurrentTime() {
  const res = await fetch('http://localhost:3000/api/current-time');
  return res.json();
}

export default function StaticPage() {
  const currentTime = await getCurrentTime();

  return <>Current Time is {currentTime} </>;
}
```

```tsx
// /app/api/current-time/route.tsx

// disables API cache.
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}
```

- Each page adheres to their own revalidation settings. Other pages, even with the same fetches, will not be rebuilt unless your prompted `revalidatePath('/')`, which revalidates all pages.

- The revalidation is on per page basis not per route basis. Therefore, within a page, if one route’s revalidation period is 5 seconds, and the other is 30 seconds. The latter will adhere to the 5 second revalidation instead of 30.

Therefore, even though you can write the revalidation with this syntax:

```typescript
// page.tsx
async function getTime() {
  let res;

  try {
    res = await fetch(`http://localhost:3000/api/data/time`, {
      next: { revalidate: 5 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}

async function getNum() {
  let res;

  try {
    res = await fetch(`http://localhost:3000/api/data/number`, {
      next: { revalidate: 30 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}
```

The 30 seconds period will be meaningless. It may be more clear to set it this way:

```typescript
// page.tsx
export const revalidate = 5

...

```

There are 2 ways of revalidation.

#### Revalidation with `revalidatePath(path)`

`RevalidatePath(path)`,` causes all pages with that path to rebuild the page.

If the value of path is `/`, this means all apis will be revalidated and pages depending on any api will be rebuilt including static pages.

if the value of path is a specific path, such as `/some-page`, then only that page is rebuilt and with a fresh API call. The API in question should be non-cached. Other pages that call the same api will not revalidate.

**Important**: If your path is part of a grouped route, you need to include it in the path

For example:

```typescript
fetch('/api/revalidate?path=/(REST)/get-method/revalidation/on-demand');
```

#### Revalidation with `revalidateTag()`

The fetch method:

```typescript
// page.tsx

// the function to get the time
async function getTime() {
  const res = await fetch('http://localhost:3000/api/data/time', {
    next: { tags: ['collection'] },
  });

  return res.json();
}

// the function to send a request to revalidate the above fetch
async function revalidateWithTag() {
  await fetch('/api/revalidate?tag=collection');
}
```

`revalidateTag()` allows you the revalidate functions using tags so you can revalidate more than one page compared to `revalidatePath`.

Same with revalidatePath, revalidateTag will also revalidate other apis that don’t have the tag as long as they are in the same page.tsx.

It meants that, in the below example, even only `getTime()` has a tag, `getData()` will also be revalidated.

```typescript
// page.tsx

async function getTime() {
  const res = await fetch('http://localhost:3000/api/data/time', {
    next: { tags: ['collection'] },
  });

  return res.json();
}

async function getData() {
  const res = await fetch('http://localhost:3000/api/data/');
  return res.json();
}

export default function Page() {}
```

### Dynamic routes

**demo**: [www.localhost:3000/cat-profile/<choose a value between 1 to 3>]

**folder** : `/app/(not-found)/cat-profile)`

A Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName]. For example, [id] or [slug].

#### Generate dynamic routes on build time

The `generateStaticParams` function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

The function returns a list of `params` to populate the dynamic segment.

##### Single dynamic segment (ie: /product/[id]):

This demo intends to be a page of a product based on product ID.

**demo**: www.localhost:3000/product/<choose a value between 1 to 100>

**folder** : `/app/(generateStaticParams)/product`

##### multiple dynamic segment (ie: /[brandName]/[productCategory]):

This demo intends to be a page of a category of product of a brand.

For a full list brand name and categories, run a `GET` request to `https://dummyjson.com/products`

**demo**: www.localhost:3000/<brand-name>/<product-category> (ie:www.localhost:3000/apple/smartphones )

**folder** : `/app/(generateStaticParams)/[brandName]/[productCategory]]`

To return 404 if a route that is not generated from generateStaticParams(),
add `export const dynamicParams = false;` to the top of the page.

##### Catch all segments

Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName].

For example `app/product/[...slug]/page.tsx` matches URLs localhost:3000/product/1, localhost:3000/product/abc localhost:3000/product/a/b/c.

```typescript
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }];
}

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  // ...
}
```

Catch-all Segments can be made optional by including the parameter in double square brackets: `[[...folderName]]`. Using the above examples, it will also capture localhost:3000/product.

### Parallel Routes

#### Parallel routing with slots

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

##### Using parallel routes to create modals

QUICK START:

To quickly create modals, here is an example using a photo gallery where you click an image and a modal pops out. Here are the steps:

1. Create a route: In this case it is `localhost:3000/photo-gallery`. The page shows a clickable thumbnail of the pic

- app
  - photo-gallery
    - page.tsx

```typescript
// page.tsx

export default function Page() {
  return (
    <>
      <Link href="/photo-gallery/photo">
        <Thumbnail />
      </Link>
    </>
  );
}
```

2. Create the base of the modal: Create a folder with the @ notation(we named it 'modal' but any name works) so that it can be used in the layout.

- app
  - photo-gallery
    - @modal
    - page.tsx

3. Create a layout:

- app
  - photo-gallery
    - @modal
    - page.tsx
    - layout.tsx

```typescript
// app/photo-gallery/layout.tsx
export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div>
        {props.children}
        {props.modal}
      </div>
    </>
  );
}
```

4. Within @modal, create a default.tsx, which acts as a fallback when the active URL does not match. Next, create a folder called "photos" and inside, a page, which represents the content of the modal.

- app
  - photo-gallery
    - @modal
      - photo
        - page.tsx
      - default.tsx
    - page.tsx

```typescript
// default.tsx

export default function Default() {
  return null;
}
```

```typescript
// @modal/photos/page.tsx

export default function Component() {
  return (
    <MyModal>
      <Image src={`/image.png`} width={300} height={300} alt="" />
    </MyModal>
  );
}
```

The above is the basic set up, here are some explanations:

- The @ notation enables @modal to serve 2 functions. One is it allows it to be included in the layout.tsx as a child. Another is that any folders created within the @modal becomes a sort of a pseudo route that listens to the active URL, and when the active route does not corresponds then it will display the @modal/photodefault.tsx.

To illustrate what this means, lets say you navigate to localhost:3000/photo-gallery. The browser enters a territory where the routes defined inside the /photo-gallery are listening to the active URL.

Active URL = http://localhost:3000/photo-gallery

Routes that are listening:

- /photo-gallery/page.tsx
- /photo-gallery/@modal/photos/page.tsx

Because the active URL corresponds to /photo-gallery/page.tsx, but not /photo-gallery/@modal/photos/page.tsx. Therefore, the component in the former will render, but the latter will render default.tsx. And since our default.tsx returns null, which is what we want in the case of creating a modal, it won't be shown.

What happens if we click the thumbnail, resulting a soft navigation to http://localhost:3000/photo ?

Active URL = http://localhost:3000/photo-gallery

The active url triggers the listening /photo-gallery/@modal/photos/page.tsx and renders the modal component.

The above is soft navigation, what if we hard navigate(ie: opening a new tab) to http://localhost:3000/photo ?

It will return 404.

Unless, we add a default.tsx to parent folder.

- app
  - photo-gallery
    - @modal
      - photo
        - page.tsx
      - default.tsx
    - default.tsx
    - page.tsx

The default.tsx should return null. You can explore what default.tsx does in the background by returning some JSX instead of null.

With the above, we've succesfully made http://localhost:3000/photo a standalone page.

The problem is, it also retained all the modal styling which doesn't look right. To create a customised standalone page. We can look into the topic intercepting routes below.

#### Intercepting Routes

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

#### Parallel routing issues

This parallel routing feature is not production ready and the community has found some bugs:

| Issue                             | Documentation                                                                                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Individual loading doesn't work   | (Next.js parallel routes are awesome (if they worked correctly))[https://www.youtube.com/watch?v=g5V6koptSXs]                                                                                                                                    |
| Modals do not work with turbopack | Modals don't show as modals in `/modals` with `next dev --turbo`                                                                                                                                                                                 |
| Inconsistancy                     | Sometimes `yarn build && yarn start` and `yarn next dev` will produce differenct behavior. For example, the slot may or may not render as a modal, etc. The best bet is to delete the `.next` folder, `yarn build && yarn start` to view the app |

##### Reading segments

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

## 7. Styling

NextJS supports the following styling methods:

- CSS Modules
- Tailwind CSS
- CSS-in-JS
- Sass

| styling choice | demo                             | folder                      |
| -------------- | -------------------------------- | --------------------------- |
| CSS Modules    | [www.localhost:3000/css-modules] | `app/(styling)/css-modules` |
| tailwind       | [www.localhost:3000/tailwind]    | `app/(styling)/tailwind`    |
| CSS-in-JS      | [www.localhost:3000/css-in-js]   | `app/(styling)/css-in-js`   |
| Sass           | [www.localhost:3000/sass]        | `app/(styling)/sass`        |

### CSS Modules

CSS Modules are an optional feature and are only enabled for files with the .module.css extension. Regular `<link>` stylesheets and global CSS files are still supported.

### Tailwind

One of the advantages of Tailwind is it is usable in server components unlike CSS-in-JS libraries You configure Tailwind in the `tailwind.config.js` in the root folder. You do not need to modify `postcss.config.js`.

To apply it, you do it in `app/globals.css` and import it in `app/layout.tsx`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

After installing Tailwind CSS and adding the global styles, you can use Tailwind's utility classes in your application.

### CSS-in-JS

CSS-in-JS libraries which require runtime JavaScript are not currently supported in Server Components.

If you want to style Server Components, we recommend using CSS Modules or other solutions that output CSS files, like PostCSS or Tailwind CSS.

To implement Styled-components, you (1) define the style registry, (2) Wrap the children of the root layout with the style registry component

Defining the style registry:

```typescript
// lib/registry.tsx
import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
```

Wrap it in the root layout:

```typescript
//app/layout,tsx
import StyledComponentsRegistry from './lib/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
```

### Sass

Next.js has built-in support for Sass using both the `.scss` and `.sass` extensions. You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

_If you run into the error: `selector “body” is not pure (pure selectors must contain at least one local class or id) – error in NextJs`_

You can't directly have simple element selectors like the below in module.css:

```css
body {
  /* rules here */
}
/* or */
div {
  /* rules here */
}
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
  );
}
```

#### Global styles

A global styles sheet can be applied by creating a css file such as `globals.css`and then import it in `app/layout.tsx`

```typescript
// These styles apply to every route in the application
import './global.css';
// you can import external packages this way
import 'bootstrap/dist/css/bootstrap.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

In the global style sheet, you can import dependencies from Tailwind. In our `styles/globals.css`, the theme configured in `tailwind.config.js` such as font family and colors can be retrieved by using `theme()` or `@apply`

`styles/globals.css`

```css
h3 {
  font-family: theme('fontFamily.gluten');
  color: theme('colors.secondary');
}

h4 {
  @apply text-primary;
}
```

**Note**: If you disable JavaScript, styles will still be loaded in the production build (next start). However, JavaScript is still required for next dev to enable Fast Refresh.

## 9. Optimization

### State Management

This repo demonstrates 2 state management libraries: Redux and Mobx, chosen based on our project experience. Other libraries, tho no demo'd here, should also be able to integrate with nextJS 13.

#### Redux

**Demo**: [www.localhost:3000/redux]

**folders**: `/src/app/(state-management)/redux`, `/src/store/state-management/redux`

##### Set up redux with typescript

Redux's usage is largely the same in NextJS. Some variance are mostly due to the usage of Typescript.

Redux Toolkit's configureStore API should not need any additional typings. You will, however, want to extract the RootState type and the Dispatch type from the store so that they can be referenced as needed. (You can see `redux-store.ts` for more info).

While its possible to import the RootState and AppDispatch types into each component, its better to create typed versions of the `useDispatch` and `useSelector` hooks for usage in your application.

Why?

- For `useSelector`, it saves you the need to type `(state: RootState)` every time.

- For `useDispatch`, the default `Dispatch` type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized `AppDispatch` type from the store that includes the thunk middleware types, and use that with `useDispatch`. Adding a pre-typed `useDispatch` hook keeps you from forgetting to import `AppDispatch` where its needed.

##### Installation of redux in Next 13

In the previous NextJS (one with the `pages` folder), a `<Provider>` must be wrapper around the `_app.tsx` to enable the subscription of the store across the whole app.

With the latest NextJS (one with the `app` folder), the `_app.tsx` is replaced by the root `layout.tsx`. Hence, by logic, the `<Provider>` should be inside the root `layout.tsx`. However, because the Provider uses `useContext` which is a client only function, it cannot be used directly in the server-side only root `layout.tsx`. As a workaround, a client component can be created that can act as a wrapper using the `Provider` and be placed within the root `layout.tsx`.

In the root `layout.tsx` you will see a client component called `<Providers>` is wrapped around the children.

##### How do use Redux

It is highly recommended that you read the [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) in which this demo is based on.

We use the Redux Toolkit (aka RTK) which provides methods and API to do state management in a more intuitive way.

To set up redux on the fly, you can see all the files below and read the comments.

Its best to read in the following order:

**Setting up the store**
`store/state-management/redux/store.ts`
`store/state-management/redux/hook.ts`

**Setting up slices, reducers and thunks**
`store/state-management/redux/posts/slice.ts`

**Setting up selectors**
`store/state-management/redux/posts/selectors.ts`

**Attaching it to the app**
`components/atomic-design/templates/Providers/index.tsx`

#### Mobx

MobX is a state management library that manage the state of your application by providing a simple and efficient way to create observable state objects, and automatically updating the user interface when the state changes.

The basic idea behind MobX is that you create observable objects that represent the state of your application. These objects can be simple JavaScript objects, or more complex data structures like arrays or maps. When you make changes to the state, MobX automatically tracks those changes and updates any components that depend on that state.

##### Installation

Follow the installation guide for Mobx working with Typescript [here](https://mobx.js.org/installation.html)

##### How to use Mobx

If you have never used Mobx before, we recommended that you start by reading [the gist of Mobx](https://mobx.js.org/the-gist-of-mobx.html)

To set up redux on the fly, you can see all the files below and read the comments.

Its best to read in the following order:

**Setting up the store, selectors, methods and async actions**
`store/state-management/mobx/post/store.ts`
`store/state-management/mobx/post/transport-layer.ts`

**Attaching it to the app**
`components/atomic-design/templates/Providers/index.tsx`

## 10. Others

### Metadata

Two ways to add Metadata:

- **Config-based metadata**: Export a static metadata object or a dynamic generateMetadata function in a layout.js or page.js file.
- **File-based metadata**: Add static or dynamically generated special files to route segments.

#### Config-based metadata

**Both static and dynamic metadata through generateMetadata are only supported in Server Components.**

##### Static method of creating metadata

**Demo**: [localhost:3000/config-based/static]
**Folder**: `/src/app/(metadata)/config-based/static`

exports a static object as the metadata.

Other static data that is not covered in the demo but can be added:

```typescript
// page.tsx

export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
  colorScheme: 'dark',
  creator: 'Jiachi Liu',
  publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
```

Output:

```html
<!-- General metatags, more in demo -->
<meta name="application-name" content="Next.js" />
<meta name="author" content="Seb" />
<link rel="author" href="https://nextjs.org" />
<meta name="author" content="Josh" />
<meta name="generator" content="Next.js" />
<meta name="keywords" content="Next.js,React,JavaScript" />
<meta name="referrer" content="origin-when-cross-origin" />
<meta name="color-scheme" content="dark" />
<meta name="creator" content="Jiachi Liu" />
<meta name="publisher" content="Sebastian Markbåge" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />

<!-- Metadata base -->
<link rel="canonical" href="https://acme.com" />
<link rel="alternate" hreflang="en-US" href="https://acme.com/en-US" />
<link rel="alternate" hreflang="de-DE" href="https://acme.com/de-DE" />

<!-- Opengraph -->
<meta property="og:title" content="Next.js" />
<meta property="og:description" content="The React Framework for the Web" />
<meta property="og:url" content="https://nextjs.org/" />
<meta property="og:site_name" content="Next.js" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:url" content="https://nextjs.org/og.png" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="600" />
<meta property="og:image:url" content="https://nextjs.org/og-alt.png" />
<meta property="og:image:width" content="1800" />
<meta property="og:image:height" content="1600" />
<meta property="og:image:alt" content="My custom alt" />
<meta property="og:type" content="website" />
```

##### Dynamic method of creating metadata

**Demo**: [localhost:3000/config-based/dynamic/<1-100>]
**Folder**: `/src/app/(metadata)/config-based/dynamic`

Dynamic metadata depends on dynamic information, such as the current route parameters, external data, or metadata in parent segments, can be set by exporting a generateMetadata function that returns a Metadata object.

Next.js will wait for data fetching inside generateMetadata to complete before streaming UI to the client. This guarantees the first part of a streamed response includes `<head>` tags.

See the demo for application.

#### File based metadata

File-based metadata has the higher priority and will override any config-based metadata.

##### Icons

- To set the **favicon**, create an icon and name it as `favicon.ico`, put it in `/app`. No need to add it into the header. .ico files only.
- To have **icons for individual pages**, create an icon and name it was `icon.jpeg` and put it in the same location as `page.tsx`. Other file types are ok: .ico, .jpg, .jpeg, .png, .svg.
  - **Demo**: [localhost:3000/file-based]
  - **Folder**: `/src/app/(metadata)/file-based`
- About **Apple icons**: As a large portion of the mobile devices consists of Apple products, you should be mindful about the Apple icon (touch icon) of your website. Ideally the size should be 180x180 so iOS can generate the icon suite properly. Name the file as 'apple-icon.jpg' and put it in the root `/app`. Accepted files are : jpg|jpeg|png.

Notes:

- If the favicon is defined in the public folder, it will interfere with the one in the `/app`.
- Ideally the icons should be 16x16 or 32x32, otherwise there is a risk of getting an invalid image type error.
- The icons may persist in `.next` and interferes with the rendering results. If the icons don't change, delete `.next` and rebuild.
- If the Apple icon is set in the `/app` folder. All pages without a set icon will use it when you browse with an Apple device.

##### robots.txt

- Must be put in the root `/app`
- Alternatively, you can generate `robots.txt` like the following:

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  };
}
```

##### Sitemap

- Must be put in the root `/app`
- Alternatively, you can generate `sitemap.xml` with the following:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
    },
  ];
}
```

### Security

**folder**: `/src/app/(protected-routes))`

#### With layout.tsx

**Demo** : [www.localhost:3000/private-page]

Route protection can be done by having a layout to wrap protected components. The layout is a client component due to the usage of `useEffect` to do verification fetching. Note that layout does not re-render upon navigation.

#### With middleware

**Demo** : [www.localhost:3000/private-page]

Read about middleware usage in this readme for more information.
