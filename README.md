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
   - prefetching (WIP)
   - Static and dynamic routes(WIP)
   - Navigation (soft & hard) (WIP)
   - Streaming (WIP)
   - Project organization (WIP)
   - Internationalization (WIP)
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
   - Route segment config (WIP)
   - Route groups
   - Dynamic routes & catch-all segments
   - Parallel Routes
   - Intercepting routes
   - Middleware
3. Rendering
   - Static rendering
   - Dynamic rendering
4. Data fetching
   - Fetching
     - Static fetching
     - Dynamic fetching
     - Parallel fetching
     - Sequential data fetching
     - Third party data fetching (WIP)
   - Caching
   - Revalidation
   - Server Actions
5. Syntax
   - <Link>
6. Functions
   - usePathname()
   - useRouter()
   - revalidatePat()h & revalidateTag()
   - generateStaticParams()
   - dynamic() (WIP)
7. Styling
   - CSS Modules
   - Tailwind CSS
   - CSS-in-JS
   - Sass
8. Assets
   - images
   - Fonts
9. Optimizing
   - Metadata (WIP)
   - Analytics (WIP)
   - OpenTelemetry (WIP)
   - Instrumentation (WIP)
   - Static Export (WIP)
   - Codemods (WIP)
10. Others

- Draft mode (WIP)
- Accessability

## Features not yet supported by Turbopack

| feature/library                 | Description                                                                                     | docs                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [SVGR](https://react-svgr.com/) | A library that enables importing of svg files as React components                               | [App fails to build with Turbopack loader](https://github.com/vercel/next.js/issues/48140) |
| Server rendered CSS-in-JS       | CSS-in-JS styling such as styled-components, kuma-ui, styled-jsx, etc cannot be server rendered | [css-in-js](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)       |
| Server Actions       | Server Actions are not supported by Turbo | [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)       |

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

## Routing

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

UI that is shared for one or between multiple pages.

#### loading.tsx

This component will be rendered whenever the suspense boundary is triggered.

#### not-found.tsx

This component will rendered when a `notFound()` is triggered.

#### error.tsx

This component will rendere when the error boundary is triggered.

#### route.tsx

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

#### template.tsx

when a user navigates between routes that share a `template.tsx`, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized. This means that unlike layout.tsx. The state will not persist across pages.

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

Middleware will be invoked for every route in your project by default but can be configured from specific paths. `middleware.ts` must be placed in the root folder.

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

| sequential-rendering | http://localhost:3000/get-method/sequential-rendering | (REST)/get-method/sequential-rendering |
| progressive-rendering| http://localhost:3000/get-method/progressive-rendering] | (REST)/get-method/progressive-rendering |

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

### Server actions

**Demo**:[http://localhost:3000/server-actions/<any-number>]

**Folder**: `/src/app/(REST)/server-actions`

Server Actions is an Alpha feature of NextJS. It allows you to run functions in servers as if you are doing an API call, but without having to write an API for it. The benefits include reducing client-side javascript, enabling server-side data manipulations and such.

Server Actions can be defined both inside Server Components and/or called from Client components.

Why are APIs not needed?

Server Actions automatically create an endpoint for Next.js to use behind the scenes. When calling a Server Action, Next.js sends a POST request to the page you're on with metadata for which action to run.

#### Setting up Server Actions

1. Enable the feature on next.config.js
2. Create Server Actions
3. Invoke it

##### Enable the feature on next.config.js

Before using Server Actions, you MUST first enable the feature by adding the following in `next.config.js`:

```javascript
// next.config.js

module.exports = {
  experimental: {
    serverActions: true,
  },
}
```

##### Create Server Actions

You can define Server Actions on a Server Component or a separate file, but not on a Client Component. 

In a Server Component:

```typescript
// page.tsx
export default function ServerComponent() {
  async function myAction() {
    'use server'
    // ...
  }
}
```

In a separate file:

```typescript
'use server'
 
export async function myAction() {
  // ...
}
```

##### Invoke it

1.`action`

You can invoke the Server Action using the `action` prop in the `<form>`.

```typescript
// page.tsx
import { cookies } from 'next/headers'
 
export default function AddToCart({ productId }) {
  async function addItem(data) {
    'use server'
 
    const cartId = cookies().get('cartId')?.value
    await saveToDb({ cartId, data })
  }
 
  return (
    <form action={addItem}>
      <button type="submit">Add to Cart</button>
    </form>
  )
}
```

2.`formActions`

You can invoke the Server Action using the `formAction` prop.

```typescript
export default function Form() {
  async function handleSubmit() {
    'use server'
    // ...
  }
 
  async function submitImage() {
    'use server'
    // ...
  }
 
  return (
    <form action={handleSubmit}>
      <input type="text" name="name" />
      <input type="image" formAction={submitImage} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

3.useTransition

useTransition is a React hook that allows prioritization of hooks so that urgent hooks can run first over expensive ones. If you Server Action is expensive then it can be wrapped with the startTransition hook.

```typescript
// example-client-component.tsx
'use client'
 
import { useTransition } from 'react'
import { addItem } from '../actions'
 
function ExampleClientComponent({ id }) {
  let [isPending, startTransition] = useTransition()
 
  return (
    <button onClick={() => startTransition(() => addItem(id))}>
      Add To Cart
    </button>
  )
}
```

```typescript
// actions.ts
export async function addItem(id) {
  await addItemToDb(id)
  // Marks all product pages for revalidating
  revalidatePath('/product/[id]')
}

```

4.Call Directly

You can directly pass the function as a prop like any other function or call it onClick. 

```typescript
// app/posts/[id]/page.tsx

// Vercel KV is a serverless Redis storage.
import kv from '@vercel/kv'
import LikeButton from './like-button'
 
export default function Page({ params }: { params: { id: string } }) {
  async function increment() {
    'use server'
    await kv.incr(`post:id:${params.id}`)
  }
 
  return <LikeButton increment={increment} />
}
```

```typescript
// app/post[id]/like-button.tsx
'use client'
 
export default function LikeButton({
  increment,
}: {
  increment: () => Promise<void>
}) {
  return (
    <button
      onClick={async () => {
        await increment()
      }}
    >
      Like
    </button>
  )
}
```

#### Enhancements - Experimental useOptimistic

**Demo** : [http://www.localhost:3000/server-actions/use-optimistic]
**Folder**: `/src/app/(REST)/server-actions/use-optimistic`

useOptimistic is an experimental React hook that enhances user experience by making the app appear more responsive.

This pattern makes more sense for non-destructive parts of our interfaces. Things like liking a post, marking a tweet as favorite, or as seen below, starring a repository.

For example, creating a like button that responds immediately rather than waiting for other state updates or approval from the backend.

Optimistic updates can also be used with Server Actions.

#### Enhancements - Experimental useFormStatus

**Demo** : [http://www.localhost:3000/server-actions/use-form-status]
**Folder**: `/src/app/(REST)/server-actions/use-form-status`

The experimental useFormStatus hook can be used within Form Actions, and provides the pending property. The hook subscribes to the closest `<form>` tag and provides the pending status.

The pending status can be used for showing loading mechanisms and provides a more fine-tuned control compared to react suspense.

## Dynamic routes

**demo**: [www.localhost:3000/cat-profile/<choose a value between 1 to 3>]

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

## Styling

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
